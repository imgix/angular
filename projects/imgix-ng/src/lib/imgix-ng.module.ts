import { ModuleWithProviders, NgModule } from '@angular/core';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { ImgixComponent } from './imgix.component';
import { IxSourceComponent } from './ix-source.component';

@NgModule({
  declarations: [ImgixComponent, IxSourceComponent],
  exports: [ImgixComponent, IxSourceComponent],
})
export class NgImgixModule {
  // Using config injection pattern from: https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
  static forRoot(config: ImgixConfig): ModuleWithProviders<NgImgixModule> {
    return {
      ngModule: NgImgixModule,
      providers: [
        ImgixComponent,
        IxSourceComponent,
        { provide: ImgixConfigService, useValue: config },
      ],
    };
  }
}
