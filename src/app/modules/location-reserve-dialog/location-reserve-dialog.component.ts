import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MapInfoWindow } from '@angular/google-maps';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { getAuthenticated } from 'src/app/core/shop/store/account';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { ReservationBasketService } from 'src/app/core/reservation-basket';
import { LocationAvailabilityService } from './location-availability.service';
import { LocationReservationDialogData } from './location-reservation-dialog.data';
import { ReservationMessageService } from './reservation-message.service';
import { ReservationStoreDetails } from './reservation-store-details';
import { selectStoreId } from 'src/app/core/reservation-basket/state';

@Component({
  selector: 'app-location-reserve-dialog',
  templateUrl: './location-reserve-dialog.component.html',
  styleUrls: ['./location-reserve-dialog.component.scss'],
})
export class LocationReserveDialogComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  @Input() item: IBasketListItem;
  @Input() quantity = 1;
  @Input() disabled = false;
  @Input() isFlyoutMode = false;
  @Input() isBasketValid: boolean;
  @Input() useSecondImage = false;
  @Output() changeQuantity = new EventEmitter<{ item: IBasketListItem; quantity: number }>();

  public isMobile$: Observable<boolean>;
  public locale: string;
  public countryName: string;
  public noStoresFound$ = new Subject<boolean>();

  public disableDefaultUI = true;
  public streetViewControl = false;
  public zoomControl = false;
  public currency: ICurrency;
  public noStoresFound = false;
  public availabilitiesSearchForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LocationReserveDialogComponent>,
    private shopService: ShopService,
    private locationAvailabilityService: LocationAvailabilityService,
    private reservationBasketService: ReservationBasketService,
    @Inject(MAT_DIALOG_DATA) public data: LocationReservationDialogData,
    private readonly http: HttpClient,
    private breakpointObserver: BreakpointObserverService,
    private store: Store<AppState>,
    private reservationMessageService: ReservationMessageService,
  ) {
    const { shop } = this.shopService.getShop();
    this.locale = shop.currency.locale;
    this.countryName = this.setLocale(this.locale);
    this.currency = this.shopService.getShop().shop.currency;

    this.watchAccount();
  }

  public center: object;
  public markerOptions: any;
  public zoom: number;
  public display?: google.maps.LatLngLiteral;
  public productImg: string;
  public productTitle: string;
  public productPrice: number;
  public geocoder: google.maps.Geocoder;
  public storeAvailabilities = [];
  public searches: boolean;
  public distance = 50;
  public storeDetails: ReservationStoreDetails;
  public isMobile = false;
  public storeEl = null;
  public setScrollPosition = 0;
  public showReservationSuccessMessage = false;
  public multipleStoreDenied = false;
  public getSelectedStoreId: number | null;
  private subscription = new Subscription();
  isAuthenticated: boolean;
  user: any;

  ngOnInit(): void {
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();
    this.geocoder = new google.maps.Geocoder();
    this.setGeoLocation(this.countryName);
    this.zoom = 6;
    this.markerOptions = [];
    this.setProductData();
    this.availabilitiesSearchFormControl();
    this.noStoresFound$.subscribe(val => {
      this.availabilitiesSearchForm.controls.zipcode.setValidators([this.noSearchReturnValidator(val)]);
      this.availabilitiesSearchForm.controls.zipcode.updateValueAndValidity();
    });

    this.store.select(selectStoreId).subscribe(val => {
      this.getSelectedStoreId = val;
    });
  }

  private availabilitiesSearchFormControl() {
    this.availabilitiesSearchForm = new FormGroup({
      zipcode: new FormControl('', [Validators.required]),
      productsAvailable: new FormControl(false),
    });
  }

  private noSearchReturnValidator(noStoresFound: any): any {
    return (control: AbstractControl): ValidationErrors | null => {
      return !noStoresFound ? null : { noStores: true };
    };
  }

  watchAccount = () => {
    this.subscription.add(
      this.store.pipe(select(getAuthenticated)).subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }),
    );
  };

  submitAvailabilitiesSearch() {
    this.noStoresFound$.next(false);
    if (this.availabilitiesSearchForm.valid) {
      this.getProductAvailabilities();
    }
  }

  showError() {
    this.searches = true;
    this.noStoresFound = true;
    this.noStoresFound$.next(true);
    this.storeAvailabilities = [];
    this.markerOptions = [];
    return true;
  }

  private initStoreAvailabilitiesAndMapConfig(productsAvailable: boolean, storeDetails: ReservationStoreDetails[]) {
    const stores = productsAvailable ? storeDetails.filter(store => store.currentStock > 0) : storeDetails;
    this.searches = true;

    this.noStoresFound = false;
    this.storeAvailabilities = stores;

    if (!this.storeAvailabilities.length) {
      this.showError();
    }

    this.markerOptions = this.storeAvailabilities.map((store, index) => {
      const count = (index + 1).toString();
      return {
        icon: {
          path:
            'M0-20c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor: '#19836b',
          fillOpacity: 1,
          anchor: new google.maps.Point(0, 0),
          strokeWeight: 0,
          scale: 1,
        },
        label: { text: count, color: '#fff' },
        position: { lat: Number(store.latitude), lng: Number(store.longitude) },
      };
    });

    this.center = this.markerOptions[0].position;
    this.zoom = 8;
    this.streetViewControl = true;
    this.zoomControl = true;
  }

  getProductAvailabilities() {
    const articleNumber = this.data.product.custom.articleNumber;

    const { zipcode, productsAvailable } = this.availabilitiesSearchForm.value;

    const distance = this.distance;

    this.subscription.add(
      this.locationAvailabilityService.getLocationAvailability(articleNumber, zipcode, distance).subscribe(
        (response: ReservationStoreDetails[]) => {
          this.initStoreAvailabilitiesAndMapConfig(productsAvailable, response);
        },
        error => {
          this.showError();
        },
      ),
    );
  }

  setProductData() {
    this.productImg = this.data.product.previewImageSrc;
    this.productImg = this.setProductImageSize(this.productImg);
    this.productTitle = this.data.product.custom.productTitle;
    this.productPrice = this.data.product.currentPrice;
  }

  setLocale(locale: string) {
    switch (locale) {
      case 'fr-CH':
      case 'de-CH':
        return 'Switzerland';

      case 'de-DE':
        return 'Germany';

      case 'de-AT':
        return 'Austria';

      default:
        return 'Germany';
    }
  }

  setProductImageSize(img: string) {
    const url = new URL(img);
    const queryString = url.search;
    const searchParams = new URLSearchParams(queryString);
    searchParams.set('height', '32');
    searchParams.set('width', '32');
    url.search = searchParams.toString();
    return url.toString();
  }

  setGeoLocation(country: string) {
    this.geocoder.geocode({ address: country }, (results: any, status: any) => {
      if (status === 'OK') {
        this.center = results[0].geometry.location;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(store: ReservationStoreDetails, index: number) {
    this.storeDetails = { ...store };
    this.storeEl = document.getElementById('store' + index);
    this.storeEl.scrollIntoView();
  }

  locationReservationDialogClose() {
    this.dialogRef.close();
  }

  public backToSearch() {
    this.storeDetails = undefined;

    const dialogWrapper = document.getElementById('google-map-wrapper').parentElement.parentElement;
    setTimeout(() => {
      dialogWrapper.scrollTop = this.setScrollPosition;
    }, 100);
  }

  disableReservation({ currentStock }: ReservationStoreDetails): boolean {
    return (this.quantity > 10 && currentStock <= 0) || currentStock < this.quantity;
  }

  makeReservation(storeDetails: ReservationStoreDetails) {
    const variantId = this.data.variantId;
    const quantity = this.quantity;
    const storeId = storeDetails.storeId;
    this.subscription.add(
      this.reservationBasketService
        .addOrUpdateItem({
          variantId,
          quantity,
          storeId,
        })
        .subscribe(result => {
          if (result) {
            this.reservationMessageService.setReservationMessage();
            this.dialogRef.close();
          } else {
            this.storeDetails = undefined;
            this.multipleStoreDenied = false;
            setTimeout(() => {
              this.multipleStoreDenied = true;
            }, 500);
          }
        }),
    );
  }

  public onHandleQuantityChange(value: number) {
    this.quantity = value;
  }

  public showStoreDetails(store: ReservationStoreDetails) {
    this.storeDetails = { ...store };
    this.setScrollPosition = document.getElementById('google-map-wrapper').parentElement.parentElement.scrollTop;
  }

  reserveQuick(event: Event, storeDetails: ReservationStoreDetails) {
    event.stopPropagation();
    this.makeReservation(storeDetails);
  }

  closeReservationFailMessage() {
    this.multipleStoreDenied = false;
  }

  containsProducts() {
    return this.storeAvailabilities && this.storeAvailabilities.length > 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
