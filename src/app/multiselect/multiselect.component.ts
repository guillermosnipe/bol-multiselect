import { Component, OnInit } from '@angular/core';
import { range, zip, of, Observable, Subject } from 'rxjs';
import { MultiSelectService, ProductCategory } from './multiselect.service';

@Component({
  selector: 'bol-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  categories$: Observable<Array<ProductCategory>>;

  constructor(private data: MultiSelectService) {
    this.categories$ = data.categories$;
  }

  ngOnInit() {
  }

}
