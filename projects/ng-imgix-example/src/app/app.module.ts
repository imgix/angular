import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgImgixModule } from 'ng-imgix';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgImgixModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
