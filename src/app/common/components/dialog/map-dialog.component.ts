import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapDialogData } from './map-dialog-data';

/**
 * Map Dialog component.
 * **When To Use**
 * > Used for opening dialog with Google map inside
 */
@Component({
  selector: 'app-map-dialog',
  templateUrl: 'map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss'],
})
export class MapDialogComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  public geocoder: google.maps.Geocoder;
  private coordinates: any;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MapDialogData,
  ) {}

  ngOnInit() {
    this.geocoder = new google.maps.Geocoder();
    this.setGeoLocation(this.data.address);
  }

  setGeoLocation(country: string) {
    this.geocoder.geocode({ address: country }, (results: any, status: any) => {
      if (status === 'OK') {
        this.coordinates = new google.maps.LatLng(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng(),
        );
        this.mapInitializer();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.coordinates,
      zoom: 15,
    });
  }
}
