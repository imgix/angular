import { AfterViewChecked, ElementRef } from '@angular/core';
import { ImgixConfig } from './imgix-config.service';
import { IImgixParams } from './types';
export declare class IxSourceComponent implements AfterViewChecked {
    private config;
    private elementRef;
    private readonly client;
    path: string;
    imgixParams?: IImgixParams;
    attributeConfig?: {
        srcset?: string;
    };
    get disableVariableQuality(): boolean;
    set disableVariableQuality(_disableVariableQuality: boolean);
    private _disableVariableQuality;
    constructor(config: ImgixConfig, elementRef: ElementRef);
    ngAfterViewChecked(): void;
    private buildIxParams;
    private setSrcsetAttribute;
    get srcsetURL(): string;
}
