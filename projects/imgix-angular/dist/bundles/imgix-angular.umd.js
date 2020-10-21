(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('imgix-core-js')) :
    typeof define === 'function' && define.amd ? define('@imgix/angular', ['exports', '@angular/core', 'imgix-core-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.imgix = global.imgix || {}, global.imgix.angular = {}), global.ng.core, global['imgix-core-js']));
}(this, (function (exports, core, ImgixClient) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ImgixClient__default = /*#__PURE__*/_interopDefaultLegacy(ImgixClient);

    var ImgixConfigService = new core.InjectionToken('ImgixConfig');

    var IMGIX_NG_VERSION = '1.0.0-rc.1';

    function createImgixClient(config) {
        var client = new ImgixClient__default['default']({
            domain: config.domain,
            includeLibraryParam: false,
        });
        if (!(config.includeLibraryParam === false)) {
            client.settings.libraryParam = "ng-" + IMGIX_NG_VERSION;
        }
        return client;
    }

    /** Coerces a data-bound value (typically a string) to a boolean. */
    function coerceBooleanProperty(value) {
        return value != null && "" + value !== 'false';
    }
    function coerceNumericProperty(value) {
        if (typeof value === 'string') {
            var valueParsed = Number.parseFloat(value);
            if (!Number.isNaN(valueParsed)) {
                return valueParsed;
            }
        }
        else if (typeof value === 'number' && !Number.isNaN(value)) {
            return value;
        }
        return undefined;
    }

    var IxImgComponent = /** @class */ (function () {
        function IxImgComponent(config, elementRef) {
            this.config = config;
            this.elementRef = elementRef;
            this._fixed = false;
            this._disableVariableQuality = false;
            this.client = createImgixClient(this.config);
        }
        Object.defineProperty(IxImgComponent.prototype, "fixed", {
            get: function () {
                return this._fixed;
            },
            set: function (value) {
                this._fixed = coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IxImgComponent.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (_width) {
                this._width = coerceNumericProperty(_width);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IxImgComponent.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (_height) {
                this._height = coerceNumericProperty(_height);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IxImgComponent.prototype, "disableVariableQuality", {
            get: function () {
                return this._disableVariableQuality;
            },
            set: function (_disableVariableQuality) {
                this._disableVariableQuality = coerceBooleanProperty(_disableVariableQuality);
            },
            enumerable: false,
            configurable: true
        });
        IxImgComponent.prototype.ngAfterViewChecked = function () {
            this.setSrcAndSrcsetAttributes();
            this.setOtherAttributes();
        };
        IxImgComponent.prototype.setOtherAttributes = function () {
            var el = this.elementRef.nativeElement;
            if (this.width != null) {
                el.setAttribute('width', String(this.width));
            }
            if (this.height != null) {
                el.setAttribute('height', String(this.height));
            }
        };
        IxImgComponent.prototype.buildIxParams = function () {
            var imgixParamsFromImgAttributes = Object.assign({}, (this.fixed && Object.assign(Object.assign({}, (this.width != null ? { w: this.width } : {})), (this.height != null ? { h: this.height } : {}))));
            return Object.assign(Object.assign(Object.assign({}, this.config.defaultImgixParams), imgixParamsFromImgAttributes), this.imgixParams);
        };
        IxImgComponent.prototype.setSrcAndSrcsetAttributes = function () {
            var _a, _b, _c, _d;
            var el = this.elementRef.nativeElement;
            el.setAttribute((_b = (_a = this.attributeConfig) === null || _a === void 0 ? void 0 : _a.src) !== null && _b !== void 0 ? _b : 'src', this.srcURL);
            el.setAttribute((_d = (_c = this.attributeConfig) === null || _c === void 0 ? void 0 : _c.srcset) !== null && _d !== void 0 ? _d : 'srcset', this.srcsetURL);
        };
        Object.defineProperty(IxImgComponent.prototype, "srcURL", {
            get: function () {
                return this.client.buildURL(this.path, this.buildIxParams());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IxImgComponent.prototype, "srcsetURL", {
            get: function () {
                return this.client.buildSrcSet(this.path, this.buildIxParams(), {
                    disableVariableQuality: this.disableVariableQuality,
                });
            },
            enumerable: false,
            configurable: true
        });
        return IxImgComponent;
    }());
    IxImgComponent.decorators = [
        { type: core.Injectable },
        { type: core.Component, args: [{
                    // the [path] means that path is required
                    selector: '[ixImg][path]',
                    template: ""
                },] }
    ];
    IxImgComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [ImgixConfigService,] }] },
        { type: core.ElementRef }
    ]; };
    IxImgComponent.propDecorators = {
        path: [{ type: core.Input, args: ['path',] }],
        fixed: [{ type: core.Input }],
        imgixParams: [{ type: core.Input, args: ['imgixParams',] }],
        width: [{ type: core.Input, args: ['width',] }],
        height: [{ type: core.Input }],
        attributeConfig: [{ type: core.Input }],
        disableVariableQuality: [{ type: core.Input }]
    };

    var IxPictureComponent = /** @class */ (function () {
        function IxPictureComponent() {
        }
        return IxPictureComponent;
    }());
    IxPictureComponent.decorators = [
        { type: core.Injectable },
        { type: core.Component, args: [{
                    selector: '[ixPicture]',
                    template: '<ng-content></ng-content>'
                },] }
    ];

    var IxSourceComponent = /** @class */ (function () {
        function IxSourceComponent(config, elementRef) {
            this.config = config;
            this.elementRef = elementRef;
            this._disableVariableQuality = false;
            this.client = createImgixClient(config);
        }
        Object.defineProperty(IxSourceComponent.prototype, "disableVariableQuality", {
            get: function () {
                return this._disableVariableQuality;
            },
            set: function (_disableVariableQuality) {
                this._disableVariableQuality = coerceBooleanProperty(_disableVariableQuality);
            },
            enumerable: false,
            configurable: true
        });
        IxSourceComponent.prototype.ngAfterViewChecked = function () {
            this.setSrcsetAttribute();
        };
        IxSourceComponent.prototype.buildIxParams = function () {
            var imgixParamsFromImgAttributes = {};
            return Object.assign(Object.assign(Object.assign({}, this.config.defaultImgixParams), imgixParamsFromImgAttributes), this.imgixParams);
        };
        IxSourceComponent.prototype.setSrcsetAttribute = function () {
            var _a, _b;
            var el = this.elementRef.nativeElement;
            el.setAttribute((_b = (_a = this.attributeConfig) === null || _a === void 0 ? void 0 : _a.srcset) !== null && _b !== void 0 ? _b : 'srcset', this.srcsetURL);
        };
        Object.defineProperty(IxSourceComponent.prototype, "srcsetURL", {
            get: function () {
                return this.client.buildSrcSet(this.path, this.buildIxParams(), {
                    disableVariableQuality: this.disableVariableQuality,
                });
            },
            enumerable: false,
            configurable: true
        });
        return IxSourceComponent;
    }());
    IxSourceComponent.decorators = [
        { type: core.Injectable },
        { type: core.Component, args: [{
                    // the [path] means that path is required
                    selector: '[ixSource][path]',
                    template: ""
                },] }
    ];
    IxSourceComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [ImgixConfigService,] }] },
        { type: core.ElementRef }
    ]; };
    IxSourceComponent.propDecorators = {
        path: [{ type: core.Input, args: ['path',] }],
        imgixParams: [{ type: core.Input }],
        attributeConfig: [{ type: core.Input }],
        disableVariableQuality: [{ type: core.Input }]
    };

    var ImgixAngularModule = /** @class */ (function () {
        function ImgixAngularModule() {
        }
        // Using config injection pattern from: https://medium.com/@michelestieven/angular-writing-configurable-modules-69e6ea23ea42
        ImgixAngularModule.forRoot = function (config) {
            return {
                ngModule: ImgixAngularModule,
                providers: [
                    IxImgComponent,
                    IxSourceComponent,
                    IxPictureComponent,
                    { provide: ImgixConfigService, useValue: config },
                ],
            };
        };
        return ImgixAngularModule;
    }());
    ImgixAngularModule.decorators = [
        { type: core.NgModule, args: [{
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

    exports.ImgixAngularModule = ImgixAngularModule;
    exports.IxImgComponent = IxImgComponent;
    exports.IxPictureComponent = IxPictureComponent;
    exports.IxSourceComponent = IxSourceComponent;
    exports.ɵb = ImgixConfigService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=imgix-angular.umd.js.map
