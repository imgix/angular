import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template:
  `
  <img src="https://assets.imgix.net/unsplash/motorbike.jpg" [ixSrcset]="{ minWidth: 800, maxWidth: 1200 }" />
  <img src="https://assets.imgix.net/unsplash/bridge.jpg?w=500" ixSrcset />
  <img src="https://assets.imgix.net/unsplash/raspberries.jpg?w=900" [ixSrcset]="{ disableVariableQuality: true }" />
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-imgix-example';
}
