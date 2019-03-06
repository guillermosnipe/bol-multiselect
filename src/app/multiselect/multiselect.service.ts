import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from './multiselect.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface ProductCategory {
  id: number;
  name: string;
  selected: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class MultiSelectService {

  constructor(private http: HttpClient) { }

  // URL to web api - mocked. Categories is the object present in the mock server file
  private categoriesUrl = 'api/categories';
  readonly categories$ = this.getCategories();

  /** GET heroes from the server */
  getCategories(): Observable<Array<ProductCategory>> {
    return this.http.get<Array<ProductCategory>>(this.categoriesUrl, httpOptions);
  }
}
