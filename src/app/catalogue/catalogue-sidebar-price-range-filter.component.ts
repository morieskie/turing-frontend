import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-catalogue-sidebar-price-range-filter',
  templateUrl: './template/catalogue-sidebar-price-range.filter.component.html',
  styleUrls: [],
})
export class CatalogueSidebarPriceRangeFilterComponent implements OnInit, AfterViewInit {
  public min: any;
  public max: any;

  constructor(private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.min = params.min || 10;
      this.max = params.max || 30;
    });
  }

  ngOnInit(): void {
  }

  onPriceRangeSubmit(event) {
    this.min = event.target.querySelector('[name="min"]').value;
    this.max = event.target.querySelector('[name="max"]').value;
    console.log('onPriceRangeSubmit', event, this.min, this.max);
    return this.router.navigate(['catalogue'], {
      queryParams: {min: this.min, max: this.max},
      queryParamsHandling: 'merge'
    })
      .then(() => console.log('Price range applied'));
  }

  ngAfterViewInit(): void {

    const uiRangeSlider = document.querySelector('.ui-range-slider');

    // @ts-ignore
    const startMin = parseInt(this.min, 10);
    // @ts-ignore
    const startMax = parseInt(this.max, 10);
    // @ts-ignore
    const min = parseInt(uiRangeSlider.parentNode.getAttribute('data-min'), 10);
    // @ts-ignore
    const max = parseInt(uiRangeSlider.parentNode.getAttribute('data-max'), 10);
    // @ts-ignore
    const step = parseInt(uiRangeSlider.parentNode.getAttribute('data-step'), 10);
    const minValueWrapper = document.querySelector('.ui-range-value-min span');
    const maxValueWrapper = document.querySelector('.ui-range-value-max span');
    const minValue = document.querySelector('.ui-range-value-min input');
    const maxValue = document.querySelector('.ui-range-value-max input');

    // @ts-ignore
    noUiSlider.create(uiRangeSlider, {
      start: [startMin, startMax],
      connect: !0,
      step,
      range: {min, max}
    });

    // @ts-ignore
    uiRangeSlider.noUiSlider.on('update', (a, b) => {
      const c = a[b];
      // @ts-ignore
      b ? (maxValueWrapper.innerHTML = Math.round(c).toString(), maxValue.value = Math.round(c))
        // @ts-ignore
        : (minValueWrapper.innerHTML = Math.round(c).toString(), minValue.value = Math.round(c));
    });
  }


}
