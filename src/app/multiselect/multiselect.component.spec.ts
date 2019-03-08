import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MultiselectComponent } from './multiselect.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { timeout } from 'rxjs/operators';


describe('MultiselectComponent (shallow tests)', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectComponent, SearchBoxComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    component.categoriesArray = [
      { id: 1, name: 'Accessories', selected: true, rendered: false },
      { id: 1, name: 'Books', selected: true, rendered: false },
      { id: 1, name: 'Super Heroes', selected: true, rendered: false }
    ];
    component.categoriesForm = new FormGroup({
      categories: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ]),
      searchedCategories: new FormArray([])
    });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the proper category name in the label', () => {
    const debugElement = fixture.debugElement.query(By.css('.multiselect-list--option > label'));
    expect(debugElement.nativeElement.textContent).toContain('Accessories');
  });

  it('should render the proper amount of fields', () => {
    expect(fixture.debugElement.queryAll(By.css('.multiselect-list--option')).length).toBe(3);
  });

});
