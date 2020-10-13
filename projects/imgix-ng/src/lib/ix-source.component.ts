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
import { createImgixClient } from '../common/createImgixClient';
import { coerceBooleanProperty } from '../common/ng';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { IImgixParams } from './types';

@Injectable()
@Component({
  selector: 'ix-source[src]',
  template: `<source #v />`,
})
export class IxSourceComponent implements AfterViewChecked {
  private readonly client: ImgixClient;

  @ViewChild('v')
  v?: ElementRef<HTMLImageElement>;

  @Input() src: string;
  @Input() imgixParams?: IImgixParams;
  @Input() attributeConfig?: { srcset?: string };
  @Input() htmlAttributes?: Record<string, string>;
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

  constructor(@Inject(ImgixConfigService) private config: ImgixConfig) {
    this.client = createImgixClient(config);
  }

  ngAfterViewChecked() {
    this.setHTMLAttributes();
    this.setSrcsetAttribute();
  }
  private setHTMLAttributes() {
    const el = this.v.nativeElement;
    Object.entries(this.htmlAttributes ?? {}).map(([key, value]) =>
      el.setAttribute(key, value),
    );
  }
  private buildIxParams() {
    const imgixParamsFromImgAttributes = {};
    return {
      ...this.config.defaultImgixParams,
      ...imgixParamsFromImgAttributes,
      ...this.imgixParams,
    };
  }
  private setSrcsetAttribute() {
    const el = this.v.nativeElement;
    el.setAttribute(this.attributeConfig?.srcset ?? 'srcset', this.srcsetURL);
  }
  get srcsetURL(): string {
    return this.client.buildSrcSet(this.src, this.buildIxParams(), {
      disableVariableQuality: this.disableVariableQuality,
    });
  }
}
