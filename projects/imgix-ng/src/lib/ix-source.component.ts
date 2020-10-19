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
import { coerceBooleanProperty } from '../common/ng';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';
import { IImgixParams } from './types';

@Injectable()
@Component({
  // the [path] means that path is required
  selector: '[ixSource][path]',
  template: ``,
})
export class IxSourceComponent implements AfterViewChecked {
  private readonly client: ImgixClient;

  @Input('path') path: string;
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

  constructor(
    @Inject(ImgixConfigService) private config: ImgixConfig,
    private elementRef: ElementRef,
  ) {
    this.client = createImgixClient(config);
  }

  ngAfterViewChecked() {
    this.setSrcsetAttribute();
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
    const el = this.elementRef.nativeElement;
    el.setAttribute(this.attributeConfig?.srcset ?? 'srcset', this.srcsetURL);
  }
  get srcsetURL(): string {
    return this.client.buildSrcSet(this.path, this.buildIxParams(), {
      disableVariableQuality: this.disableVariableQuality,
    });
  }
}
