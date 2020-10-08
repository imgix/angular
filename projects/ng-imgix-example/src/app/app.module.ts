import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgImgixModule } from '@imgix/ng';
import { AppComponent } from './app.component';
import { LazyloadDirective } from './lazyload.directive';

@NgModule({
  declarations: [AppComponent, LazyloadDirective],
  imports: [
    BrowserModule,
    NgImgixModule.forRoot({
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
