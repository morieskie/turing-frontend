import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CatalogueItemService} from './service/catalogue-item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueItem, CatalogueItemInterface} from './model/catalogue-item';
import {Observable, of} from 'rxjs';
import {ReviewService} from './service/review.service';

@Component({
  templateUrl: './template/catalogue-item-detail.component.html',
  styleUrls: [],
})
export class CatalogueItemDetailComponent implements OnInit, AfterViewInit {

  public productId: number;

  public model: Observable<CatalogueItemInterface>;
  public modelLoaded: Observable<boolean>;
  public reviews = [];
  public reviewCount = 0;
  public weightedAverage: string;
  public weightedAverageRounded: number;

  constructor(private catalogueItemService: CatalogueItemService,
              public route: ActivatedRoute, private reviewService: ReviewService) {
    this.reviewService.getObservableReviews().subscribe(next => {
      this.reviews = next;
      this.reviewCount = next.length;
      const weightedAverage = this.reviewService.calculateWeightedAverageVote(next)
      this.weightedAverage = weightedAverage.toFixed(1);
      this.weightedAverageRounded = Math.floor(weightedAverage);
    });

  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId');
    this.catalogueItemService.show(this.productId).then(result => {
      const data = result;
      this.model = of(data);
      console.log('TRANSFORMED MODEL', data);
      this.reviews = data.reviews;
      this.reviewCount = data.reviews.length;
      this.modelLoaded = of(true);
      const weightedAverage = this.reviewService.calculateWeightedAverageVote(data.reviews);
      this.weightedAverage = weightedAverage.toFixed(1);
      this.weightedAverageRounded = Math.floor(weightedAverage);
    });
  }

  ngAfterViewInit(): void {
  }
}
