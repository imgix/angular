import { Component, Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: '[ix-picture]',
  template: '<ng-content></ng-content>',
})
export class IxPictureComponent {}
