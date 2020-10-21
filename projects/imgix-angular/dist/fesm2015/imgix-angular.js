import { InjectionToken, Injectable, Component, Inject, ElementRef, Input, NgModule } from '@angular/core';
import ImgixClient from 'imgix-core-js';

const ImgixConfigService = new InjectionToken('ImgixConfig');

const IMGIX_NG_VERSION = '1.0.0-rc.1';

function createImgixClient(config) {
    const client = new ImgixClient({
        domain: config.domain,
        includeLibraryParam: false,
    });
    if (!(config.includeLibraryParam === false)) {
        client.settings.libraryParam = `ng-${IMGIX_NG_VERSION}`;
    }
    return client;
}

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}
function coerceNumericProperty(value) {
    if (typeof value === 'string') {
        const valueParsed = Number.parseFloat(value);
        if (!Number.isNaN(valueParsed)) {
            return valueParsed;
        }
    }
    else if (typeof value === 'number' && !Number.isNaN(value)) {
        return value;
    }
    return undefined;
}

class IxImgComponent {
    constructor(config, elementRef) {
        this.config = config;
        this.elementRef = elementRef;
        this._fixed = false;
        this._disableVariableQuality = false;
        this.client = createImgixClient(this.config);
    }
    get fixed() {
        return this._fixed;
    }
    set fixed(value) {
        this._fixed = coerceBooleanProperty(value);
    }
    get width() {
        return this._width;
    }
    set width(_width) {
        this._width = coerceNumericProperty(_width);
    }
    get height() {
        return this._height;
    }
    set height(_height) {
        this._height = coerceNumericProperty(_height);
    }
    get disableVariableQuality() {
        return this._disableVariableQuality;
    }
    set disableVariableQuality(_disableVariableQuality) {
        this._disableVariableQuality = coerceBooleanProperty(_disableVariableQuality);
    }
    ngAfterViewChecked() {
        this.setSrcAndSrcsetAttributes();
        this.setOtherAttributes();
    }
    setOtherAttributes() {
        const el = this.elementRef.nativeElement;
        if (this.width != null) {
            el.setAttribute('width', String(this.width));
        }
        if (this.height != null) {
            el.setAttribute('height', String(this.height));
        }
    }
    buildIxParams() {
        const imgixParamsFromImgAttributes = Object.assign({}, (this.fixed && Object.assign(Object.assign({}, (this.width != null ? { w: this.width } : {})), (this.height != null ? { h: this.height } : {}))));
        return Object.assign(Object.assign(Object.assign({}, this.config.defaultImgixParams), imgixParamsFromImgAttributes), this.imgixParams);
    }
    setSrcAndSrcsetAttributes() {
        var _a, _b, _c, _d;
        const el = this.elementRef.nativeElement;
        el.setAttribute((_b = (_a = this.attributeConfig) === null || _a === void 0 ? void 0 : _a.src) !== null && _b !== void 0 ? _b : 'src', this.srcURL);
        el.setAttribute((_d = (_c = this.attributeConfig) === null || _c === void 0 ? void 0 : _c.srcset) !== null && _d !== void 0 ? _d : 'srcset', this.srcsetURL);
    }
    get srcURL() {
        return this.client.buildURL(this.path, this.buildIxParams());
    }
    get srcsetURL() {
        return this.client.buildSrcSet(this.path, this.buildIxParams(), {
            disableVariableQuality: this.disableVariableQuality,
        });
    }
}
IxImgComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                // the [path] means that path is required
                selector: '[ixImg][path]',
                template: ``
            },] }
];
IxImgComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ImgixConfigService,] }] },
    { type: ElementRef }
];
IxImgComponent.propDecorators = {
    path: [{ type: Input, args: ['path',] }],
    fixed: [{ type: Input }],
    imgixParams: [{ type: Input, args: ['imgixParams',] }],
    width: [{ type: Input, args: ['width',] }],
    height: [{ type: Input }],
    attributeConfig: [{ type: Input }],
    disableVariableQuality: [{ type: Input }]
};

class IxPictureComponent {
}
IxPictureComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                selector: '[ixPicture]',
                template: '<ng-content></ng-content>'
            },] }
];

class IxSourceComponent {
    constructor(config, elementRef) {
        this.config = config;
        this.elementRef = elementRef;
        this._disableVariableQuality = false;
        this.client = createImgixClient(config);
    }
    get disableVariableQuality() {
        return this._disableVariableQuality;
    }
    set disableVariableQuality(_disableVariableQuality) {
        this._disableVariableQuality = coerceBooleanProperty(_disableVariableQuality);
    }
    ngAfterViewChecked() {
        this.setSrcsetAttribute();
    }
    buildIxParams() {
        const imgixParamsFromImgAttributes = {};
        return Object.assign(Object.assign(Object.assign({}, this.config.defaultImgixParams), imgixParamsFromImgAttributes), this.imgixParams);
    }
    setSrcsetAttribute() {
        var _a, _b;
        const el = this.elementRef.nativeElement;
        el.setAttribute((_b = (_a = this.attributeConfig) === null || _a === void 0 ? void 0 : _a.srcset) !== null && _b !== void 0 ? _b : 'srcset', this.srcsetURL);
    }
    get srcsetURL() {
        return this.client.buildSrcSet(this.path, this.buildIxParams(), {
            disableVariableQuality: this.disableVariableQuality,
        });
    }
}
IxSourceComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                // the [path] means that path is required
                selector: '[ixSource][path]',
                template: ``
            },] }
];
IxSourceComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ImgixConfigService,] }] },
    { type: ElementRef }
];
IxSourceComponent.propDecorators = {
    path: [{ type: Input, args: ['path',] }],
    imgixParams: [{ type: Input }],
    attributeConfig: [{ type: Input }],
    disableVariableQuality: [{ type: Input }]
};

class ImgixAngularModule {
    // Using config injection pattern from: https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
    static forRoot(config) {
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
ImgixAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [IxImgComponent, IxSourceComponent, IxPictureComponent],
                exports: [IxImgComponent, IxSourceComponent, IxPictureComponent],
            },] }
];

/*
 * Public API Surface of imgix-angular
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ImgixAngularModule, IxImgComponent, IxPictureComponent, IxSourceComponent, ImgixConfigService as ɵb };
//# sourceMappingURL=imgix-angular.js.map
