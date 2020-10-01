import { InjectionToken } from '@angular/core';

export interface ImgixConfig {
  domain: string;
  includeLibraryParam?: boolean;
}

export const ImgixConfigService = new InjectionToken<ImgixConfig>(
  'ImgixConfig',
);
