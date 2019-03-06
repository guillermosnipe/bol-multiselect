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

  pageSize = 100;
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

  getBatchOfCategories(page: number = this._page, pageSize: number = this.pageSize) {
    this.categories = this._categories.filter((item, index) => index < page * pageSize);
    this._page = this._page + 1;
    console.log(this.categories);
  }

  addCheckboxes() {
    console.log('addCheckboxes');
    this.categories.map( category => this.formCategories.push(this.fb.control(false)));
  }

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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.categoriesForm.value);
  }

}
