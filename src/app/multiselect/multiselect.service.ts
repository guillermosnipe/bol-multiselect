import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retryWhen, delay, tap } from 'rxjs/operators';
import { ProductCategory } from './multiselect.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface ProductCategory {
  id: number;
  name: string;
  selected: boolean;
  rendered: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class MultiSelectService {

  constructor(private http: HttpClient) { }

  // URL to web api - mocked. Categories is the object present in the mock server file
  private categoriesUrl = 'api/categories222';
  readonly categories$ = this.getCategories().pipe(
                                retryWhen(errors =>
                                  errors.pipe(
                                    delay(1000),
                                    tap(errorStatus => {
                                      if (!errorStatus.status.toString().startsWith('5')) {
                                        throw new Error(
                                          `(${errorStatus.status}) ${errorStatus.body.error}. Your service is not fetching data.`);
                                      }
                                      console.log('Retrying...');
                                    })
                                  )
                                )
                              );

  /** GET heroes from the server */
  getCategories(): Observable<Array<ProductCategory>> {
    return this.http
              .get<Array<ProductCategory>>(this.categoriesUrl, httpOptions);

  }
}
