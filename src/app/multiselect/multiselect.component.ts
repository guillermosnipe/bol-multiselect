import { Component, OnInit } from '@angular/core';
import { MultiSelectService, ProductCategory } from './multiselect.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bol-multiselect',
  templateUrl: './multiselect.component.html'
})
export class MultiselectComponent implements OnInit {

  _pageSize = 100;
  _page = 1;
  _categoriesArray: ProductCategory[];
  _searchedCategories: ProductCategory[] | [] = [];
  _dataSubscriptionHandler: Subscription;
  categoriesArray: ProductCategory[] = [];
  categoriesForm: FormGroup;

  // Getters. Form fields references

  get categories(): FormArray {
    return this.categoriesForm.get('categories') as FormArray;
  }

  get searchedCategories(): FormArray {
    return this.categoriesForm.get('searchedCategories') as FormArray;
  }

  get searchCategoriesField(): FormControl {
    return this.categoriesForm.get('searchCategories') as FormControl;
  }

  constructor(private dataService: MultiSelectService, private fb: FormBuilder) {
    this.categoriesForm = this.fb.group({
      categories: this.fb.array([]),
      searchedCategories: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this._dataSubscriptionHandler = this.dataService.categories$.pipe(take(1)).subscribe(
      data => {
        // Adding the rendered flag to check which of them was already rendered
        this._categoriesArray = data.map( (category) => Object.assign({}, category, { rendered: false }));
        this.addBatchOfCategories().then(checkboxes => this.addCheckboxes(checkboxes));
      }
    );
  }

  // Scroll reached the end.
  onScrollingFinished(): void {
    // If search mode is off...
    if (this._searchedCategories.length === 0) {
      this.addBatchOfCategories().then(checkboxes => this.addCheckboxes(checkboxes));
    }
  }

  // Event handler that deals with a new search term
  onSearchTermIntroduced(event): void {
    this.renderSearchResultsList(event);
  }

  // Checked event handler for the categories listing.
  onCheckChange(event): void {
    // Checking the opposite option.
    this.categoriesArray[event.target.id].selected = !this.categoriesArray[event.target.id].selected;
    this.sortForm(this.categories.value);
    this.sortArrayByTwoFields(this.categoriesArray, 'selected', 'name');
  }

  // Checked event handler for the categories search listing.
  onSearchCheckChange(event): void {
    this.addCheckbox(event.target.id);

    // Sorting
    this.sortForm(this.categories.value);
    this.sortArrayByTwoFields(this.categoriesArray, 'selected', 'name');
    this.cleanSearchResults();
  }

  onSubmit(formValue): void {
    const form = Object.assign({}, formValue, {
      categories: formValue.categories.map((category: ProductCategory, index: number) => {
        return {
          id: this.categoriesArray[index].id,
          selected: category
        };
      })
    });
    console.log( form.categories.filter( (category) => category.selected ));
  }

  // ngFor Tracking function
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

    const filteredCategories = this._categoriesArray.filter(
      (item, index) => {
        // It will only render categories that where not rendered before
        if (item.rendered === false) {
          if (page > 1) {
              // eg: [100, 200]
              return index >= this.calculateCategoryToStartFrom(page, this._pageSize) && index < this.calculateCategoriesBatchLimit(page);
          } else {
              // eg: [0, 100]
              return index < this.calculateCategoriesBatchLimit(page);
          }
        } else {
          return false;
        }
      }
    );

    this.categoriesArray.push(...filteredCategories);

    categoriesInterval = this.calculateCategoriesInterval(this.categoriesArray, page);

    this._page = this._page + 1;
    return categoriesInterval;
  }

  // Renders the search results list
  renderSearchResultsList(searchTerm: string) {

    this.cleanSearchResults(searchTerm);

    // Filtering the matching categories
    this._searchedCategories = this._categoriesArray.filter(
                                    (category) => category.name.toLowerCase().indexOf(searchTerm) > -1 && !category.selected
                            );
    // renderSearchResultsList
    for ( const category of this._searchedCategories) {
      this.searchedCategories.push(this.fb.control(category.selected));
    }
  }

  // Cleans the search results
  cleanSearchResults(term: string | null = null) {
    // if the term is null
    if (term === null) {
      this._searchedCategories = [];
    }

    // clean the controls
    while (this.searchedCategories.length !== 0) {
      this.searchedCategories.removeAt(0);
    }

    // TODO: Remove search term

  }

  // Add an individual checkbox
  addCheckbox(categoryId) {
    const [category] = this._categoriesArray.filter( (c) => c.id === +categoryId);

    const isInArray = this.categoriesArray.some((cat, index) => {
      if (+categoryId === cat.id) {
        this.categories.controls[index].setValue(true);
        cat.selected = true;
        return true;
      }
    });

    if (!isInArray) {
      // Selecting the category
      category.selected = true;
      category.rendered = true;
      // Adding category
      this.categoriesArray.push(category);
      // Adding checkbox
      this.categories.push(this.fb.control(true));
    }
  }

  // Add multiple checkboxes. Used with addCategoriesBatches
  addCheckboxes(checkboxesToAdd: Array<number> | null) {
    if (checkboxesToAdd === null) { return false; }

    const [start, end] = checkboxesToAdd;

    for (let i = start; i < end; i = i + 1) {
      // If the category is rendered, then don't add the checkbox.
      if (this._categoriesArray[i].rendered !== true) {
        this.categories.push(this.fb.control(this.categoriesArray[i].selected));
        this._categoriesArray[i].rendered = true; // Marking the category as rendered
      }
    }
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

  sortArrayByTwoFields(userArray: Array<any>, fieldA: string, fieldB: string) {
      // The lines below can be refactored to use the sortArray method.
      userArray.sort( (a, b) => {
        if (a[fieldA] < b[fieldA]) { return 1; }
        if (a[fieldA] > b[fieldA]) { return -1; }

        // Both items are not selected. Then sort them by name.
        if (a[fieldA] === b[fieldA]) {
          return a[fieldB].toLowerCase().localeCompare(b[fieldB].toLowerCase()); // localeCompare is the key.
        }
      });
  }
}
