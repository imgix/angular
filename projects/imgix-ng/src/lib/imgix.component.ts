import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  Injectable,
  Input,
  ViewChild,
} from '@angular/core';
import ImgixClient from 'imgix-core-js';
import { coerceBooleanProperty, coerceNumericProperty } from '../common/ng';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { IImgixParams } from './types';

const VERSION: string = '0.0.1';

@Injectable()
@Component({
  // the [src] means that src is required
  selector: 'ix-img[src]',
  template: `<img [attr.height]="height" [attr.width]="width" #v />`,
})
export class ImgixComponent implements AfterViewChecked {
  private readonly client: ImgixClient;

  @ViewChild('v')
  v?: ElementRef<HTMLImageElement>;

  @Input() src: string;
  @Input()
  get fixed(): boolean {
    return this._fixed;
  }
  set fixed(value: boolean) {
    this._fixed = coerceBooleanProperty(value as any);
  }
  private _fixed: boolean = false;

  @Input() imgixParams?: IImgixParams;

  @Input()
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

  @Input() htmlAttributes?: Object;

  constructor(@Inject(ImgixConfigService) private config: ImgixConfig) {
    this.client = this.createImgixClient(this.config);
  }

  private createImgixClient(config: ImgixConfig): ImgixClient {
    const client = new ImgixClient({
      domain: config.domain,
      includeLibraryParam: false,
    });

    if (!(config.includeLibraryParam === false)) {
      (client as any).settings.libraryParam = `ng-${VERSION}`;
    }

    return client;
  }

  ngAfterViewChecked() {
    this.setHTMLAttributes();
    this.setSrcAndSrcsetAttributes();
  }

  private setHTMLAttributes() {
    const el = this.v.nativeElement;
    Object.entries(this.htmlAttributes ?? {}).map(([key, value]) =>
      el.setAttribute(key, value),
    );
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
    const el = this.v.nativeElement;
    el.setAttribute(this.attributeConfig?.src ?? 'src', this.srcURL);
    el.setAttribute(this.attributeConfig?.srcset ?? 'srcset', this.srcsetURL);
  }

  get srcURL(): string {
    return this.client.buildURL(this.src, this.buildIxParams());
  }
  get srcsetURL(): string {
    return this.client.buildSrcSet(this.src, this.buildIxParams(), {
      disableVariableQuality: this.disableVariableQuality,
    });
  }
}
