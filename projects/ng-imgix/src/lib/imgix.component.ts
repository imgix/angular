import { Component, Inject, Injectable, Input } from '@angular/core';
import ImgixClient from 'imgix-core-js';
import { ImgixConfig, ImgixConfigService } from './imgix-config.service';

@Injectable()
@Component({
  selector: 'ix-img',
  template: `<img [src]="srcURL" />`, // TODO: add srcset
})
export class ImgixComponent {
  private readonly client;

  @Input() src: string;

  constructor(@Inject(ImgixConfigService) config: ImgixConfig) {
    this.client = new ImgixClient({
      domain: config.domain,
    });
  }

  get srcURL(): string {
    return this.client.buildURL(this.src);
  }
}
