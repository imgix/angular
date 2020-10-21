import { Component, ElementRef, Inject, Injectable, Input, } from '@angular/core';
import { createImgixClient } from '../common/createImgixClient';
import { coerceBooleanProperty, coerceNumericProperty } from '../common/ng';
import { ImgixConfigService } from './imgix-config.service';
export class IxImgComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXgtaW1nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZnJlZC9Qcm9ncmFtbWluZy9pbWdpeC9zZGstbW9ub3JlcG8vanMvcGFja2FnZXMvbmctaW1naXgvcHJvamVjdHMvaW1naXgtYW5ndWxhci9zcmMvIiwic291cmNlcyI6WyJsaWIvaXgtaW1nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sVUFBVSxFQUNWLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUUsT0FBTyxFQUFlLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTekUsTUFBTSxPQUFPLGNBQWM7SUE2Q3pCLFlBQ3NDLE1BQW1CLEVBQy9DLFVBQXdDO1FBRFosV0FBTSxHQUFOLE1BQU0sQ0FBYTtRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUE4QjtRQXBDMUMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQWdDeEIsNEJBQXVCLEdBQVksS0FBSyxDQUFDO1FBTS9DLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUE5Q0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUtELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsTUFBMEI7UUFD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LFNBQUMsa0JBQWtCO1lBL0Q1QixVQUFVOzs7bUJBb0JULEtBQUssU0FBQyxNQUFNO29CQUNaLEtBQUs7MEJBU0wsS0FBSyxTQUFDLGFBQWE7b0JBRW5CLEtBQUssU0FBQyxPQUFPO3FCQVNiLEtBQUs7OEJBU0wsS0FBSztxQ0FDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBJbWdpeENsaWVudCBmcm9tICdpbWdpeC1jb3JlLWpzJztcbmltcG9ydCB7IGNyZWF0ZUltZ2l4Q2xpZW50IH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZUltZ2l4Q2xpZW50JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtZXJpY1Byb3BlcnR5IH0gZnJvbSAnLi4vY29tbW9uL25nJztcbmltcG9ydCB7IEltZ2l4Q29uZmlnLCBJbWdpeENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2ltZ2l4LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IElJbWdpeFBhcmFtcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5AQ29tcG9uZW50KHtcbiAgLy8gdGhlIFtwYXRoXSBtZWFucyB0aGF0IHBhdGggaXMgcmVxdWlyZWRcbiAgc2VsZWN0b3I6ICdbaXhJbWddW3BhdGhdJyxcbiAgdGVtcGxhdGU6IGBgLFxufSlcbmV4cG9ydCBjbGFzcyBJeEltZ0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQge1xuICBwcml2YXRlIHJlYWRvbmx5IGNsaWVudDogSW1naXhDbGllbnQ7XG5cbiAgQElucHV0KCdwYXRoJykgcGF0aDogc3RyaW5nO1xuICBASW5wdXQoKVxuICBnZXQgZml4ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkO1xuICB9XG4gIHNldCBmaXhlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlIGFzIGFueSk7XG4gIH1cbiAgcHJpdmF0ZSBfZml4ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ2ltZ2l4UGFyYW1zJykgaW1naXhQYXJhbXM/OiBJSW1naXhQYXJhbXM7XG5cbiAgQElucHV0KCd3aWR0aCcpXG4gIGdldCB3aWR0aCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgfVxuICBzZXQgd2lkdGgoX3dpZHRoOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl93aWR0aCA9IGNvZXJjZU51bWVyaWNQcm9wZXJ0eShfd2lkdGgpO1xuICB9XG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KClcbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gIH1cbiAgc2V0IGhlaWdodChfaGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9oZWlnaHQgPSBjb2VyY2VOdW1lcmljUHJvcGVydHkoX2hlaWdodCk7XG4gIH1cbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgYXR0cmlidXRlQ29uZmlnPzogeyBzcmM/OiBzdHJpbmc7IHNyY3NldD86IHN0cmluZyB9O1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZVZhcmlhYmxlUXVhbGl0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVZhcmlhYmxlUXVhbGl0eTtcbiAgfVxuICBzZXQgZGlzYWJsZVZhcmlhYmxlUXVhbGl0eShfZGlzYWJsZVZhcmlhYmxlUXVhbGl0eTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVWYXJpYWJsZVF1YWxpdHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoXG4gICAgICBfZGlzYWJsZVZhcmlhYmxlUXVhbGl0eSxcbiAgICApO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVWYXJpYWJsZVF1YWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEltZ2l4Q29uZmlnU2VydmljZSkgcHJpdmF0ZSBjb25maWc6IEltZ2l4Q29uZmlnLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW1hZ2VFbGVtZW50PixcbiAgKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjcmVhdGVJbWdpeENsaWVudCh0aGlzLmNvbmZpZyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5zZXRTcmNBbmRTcmNzZXRBdHRyaWJ1dGVzKCk7XG4gICAgdGhpcy5zZXRPdGhlckF0dHJpYnV0ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3RoZXJBdHRyaWJ1dGVzKCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMud2lkdGggIT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyh0aGlzLndpZHRoKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmhlaWdodCAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIFN0cmluZyh0aGlzLmhlaWdodCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRJeFBhcmFtcygpIHtcbiAgICBjb25zdCBpbWdpeFBhcmFtc0Zyb21JbWdBdHRyaWJ1dGVzID0ge1xuICAgICAgLi4uKHRoaXMuZml4ZWQgJiYge1xuICAgICAgICAuLi4odGhpcy53aWR0aCAhPSBudWxsID8geyB3OiB0aGlzLndpZHRoIH0gOiB7fSksXG4gICAgICAgIC4uLih0aGlzLmhlaWdodCAhPSBudWxsID8geyBoOiB0aGlzLmhlaWdodCB9IDoge30pLFxuICAgICAgfSksXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuZGVmYXVsdEltZ2l4UGFyYW1zLFxuICAgICAgLi4uaW1naXhQYXJhbXNGcm9tSW1nQXR0cmlidXRlcyxcbiAgICAgIC4uLnRoaXMuaW1naXhQYXJhbXMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3JjQW5kU3Jjc2V0QXR0cmlidXRlcygpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGVsLnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZUNvbmZpZz8uc3JjID8/ICdzcmMnLCB0aGlzLnNyY1VSTCk7XG4gICAgZWwuc2V0QXR0cmlidXRlKHRoaXMuYXR0cmlidXRlQ29uZmlnPy5zcmNzZXQgPz8gJ3NyY3NldCcsIHRoaXMuc3Jjc2V0VVJMKTtcbiAgfVxuXG4gIGdldCBzcmNVUkwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuYnVpbGRVUkwodGhpcy5wYXRoLCB0aGlzLmJ1aWxkSXhQYXJhbXMoKSk7XG4gIH1cbiAgZ2V0IHNyY3NldFVSTCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5idWlsZFNyY1NldCh0aGlzLnBhdGgsIHRoaXMuYnVpbGRJeFBhcmFtcygpLCB7XG4gICAgICBkaXNhYmxlVmFyaWFibGVRdWFsaXR5OiB0aGlzLmRpc2FibGVWYXJpYWJsZVF1YWxpdHksXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==