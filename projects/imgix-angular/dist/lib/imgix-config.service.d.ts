import { InjectionToken } from '@angular/core';
import { IImgixParams } from './types';
export interface ImgixConfig {
    domain: string;
    includeLibraryParam?: boolean;
    defaultImgixParams?: IImgixParams;
}
export declare const ImgixConfigService: InjectionToken<ImgixConfig>;
