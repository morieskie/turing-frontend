import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ProductReview} from './model/product-review';
import {CatalogueItemInterface} from './model/catalogue-item';
import {CatalogueItemService} from './service/catalogue-item.service';
import {ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {ReviewService} from './service/review.service';
import {NotificationService} from '../throbber/service/notification.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './template/product-review.component.html',
  styleUrls: [],
})
export class ProductReviewComponent implements OnInit, AfterViewInit {

  @Input()
  public model: CatalogueItemInterface;
  public formModel: ProductReview;
  public showName = false;
  public showEmail = false;
  public showSubject = false;

  constructor(private catalogueItemService: CatalogueItemService,
              public router: Router, private reviewService: ReviewService,
              public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.formModel = new ProductReview();
  }

  ngAfterViewInit() {
    console.log('ProductReviewComponent.ngAfterViewInit');
    // @ts-ignore
    window.initGallery();
  }

  submitReview(event) {
    event.preventDefault();

    this.catalogueItemService.reviewProduct(this.model.productId, {
      rating: this.formModel.rating,
      review: this.formModel.review
    })
      .then(items => {
        this.reviewService.updateReviews(items);
        this.formModel.rating = null;
        this.formModel.review = null;
        this.notificationService.success('Success', `Review has been submitted`);
      })
      .catch(error => {
        this.notificationService.error('Success', error.message);
        console.log(error.message);
      });
  }
}
