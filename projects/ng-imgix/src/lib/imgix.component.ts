import {
  Component,
  ElementRef,
  Inject,
  Injectable,
  Input,
  ViewChild,
} from '@angular/core';
import ImgixClient from 'imgix-core-js';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';

@Injectable()
@Component({
  // the [src] means that src is required
  selector: 'ix-img[src]',
  template: `<img
    [attr.src]="srcURL"
    [attr.srcset]="srcsetURL"
    [attr.height]="height"
    [attr.width]="width"
    #v
  />`,
})
export class ImgixComponent {
  private readonly client: ImgixClient;

  @ViewChild('v', { static: false })
  v?: ElementRef<HTMLImageElement>;

  @Input() src: string;
  @Input()
  get fixed(): boolean {
    return this._fixed;
  }
  set fixed(_fixed: boolean) {
    this._fixed = false;
    const fixed = _fixed as unknown;
    if (
      (typeof fixed === 'string' &&
        (fixed.trim() === '' || fixed.trim() === 'true')) ||
      (typeof fixed === 'boolean' && fixed === true)
    ) {
      this._fixed = true;
    }
  }
  private _fixed: boolean = false;

  @Input() imgixParams?: Object;

  @Input()
  get width(): number | undefined {
    return this._width;
  }
  set width(_width: number | undefined) {
    this._width = undefined;

    const width = _width as unknown; // Using any for type safety

    if (typeof width === 'string') {
      const widthParsed = Number.parseFloat(width);
      if (!Number.isNaN(widthParsed)) {
        this._width = widthParsed;
      }
    }
    if (typeof width === 'number' && !Number.isNaN(width)) {
      this._width = width;
    }
  }
  private _width: number | undefined;

  @Input()
  get height(): number | undefined {
    return this._height;
  }
  set height(_height: number | undefined) {
    this._height = undefined;

    const height = _height as unknown; // Using any for type safety

    if (typeof height === 'string') {
      const heightParsed = Number.parseFloat(height);
      if (!Number.isNaN(heightParsed)) {
        this._height = heightParsed;
      }
    }
    if (typeof height === 'number' && !Number.isNaN(height)) {
      this._height = height;
    }
  }
  private _height: number | undefined;

  @Input() attributeConfig?: Object;
  @Input() disableVariableQuality?: boolean;

  @Input() htmlAttributes?: Object;

  constructor(@Inject(ImgixConfigService) config: ImgixConfig) {
    this.client = new ImgixClient({
      domain: config.domain,
    });
  }

  ngAfterViewInit() {
    this.setHTMLAttributes();
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
      ...imgixParamsFromImgAttributes,
      ...this.imgixParams,
    };
  }

  get srcURL(): string {
    return this.client.buildURL(this.src, this.buildIxParams());
  }
  get srcsetURL(): string {
    return this.client.buildSrcSet(this.src, this.buildIxParams());
  }
}
