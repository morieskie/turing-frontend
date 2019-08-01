import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {NumberedPagerInterface} from './numbered-pager.interface';
import {NumberPaginateService} from './number-paginate.service';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-numbered-pagination',
  // template: ''
  templateUrl: './numbered-pagination.component.html'
})

export class NumberedPaginationComponent implements OnInit, OnChanges {
  @Input() pages: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;
  @Input() totalPages: number;
  public items = [];

  public pager: NumberedPagerInterface;

  constructor(private service: NumberPaginateService) {
    this.pages.subscribe(next => {
      this.items = next;
      if (next.length > 0) {
        this.setPage(this.initialPage);
      }
    });
  }

  ngOnInit() {
    console.log('Pagination.ngOnInit', this.pages, this.initialPage, this.pageSize);
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pages && changes.pages.currentValue !== changes.pages.previousValue) {
      this.items = changes.pages.currentValue;
      this.pager = this.service.paginate(this.totalPages, this.initialPage, this.pageSize, this.maxPages);
    }
  }

  public setPage(page: number, event?) {
    event.preventDefault();
    this.initialPage = page;
    // get new pager object for specified page
    this.pager = this.service.paginate(this.totalPages, page, this.pageSize, this.maxPages);
    this.changePage.emit(page);
  }
}
