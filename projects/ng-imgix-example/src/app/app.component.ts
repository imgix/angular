import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: ` <ix-img src="unsplash/motorbike.jpg"></ix-img> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-imgix-example';
}
