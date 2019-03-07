import { Component, OnInit } from '@angular/core';
import { MultiSelectService, ProductCategory } from './multiselect.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bol-multiselect',
  templateUrl: './multiselect.component.html'
})
export class MultiselectComponent implements OnInit {
  // TODO: create an options object out of this...
  _pageSize = 100;
  _page = 1;
  _categoriesArray: ProductCategory[];
  _dataSubscriptionHandler: Subscription;
  categoriesArray: ProductCategory[] = [];
  categoriesForm: FormGroup;

  constructor(private dataService: MultiSelectService, private fb: FormBuilder) {
    this.categoriesForm = this.fb.group({
      categories: this.fb.array([])
    });
  }

  get categories(): FormArray {
    return this.categoriesForm.get('categories') as FormArray;
  }

  get searchCategoriesField(): FormControl {
    return this.categoriesForm.get('searchCategories') as FormControl;
  }

  ngOnInit(): void {
    // TODO: Implement the catch in case that the request fails.
    this._dataSubscriptionHandler = this.dataService.categories$.subscribe(
      data => {
        this._categoriesArray = data;
        this.addBatchOfCategories().then(checkboxes => this.addCheckboxes(checkboxes));
      }
    );
  }

  onScrollingFinished(): void {
    this.addBatchOfCategories().then(checkboxes => this.addCheckboxes(checkboxes));
    console.log('Scroll finished!');
  }

  onSearchTermIntroduced(event): void {
    console.log(`a new search term has been introduced: ${event}`);
  }

  onCheckChange(event): void {
    // Checking the opposite option.
    this.categoriesArray[event.target.id].selected = !this.categoriesArray[event.target.id].selected;

    this.sortForm(this.categories.value);
    this.categoriesArray.sort( (a, b) => {
      if (a.selected < b.selected) { return 1; }
      if (a.selected > b.selected) { return -1; }

      // Both items are not selected. Then sort them by name.
      if (a.selected === b.selected) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); // localeCompare is the key.
      }
    });
  }

  onSubmit(formValue): void {
    const form = Object.assign({}, formValue, {
      categories: formValue.categories.map((category, index) => {
        return {
          id: this.categoriesArray[index].id,
          selected: category
        };
      })
    });
    // TODO: Reset the search field
    console.log( form.categories.filter( (category) => category.selected ));
    // TODO: This method should return the selected ones.
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
    if (this._categoriesArray.length - this.calculateCategoriesBatchLimit(page) <= (_pageSize * -1 + 1)) {
      return null;
    }

    this.categoriesArray.push(...this._categoriesArray.filter(
      (item, index) =>
        (page > 1) ?
          index >= this.calculateCategoryToStartFrom(page, this._pageSize) && index < this.calculateCategoriesBatchLimit(page)
          : index < this.calculateCategoriesBatchLimit(page)
    ));

    categoriesInterval = this.calculateCategoriesInterval(this.categoriesArray, page);

    this._page = this._page + 1;
    console.log(this.categoriesArray);
    return categoriesInterval;
  }

  calculateCategoryToStartFrom(page = 1, pageSize = this._pageSize): number {
    let result = 0;
    if (page > 1) { result = (page - 1) * pageSize; }

    return result;
  }

  calculateCategoriesBatchLimit(page, pageSize = this._pageSize): number {
    return page * pageSize;
  }

  calculateCategoriesInterval(categoriesArray, page: number): Array<number> {
    const start = this.calculateCategoryToStartFrom(page);
    let finish = this.calculateCategoriesBatchLimit(page);

    if (finish > categoriesArray.length) { finish = categoriesArray.length; }

    return [start, finish];
  }

  addCheckboxes(checkboxesToAdd: Array<number> | null) {
    if (checkboxesToAdd === null) { return false; }

    const [start, end] = checkboxesToAdd;

    for (let i = start; i < end; i = i + 1) {
      this.categories.push(this.fb.control(this.categoriesArray[i].selected));
    }
  }

  sortForm(arrayToSort: Array<ProductCategory>) {
    const sortedArray = arrayToSort.sort( (a, b) => {
      if (a < b) { return 1; }
      if (a > b) { return -1; }
      return 0;
    });

    this.categoriesForm.patchValue({
      categories: sortedArray
    });

  }

  // TODO: Implement onDestroy and unsubscribe
}
