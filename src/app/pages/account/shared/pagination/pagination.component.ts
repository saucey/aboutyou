import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  @Input() activePage = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];

  ngOnChanges() {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.pageChange.emit(this.activePage);
  }

  private getPageCount(): number {
    let totalPageCount = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPageCount = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPageCount;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray: number[] = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number) {
    if (pageNumber < 1) {
      return;
    }
    if (pageNumber > this.pages.length) {
      return;
    }
    this.activePage = pageNumber;
    this.pageChange.emit(this.activePage);
  }
}
