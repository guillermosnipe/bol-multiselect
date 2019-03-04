import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MultiSelectModule } from './multiselect/multiselect.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MultiSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
