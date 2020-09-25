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
  template: `<img [src]="srcURL" #v />`, // TODO: add srcset
})
export class ImgixComponent {
  private readonly client: ImgixClient;

  @ViewChild('v', { static: false })
  v?: ElementRef<HTMLImageElement>;

  @Input() src: string;
  @Input() fixed?: boolean;
  @Input() imgixParams?: Object;
  @Input() width?: string | number;
  @Input() height?: string | number;
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

  get srcURL(): string {
    return this.client.buildURL(this.src, this.imgixParams);
  }
}
