import { Component, Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'ix-picture',
  template: '<picture><ng-content></ng-content></picture>',
})
export class IxPictureComponent {}
