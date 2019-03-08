import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'bol-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {

  @Input() customCssClasses: string;
  @Input() placeholder: string;
  @Output() searchTermIntroduced = new EventEmitter<boolean>();
  searchField: FormControl;
  searches: string[] = [];

  ngOnInit() {
      // Move the following code to its own component.
      this.searchField = new FormControl();
      this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        if (term === '') { term = null; }
        this.searchTermIntroduced.emit(term);
      });
  }

}
