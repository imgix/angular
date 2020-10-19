import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImgixAngularModule } from '@imgix/angular';
import { AppComponent } from './app.component';
import { LazyloadDirective } from './lazyload.directive';

@NgModule({
  declarations: [AppComponent, LazyloadDirective],
  imports: [
    BrowserModule,
    ImgixAngularModule.forRoot({
      domain: 'assets.imgix.net',
      defaultImgixParams: {
        auto: 'format,compress',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
