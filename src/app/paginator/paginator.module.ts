import {NgModule} from '@angular/core';
import {NumberedPaginationComponent} from './numbered-pagination.component';
import {NumberPaginateService} from './number-paginate.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NumberedPaginationComponent
  ],
  exports: [
    NumberedPaginationComponent
  ],
  providers: [
    NumberPaginateService
  ]
})

export class PaginatorModule {
}
