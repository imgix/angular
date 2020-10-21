import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  Injectable,
  Input,
} from '@angular/core';
import ImgixClient from 'imgix-core-js';
import { createImgixClient } from '../common/createImgixClient';
import { coerceBooleanProperty, coerceNumericProperty } from '../common/ng';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { IImgixParams } from './types';

@Injectable()
@Component({
  // the [path] means that path is required
  selector: '[ixImg][path]',
  template: ``,
})
export class IxImgComponent implements AfterViewChecked {
  private readonly client: ImgixClient;

  @Input('path') path: string;
  @Input()
  get fixed(): boolean {
    return this._fixed;
  }
  set fixed(value: boolean) {
    this._fixed = coerceBooleanProperty(value as any);
  }
  private _fixed: boolean = false;

  @Input('imgixParams') imgixParams?: IImgixParams;

  @Input('width')
  get width(): number | undefined {
    return this._width;
  }
  set width(_width: number | undefined) {
    this._width = coerceNumericProperty(_width);
  }
  private _width: number | undefined;

  @Input()
  get height(): number | undefined {
    return this._height;
  }
  set height(_height: number | undefined) {
    this._height = coerceNumericProperty(_height);
  }
  private _height: number | undefined;

  @Input() attributeConfig?: { src?: string; srcset?: string };
  @Input()
  get disableVariableQuality(): boolean {
    return this._disableVariableQuality;
  }
  set disableVariableQuality(_disableVariableQuality: boolean) {
    this._disableVariableQuality = coerceBooleanProperty(
      _disableVariableQuality,
    );
  }
  private _disableVariableQuality: boolean = false;

  constructor(
    @Inject(ImgixConfigService) private config: ImgixConfig,
    private elementRef: ElementRef<HTMLImageElement>,
  ) {
    this.client = createImgixClient(this.config);
  }

  ngAfterViewChecked() {
    this.setSrcAndSrcsetAttributes();
    this.setOtherAttributes();
  }

  private setOtherAttributes() {
    const el = this.elementRef.nativeElement;
    if (this.width != null) {
      el.setAttribute('width', String(this.width));
    }
    if (this.height != null) {
      el.setAttribute('height', String(this.height));
    }
  }

  private buildIxParams() {
    const imgixParamsFromImgAttributes = {
      ...(this.fixed && {
        ...(this.width != null ? { w: this.width } : {}),
        ...(this.height != null ? { h: this.height } : {}),
      }),
    };
    return {
      ...this.config.defaultImgixParams,
      ...imgixParamsFromImgAttributes,
      ...this.imgixParams,
    };
  }

  private setSrcAndSrcsetAttributes() {
    const el = this.elementRef.nativeElement;
    el.setAttribute(this.attributeConfig?.src ?? 'src', this.srcURL);
    el.setAttribute(this.attributeConfig?.srcset ?? 'srcset', this.srcsetURL);
  }

  get srcURL(): string {
    return this.client.buildURL(this.path, this.buildIxParams());
  }
  get srcsetURL(): string {
    return this.client.buildSrcSet(this.path, this.buildIxParams(), {
      disableVariableQuality: this.disableVariableQuality,
    });
  }
}
