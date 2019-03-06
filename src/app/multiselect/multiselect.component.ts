import { Component, OnInit } from '@angular/core';
import { MultiSelectService, ProductCategory } from './multiselect.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'bol-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  _pageSize = 100;
  _page = 1;
  _categories: ProductCategory[];
  categories: ProductCategory[] = [];
  categoriesForm: FormGroup;

  constructor(private dataService: MultiSelectService, private fb: FormBuilder) {
    this.categoriesForm = this.fb.group({
      categories: this.addCategories()
    });
  }

  get formCategories() {
    return this.categoriesForm.get('categories') as FormArray;
  }

  // Tracking function
  categoryId(category: ProductCategory): number {
    if (!category) { return null; }
    return category.id;
  }

  getBatchOfCategories(page: number = this._page, _pageSize: number = this._pageSize) {

    // There are no more elements to add. Exit
    if (this._categories.length - this.calculateInterval(page) <= (_pageSize * -1 + 1) ) {
      return false;
    }

    this.categories.push( ...this._categories.filter(
      (item, index) =>
          (page > 1) ?
              index >= this.calculateElementToStartFrom(page, this._pageSize)
                && index < this.calculateInterval(page) : index < this.calculateInterval(page)
    ));

    this._page = this._page + 1;
    console.log(this.categories);
  }

  calculateInterval(page, pageSize = this._pageSize) {
    return page * pageSize;
  }

  calculateElementToStartFrom(page = 1, pageSize = this._pageSize) {
    return (page - 1) * pageSize;
  }

  addCheckboxes() {
    console.log('addCheckboxes');
    this.categories.map( category => this.formCategories.push(this.fb.control(false)));
  }

  // not using it
  addCategories() {
    const categoriesArray = this.categories.map(category => {
      return this.fb.control(category.selected);
    });
    return this.fb.array(categoriesArray);
  }

  ngOnInit(): void {
    this.dataService.categories$.subscribe(
      data => {
        this._categories = data;
        this.getBatchOfCategories();
        this.addCheckboxes();
      }
    );
  }

  onScrollingFinished() {
    this.getBatchOfCategories();
    console.log('Scroll finished!');
    //this.addCheckboxes();
  }

  onSubmit(formValue) {
    const form = Object.assign({}, formValue, {
      categories: formValue.categories.map( (category, index) => {
        return {
          id: this.categories[index].id,
          selected: category
        };
      })
    });

    console.log(form);
    console.warn(this.categoriesForm.value);

  }


}
