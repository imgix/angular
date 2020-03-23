import { NgModule } from '@angular/core';
import { NgImgixComponent } from './ng-imgix.component';
import { IxSrcsetDirective } from './ix-srcset.directive';



@NgModule({
  declarations: [NgImgixComponent, IxSrcsetDirective],
  imports: [
  ],
  exports: [NgImgixComponent]
})
export class NgImgixModule { }
