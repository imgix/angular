import { ModuleWithProviders, NgModule } from '@angular/core';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { IxImgComponent } from './ix-img.component';
import { IxPictureComponent } from './ix-picture.component';
import { IxSourceComponent } from './ix-source.component';

@NgModule({
  declarations: [IxImgComponent, IxSourceComponent, IxPictureComponent],
  exports: [IxImgComponent, IxSourceComponent, IxPictureComponent],
})
export class ImgixAngularModule {
  // Using config injection pattern from: https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
  static forRoot(config: ImgixConfig): ModuleWithProviders<ImgixAngularModule> {
    return {
      ngModule: ImgixAngularModule,
      providers: [
        IxImgComponent,
        IxSourceComponent,
        IxPictureComponent,
        { provide: ImgixConfigService, useValue: config },
      ],
    };
  }
}
