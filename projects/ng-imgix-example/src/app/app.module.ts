import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgImgixModule } from 'ng-imgix';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgImgixModule.forRoot({
      domain: 'assets.imgix.net',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
