import { AfterViewChecked, ElementRef } from '@angular/core';
import { ImgixConfig } from './imgix-config.service';
import { IImgixParams } from './types';
export declare class IxImgComponent implements AfterViewChecked {
    private config;
    private elementRef;
    private readonly client;
    path: string;
    get fixed(): boolean;
    set fixed(value: boolean);
    private _fixed;
    imgixParams?: IImgixParams;
    get width(): number | undefined;
    set width(_width: number | undefined);
    private _width;
    get height(): number | undefined;
    set height(_height: number | undefined);
    private _height;
    attributeConfig?: {
        src?: string;
        srcset?: string;
    };
    get disableVariableQuality(): boolean;
    set disableVariableQuality(_disableVariableQuality: boolean);
    private _disableVariableQuality;
    constructor(config: ImgixConfig, elementRef: ElementRef<HTMLImageElement>);
    ngAfterViewChecked(): void;
    private setOtherAttributes;
    private buildIxParams;
    private setSrcAndSrcsetAttributes;
    get srcURL(): string;
    get srcsetURL(): string;
}
