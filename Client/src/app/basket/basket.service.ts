import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = 'http://localhost:8001/';

  constructor(private http: HttpClient) {}

  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  getBasket(userName: string) {
    return this.http
      .get<IBasket>(this.baseUrl + `api/v1/Basket/GetBasket/${userName}`)
      .subscribe({
        next: (basket) => this.basketSource.next(basket),
      });
  }

  setBasket(basket: IBasket) {
    return this.http
      .post<IBasket>(this.baseUrl + 'api/v1/Basket/CreateBasket', basket)
      .subscribe({
        next: (basket) => this.basketSource.next(basket),
      });
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasket() ?? this.createBasket();

    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const item = items.find((x) => x.productId == itemToAdd.productId);

    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }

    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_username', 'danzzy'); // would be replaced with logged in user
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct): IBasketItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      imageFile: item.imageFile,
      quantity: 0,
    };
  }
}
