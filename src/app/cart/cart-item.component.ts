import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CartItem} from './model/cart-item';
import {CartItemService} from './service/cart-item.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from './service/cart.service';
import {Observable, of} from 'rxjs';
import {CartComponent} from './cart.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './template/cart-item.component.html',
  styleUrls: []
})
export class CartItemComponent implements OnInit {
  @Input() public items: Observable<CartItem[]>;
  @Output() onHasItems = new EventEmitter<Observable<boolean>>();
  @Input() public model: CartItem;

  constructor(@Inject(CartComponent) private cartComponent: CartComponent,
              public cartItemService: CartItemService,
              public cartService: CartService, private route: ActivatedRoute) {
    this.cartService.getCurrentCart().then(item => this.items = of(item.items));
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(value => {
      console.log('CART HAS CHANGED > CART_ITEMS', value.items);
      this.items = of(value.items || []);
    });
  }

  public onRemove(item: CartItem) {
    this.cartItemService.remove(item)
      .then(response => {
        this.cartService.refreshCart();
        this.cartService.getCurrentCart().then(result => {
          if (response) {
            this.items = of(result.items);
            this.onHasItems.emit(result.hasItems);
          }
        });
      });
  }

  public onFocus(item: CartItem) {
    this.model = item;
  }

  public onChange(item: CartItem) {
    this.model.quantity = item.quantity;
    this.cartItemService.update(item).then(() => this.cartService.refreshCart());
  }
}
