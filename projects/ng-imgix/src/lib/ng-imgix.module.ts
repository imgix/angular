import { ModuleWithProviders, NgModule } from '@angular/core';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { ImgixComponent } from './imgix.component';

@NgModule({
  declarations: [ImgixComponent],
  imports: [],
  exports: [ImgixComponent],
})
export class NgImgixModule {
  // Using config injection pattern from: https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
  static forRoot(config: ImgixConfig): ModuleWithProviders {
    return {
      ngModule: NgImgixModule,
      providers: [
        ImgixComponent,
        { provide: ImgixConfigService, useValue: config },
      ],
    };
  }
}
