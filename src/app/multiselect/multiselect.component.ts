import { Component, OnInit } from '@angular/core';
import { MultiSelectService, ProductCategory } from './multiselect.service';

@Component({
  selector: 'bol-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  pageSize = 100;
  _page = 1;
  _categories: ProductCategory[];
  categories: ProductCategory[] = [];

  constructor(private dataService: MultiSelectService) { }

  ngOnInit(): void {
    this.dataService.categories$.subscribe(
      data => {
        this._categories = data;
        this.getBatchOfCategories();
      }
    );
  }

  getBatchOfCategories(page: number = this._page, pageSize: number = this.pageSize) {
    this.categories = this._categories.filter((item, index) => index < page * pageSize);
    this._page = this._page + 1;
  }

}
