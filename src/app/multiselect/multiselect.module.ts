import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MultiselectComponent } from './multiselect.component';
import { MultiSelectDataService } from './multiselect-data.service';
import { ScrollTrackerDirective } from './directives/bolScrollTracker.directive';

import { SearchBoxComponent } from './search-box/search-box.component';


@NgModule({
  declarations: [
    MultiselectComponent,
    ScrollTrackerDirective,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MultiSelectDataService, { dataEncapsulation: false }
    )
  ],
  exports: [MultiselectComponent]
})
export class MultiSelectModule { }
