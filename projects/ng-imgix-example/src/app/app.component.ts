import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<ix-img
    src="unsplash/motorbike.jpg"
    [attributeConfig]="{ src: 'data-src', srcset: 'data-srcset' }"
    lazy-img
    loading="lazy"
  ></ix-img>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-imgix-example';
}
