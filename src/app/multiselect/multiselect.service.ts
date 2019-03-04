import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface ProductCategory {
  id: number;
  name: string;
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
