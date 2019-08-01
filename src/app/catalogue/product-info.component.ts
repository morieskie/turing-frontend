import {Component, Input, OnInit} from '@angular/core';
import {CatalogueItemInterface} from './model/catalogue-item';
import {CartService} from '../cart/service/cart.service';
import {CartItem} from '../cart/model/cart-item';
import {NotificationService} from "../throbber/service/notification.service";
import {Cart} from "../cart/model/cart";

@Component({
  selector: 'app-product-info',
  templateUrl: './template/product-info.component.html',
  styleUrls: [],
})
export class ProductInfoComponent implements OnInit {
  @Input()
  public model: CatalogueItemInterface;
  @Input()
  public reviewCount: number;
  @Input()
  public weightedAverage: string;
  @Input()
  public weightedAverageRounded: number;
  public formModel: { color: number | string, size: number | string, attributes: string } = {
    color: '',
    size: '',
    attributes: null
  };

  constructor(private cartService: CartService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.cartService.getCurrentCart().catch(() => this.cartService.create(new Cart()));
  }

  addToCart(model) {
    // tslint:disable-next-line:radix
    const size = this.model.sizes.filter((item) => item.key === parseInt(model.size))[0].value;
    // tslint:disable-next-line:radix
    const color = this.model.colors.filter((item) => item.key === parseInt(model.color))[0].value;
    model.attributes = [size, color].join(', ');
    console.log(model);
    const cartItem = new CartItem();
    cartItem.attributes = model.attributes;
    cartItem.productId = this.model.productId;
    cartItem.productName = this.model.name.toString();
    this.cartService.getCurrentCart().then(result => {
      console.log('CURRENT_CART', result);
      cartItem.cartId = result.cartId;
      this.cartService.addToCart(cartItem)
        .then(response => {
          console.log('ADD TO CART RESPONSE', response);
          this.notificationService.success('Success', `Product added to cart`);
        });
    });
  }
}
