import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Host,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CatalogueComponent} from './catalogue.component';
import {CatalogueService} from './service/catalogue.service';
import {CatalogueItemService} from './service/catalogue-item.service';
import {CatalogueItem, CatalogueItemInterface} from './model/catalogue-item';
import {NotificationService} from '../throbber/service/notification.service';
import {CartItem} from '../cart/model/cart-item';
import {CartService} from '../cart/service/cart.service';
import {Cart} from "../cart/model/cart";
import {environment} from "../../environments/environment";

declare var jQuery;

@Component({
  selector: 'app-catalogue-item',
  templateUrl: './template/catalogue-item.component.html',
  styleUrls: []
})
export class CatalogueItemComponent implements OnInit, AfterViewInit {
  @Input() public items: Observable<CatalogueItemInterface[]>;
  @Output() onHasItems = new EventEmitter<Observable<boolean>>();

  @Input() public model: CatalogueItem;

  public imagePath = environment.paths.catalogueImagesPath;

  constructor(@Inject(CatalogueComponent) private catalogueComponent: CatalogueComponent,
              public route: ActivatedRoute, private catalogueService: CatalogueService,
              public catalogueItemService: CatalogueItemService,
              public notificationService: NotificationService,
              public cartService: CartService) {
  }

  onAddToCart(event, item: CatalogueItemInterface) {
    this.cartService.getCurrentCart().catch(() => this.cartService.create(new Cart()));
    event.preventDefault();
    this.catalogueItemService.getAttributes(item.productId).then(model => {
      const sizes = model.sizes.map(option => `<option value="${option.value}">${option.value}</option>`);
      const colors = model.colors.map(option => `<option value="${option.value}">${option.value}</option>`);
      this.notificationService.question(String(item.name), 'Please select attributes', {
        drag: false,
        close: false,
        overlay: true,
        position: 'center',
        inputs: [
          [
            `<select id="sizeOption">${sizes}</select>`,
            'change',
            (instance, toast, select, e) => {
              console.log(select.options[select.selectedIndex].value);
            },
            false // true to focus
          ],
          [
            `<select id="colorOption">${colors}</select>`,
            'change',
            (instance, toast, select, e) => {
              console.log(select.id, select.selectedIndex, select.options[select.selectedIndex].value);
            },
            false // true to focus
          ],
        ],
        buttons: [
          [
            `<button><b>Confirm</b></button>`,
            (instance, toast, button, e, inputs) => {
              // @ts-ignore
              const size = document.querySelector('#sizeOption').value;
              // @ts-ignore
              const color = document.querySelector('#colorOption').value;

              const cartItem = new CartItem();
              cartItem.attributes = [size, color].join(', ');
              cartItem.productId = item.productId;
              cartItem.productName = item.name.toString();
              this.cartService.getCurrentCart().then(result => {
                console.log('CURRENT_CART', result);
                cartItem.cartId = result.cartId;
                this.cartService.addToCart(cartItem)
                  .then(response => {
                    console.log('ADD TO CART RESPONSE', response);
                    this.notificationService.success('Success', `Product added to cart`);
                  });
              });

              instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
            },
            false // true to focus
          ],
        ]
      });
    });
  }

  ngOnInit(): void {
    this.catalogueService.getCatalogueObservable().subscribe(value => {
      console.log('CART HAS CHANGED > CART_ITEMS', value.items);
      this.items = of(value.items || []);
    });

  }

  public onRemove(item: CatalogueItem) {
    this.catalogueItemService.remove(item.id)
      .then(response => {
        // this.catalogueService.refreshCart();
        console.log('CatalogueItemComponent.onRemove', response);
        // console.log('CatalogueItemComponent.onRemove', this.cartService.getCurrentCart().items);
        if (response) {
          // this.items = Observable.of(this.cartService.getCurrentCart().items);
          // this.onHasItems.emit(this.cartService.getCurrentCart().hasItems);
        }
      });
  }

  public onFocus(item: CatalogueItem) {
    this.model = item;
  }

  public onChange(item: CatalogueItem) {
    console.log('item value has changed');
    this.model.quantity = item.quantity;
    // this.cartItemService.update(item).then(() => this.cartService.refreshCart());
  }

  ngAfterViewInit() {
    console.log('CatalogueItemComponent.ngAfterViewInit');

  }

  ngAfterContentChecked() {
    // console.log('CatalogueItemComponent.ngAfterContentChecked');
  }

  ngAfterContentInit() {
    console.log('CatalogueItemComponent.ngAfterContentChecked');
  }
}
