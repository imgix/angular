import { InjectionToken } from '@angular/core';

export interface ImgixConfig {
  domain: string;
}

export const ImgixConfigService = new InjectionToken<ImgixConfig>(
  'ImgixConfig',
);
