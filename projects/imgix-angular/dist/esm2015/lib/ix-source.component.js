import { Component, ElementRef, Inject, Injectable, Input, } from '@angular/core';
import { createImgixClient } from '../common/createImgixClient';
import { coerceBooleanProperty } from '../common/ng';
import { ImgixConfigService } from './imgix-config.service';
export class IxSourceComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZnJlZC9Qcm9ncmFtbWluZy9pbWdpeC9zZGstbW9ub3JlcG8vanMvcGFja2FnZXMvbmctaW1naXgvcHJvamVjdHMvaW1naXgtYW5ndWxhci9zcmMvIiwic291cmNlcyI6WyJsaWIvaXgtc291cmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sVUFBVSxFQUNWLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDckQsT0FBTyxFQUFlLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTekUsTUFBTSxPQUFPLGlCQUFpQjtJQWlCNUIsWUFDc0MsTUFBbUIsRUFDL0MsVUFBc0I7UUFETSxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQy9DLGVBQVUsR0FBVixVQUFVLENBQVk7UUFKeEIsNEJBQXVCLEdBQVksS0FBSyxDQUFDO1FBTS9DLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQWhCRCxJQUNJLHNCQUFzQjtRQUN4QixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsSUFBSSxzQkFBc0IsQ0FBQyx1QkFBZ0M7UUFDekQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHFCQUFxQixDQUNsRCx1QkFBdUIsQ0FDeEIsQ0FBQztJQUNKLENBQUM7SUFVRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNPLGFBQWE7UUFDbkIsTUFBTSw0QkFBNEIsR0FBRyxFQUFFLENBQUM7UUFDeEMscURBQ0ssSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FDOUIsNEJBQTRCLEdBQzVCLElBQUksQ0FBQyxXQUFXLEVBQ25CO0lBQ0osQ0FBQztJQUNPLGtCQUFrQjs7UUFDeEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDekMsRUFBRSxDQUFDLFlBQVksYUFBQyxJQUFJLENBQUMsZUFBZSwwQ0FBRSxNQUFNLG1DQUFJLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDOUQsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQjtTQUNwRCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFqREYsVUFBVTtZQUNWLFNBQVMsU0FBQztnQkFDVCx5Q0FBeUM7Z0JBQ3pDLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7Ozs0Q0FtQkksTUFBTSxTQUFDLGtCQUFrQjtZQW5DNUIsVUFBVTs7O21CQW9CVCxLQUFLLFNBQUMsTUFBTTswQkFDWixLQUFLOzhCQUNMLEtBQUs7cUNBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgSW1naXhDbGllbnQgZnJvbSAnaW1naXgtY29yZS1qcyc7XG5pbXBvcnQgeyBjcmVhdGVJbWdpeENsaWVudCB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGVJbWdpeENsaWVudCc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICcuLi9jb21tb24vbmcnO1xuaW1wb3J0IHsgSW1naXhDb25maWcsIEltZ2l4Q29uZmlnU2VydmljZSB9IGZyb20gJy4vaW1naXgtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUltZ2l4UGFyYW1zIH0gZnJvbSAnLi90eXBlcyc7XG5cbkBJbmplY3RhYmxlKClcbkBDb21wb25lbnQoe1xuICAvLyB0aGUgW3BhdGhdIG1lYW5zIHRoYXQgcGF0aCBpcyByZXF1aXJlZFxuICBzZWxlY3RvcjogJ1tpeFNvdXJjZV1bcGF0aF0nLFxuICB0ZW1wbGF0ZTogYGAsXG59KVxuZXhwb3J0IGNsYXNzIEl4U291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2xpZW50OiBJbWdpeENsaWVudDtcblxuICBASW5wdXQoJ3BhdGgnKSBwYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGltZ2l4UGFyYW1zPzogSUltZ2l4UGFyYW1zO1xuICBASW5wdXQoKSBhdHRyaWJ1dGVDb25maWc/OiB7IHNyY3NldD86IHN0cmluZyB9O1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVZhcmlhYmxlUXVhbGl0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVZhcmlhYmxlUXVhbGl0eTtcbiAgfVxuICBzZXQgZGlzYWJsZVZhcmlhYmxlUXVhbGl0eShfZGlzYWJsZVZhcmlhYmxlUXVhbGl0eTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVWYXJpYWJsZVF1YWxpdHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoXG4gICAgICBfZGlzYWJsZVZhcmlhYmxlUXVhbGl0eSxcbiAgICApO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVWYXJpYWJsZVF1YWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEltZ2l4Q29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWc6IEltZ2l4Q29uZmlnLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjcmVhdGVJbWdpeENsaWVudChjb25maWcpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuc2V0U3Jjc2V0QXR0cmlidXRlKCk7XG4gIH1cbiAgcHJpdmF0ZSBidWlsZEl4UGFyYW1zKCkge1xuICAgIGNvbnN0IGltZ2l4UGFyYW1zRnJvbUltZ0F0dHJpYnV0ZXMgPSB7fTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuZGVmYXVsdEltZ2l4UGFyYW1zLFxuICAgICAgLi4uaW1naXhQYXJhbXNGcm9tSW1nQXR0cmlidXRlcyxcbiAgICAgIC4uLnRoaXMuaW1naXhQYXJhbXMsXG4gICAgfTtcbiAgfVxuICBwcml2YXRlIHNldFNyY3NldEF0dHJpYnV0ZSgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGVsLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZUNvbmZpZz8uc3Jjc2V0ID8/ICdzcmNzZXQnLCB0aGlzLnNyY3NldFVSTCk7XG4gIH1cbiAgZ2V0IHNyY3NldFVSTCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5idWlsZFNyY1NldCh0aGlzLnBhdGgsIHRoaXMuYnVpbGRJeFBhcmFtcygpLCB7XG4gICAgICBkaXNhYmxlVmFyaWFibGVRdWFsaXR5OiB0aGlzLmRpc2FibGVWYXJpYWJsZVF1YWxpdHksXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==