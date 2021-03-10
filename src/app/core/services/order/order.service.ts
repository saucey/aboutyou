import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAllOrdersUrl, getOrderByIdUrl, getOrderInvoiceUrl } from '../resolveEnvs';
import { IOrder, OrderItemDetails } from 'src/app/core/shop/types/order';
import { IInvoice } from 'src/app/core/shop/types/invoice';
import { Observable } from 'rxjs';
import { ProductMap } from 'src/app/mappers/product';
import { ICurrency } from 'src/app/core/shop/types';
import { ShopService } from 'src/app/core/services/shop.service';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { CONFIG } from 'src/app/configs';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly allOrdersUrl: string;
  private readonly orderByIdUrl: string;
  private readonly orderInvoiceUrl: string;
  private itemsNoDuplicates: Array<OrderItemDetails>;
  private currency: ICurrency;
  public currentOrder: IOrder;

  constructor(
    private readonly http: HttpClient,
    private shopService: ShopService,
    private productService: BapiProductService,
  ) {
    this.allOrdersUrl = getAllOrdersUrl();
    this.orderByIdUrl = getOrderByIdUrl();
    this.orderInvoiceUrl = getOrderInvoiceUrl();
    this.currency = this.shopService.getShop().shop.currency;
  }

  private mapItemIdsToQuantity(itemIds: Array<number>): { [key: number]: number } {
    return itemIds.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {},
    );
  }

  private removeDuplicateItems(items: Array<OrderItemDetails>): Array<OrderItemDetails> {
    return items.reduce(
      (acc, current) => (!acc.find(item => item.product.id === current.product.id) ? acc.concat([current]) : acc),
      [],
    );
  }

  public getAllOrders(): Observable<IOrder[]> {
    return this.http.get<[IOrder]>(this.allOrdersUrl);
  }

  public fetchOrderByIdAndMergeMappedProductData(orderId: string): Observable<void> {
    let itemCount: { [key: number]: number };
    return this.http.get<IOrder>(`${this.orderByIdUrl}/${orderId}`).pipe(
      tap(order => (this.currentOrder = order)),
      map(order => order.items.map(item => item.product.id)),
      tap(itemIds => (itemCount = this.mapItemIdsToQuantity(itemIds))),
      tap(() => (this.itemsNoDuplicates = this.removeDuplicateItems(this.currentOrder.items))),
      map(itemIds => {
        return [...new Set(itemIds)] as number[];
      }),
      switchMap(itemIds =>
        this.productService.getByIds(itemIds, {
          campaignKey: CONFIG.shop.products.campaignKey,
          with: {
            attributes: 'all',
            images: 'all',
            advancedAttributes: 'all',
            variants: {
              attributes: 'all',
            },
          },
        }),
      ),
      map(order => {
        this.currentOrder.items = [] as any;
        order.forEach((item, index) => {
          this.currentOrder.items[index] = this.itemsNoDuplicates[index];
          this.currentOrder.items[index].mappedProduct = new ProductMap(item, this.currency);
          this.currentOrder.items[index].quantity = itemCount[item.id];
        });
      }),
    );
  }

  public getOrderInvoice(orderId: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(`${this.orderInvoiceUrl}/${this.currentOrder.id}`);
  }
}
