import { Component, OnInit } from '@angular/core';
import { MultiSelectService, ProductCategory } from './multiselect.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bol-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {
  // TODO: create an options object out of this...
  _pageSize = 100;
  _page = 1;
  _categories: ProductCategory[];
  _dataSubscriptionHandler: Subscription;
  categories: ProductCategory[] = [];
  categoriesForm: FormGroup;

  constructor(private dataService: MultiSelectService, private fb: FormBuilder) {
    this.categoriesForm = this.fb.group({
      categories: this.fb.array([])
    });
  }

  get formCategories() {
    return this.categoriesForm.get('categories') as FormArray;
  }

  ngOnInit(): void {
    this._dataSubscriptionHandler = this.dataService.categories$.subscribe(
      data => {
        this._categories = data;
        this.addBatchOfCategories().then(checkboxes => this.addCheckboxes(checkboxes));
      }
    );
  }

  onScrollingFinished() {
    this.addBatchOfCategories().then(checkboxes => this.addCheckboxes(checkboxes));
    console.log('Scroll finished!');
  }

  onCheckChange(event): void {
    console.log(`event checked: ${event.target.checked}`);
    this.categories[event.target.id].selected = !this.categories[event.target.id].selected;
    console.log(`this: ${this.categories[event.target.id].selected}`);

    this.sortForm(this.formCategories.value);
    this.categories.sort( (a, b) => {
      if (a.selected < b.selected) { return 1; }
      if (a.selected > b.selected) { return -1; }

      if (a.selected === b.selected) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); // localeCompare is the key.
      }
    });

    console.log(this.categories);
    console.log(this.formCategories);
  }

  onSubmit(formValue) {
    const form = Object.assign({}, formValue, {
      categories: formValue.categories.map((category, index) => {
        return {
          id: this.categories[index].id,
          selected: category
        };
      })
    });
    console.warn(this.categoriesForm.value);
  }

  // Tracking function
  categoryId(category: ProductCategory): number {
    if (!category) { return null; }
    return category.id;
  }

  // Adds a batch of categories to the array and returns the range of controls that must be created.
  async addBatchOfCategories(page: number = this._page, _pageSize: number = this._pageSize) {
    let categoriesInterval: Array<number>;

    // There are no more elements to add. Exit
    if (this._categories.length - this.calculateCategoriesBatchLimit(page) <= (_pageSize * -1 + 1)) {
      return null;
    }

    this.categories.push(...this._categories.filter(
      (item, index) =>
        (page > 1) ?
          index >= this.calculateCategoryToStartFrom(page, this._pageSize) && index < this.calculateCategoriesBatchLimit(page)
          : index < this.calculateCategoriesBatchLimit(page)
    ));

    categoriesInterval = this.calculateCategoriesInterval(this.categories, page);

    this._page = this._page + 1;
    console.log(this.categories);
    return categoriesInterval;
  }

  calculateCategoryToStartFrom(page = 1, pageSize = this._pageSize) {
    let result = 0;
    if (page > 1) { result = (page - 1) * pageSize; }

    return result;
  }

  calculateCategoriesBatchLimit(page, pageSize = this._pageSize) {
    return page * pageSize;
  }

  calculateCategoriesInterval(categoriesArray, page: number, pageSize: number = this._pageSize) {
    const start = this.calculateCategoryToStartFrom(page);
    let finish = this.calculateCategoriesBatchLimit(page);

    if (finish > categoriesArray.length) { finish = categoriesArray.length; }

    return [start, finish];
  }

  addCheckboxes(checkboxesToAdd: Array<number> | null) {

    if (checkboxesToAdd === null) { return false; }

    const [start, end] = checkboxesToAdd;
    console.log('addCheckboxes');
    console.log(`start: ${start} end: ${end}`);

    for (let i = start; i < end; i = i + 1) {
      this.formCategories.push(this.fb.control(this.categories[i].selected));
    }
  }

  sortForm(arrayToSort: Array<ProductCategory>) {
    console.log(arrayToSort);
    const sortedArray = arrayToSort.sort( (a, b) => {
      if (a < b) { return 1; }
      if (a > b) { return -1; }
      return 0;
    });

    this.categoriesForm.patchValue({
      categories: this.formCategories.value
    });

    // this.formCategories.setValue(this.formCategories.value);

  }

  // TODO: Implement onDestroy and unsubscribe
}
