import {
  Component,
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ImgixConfigService } from './imgix-config.service';

@Injectable()
@Component({
  selector: 'ix-img',
  template: `<img [src]="src" />`, // TODO: add srcset
})
export class ImgixComponent implements OnInit, OnDestroy {
  constructor(@Inject(ImgixConfigService) private config) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
