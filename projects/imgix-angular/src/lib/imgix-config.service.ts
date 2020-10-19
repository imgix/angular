import { InjectionToken } from '@angular/core';
import { IImgixParams } from './types';

export interface ImgixConfig {
  domain: string;
  includeLibraryParam?: boolean;
  defaultImgixParams?: IImgixParams;
}

export const ImgixConfigService = new InjectionToken<ImgixConfig>(
  'ImgixConfig',
);
