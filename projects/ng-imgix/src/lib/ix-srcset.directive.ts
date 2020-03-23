import { Directive, Input, ElementRef, OnInit } from '@angular/core';

import URI from 'urijs';
import ImgixClient from 'imgix-core-js';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ixSrcset]'
})
export class IxSrcsetDirective implements OnInit {
  settings: any = {};
  @Input('ixSrcset') srcsetOptions: any = {};
  VERSION = '0.0.1';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const {hostname, path, baseParameters} = this.extractURLComponents(this.el.nativeElement.src);
    this.settings = {
      domain: hostname
    };

    const imgix = new ImgixClient(this.settings);
    imgix['settings'].libraryParam = `ng-${this.VERSION}`;

    if (!this.el.nativeElement.sizes) {
      this.el.nativeElement.sizes = '100vw';
    }
    this.el.nativeElement.srcset = imgix.buildSrcSet(path, baseParameters, this.srcsetOptions);
  }

  private extractURLComponents = (url: string) => {
    const uri = URI(url);
    const baseParameters = {};
    const hostname = uri.hostname();
    const path = uri.path();
    const query = uri.query();

    if (query) {
      const splitParameters = query.split('&');
      let parameter;
      let value;

      // tslint:disable-next-line: forin
      for (const entry in Object.keys(splitParameters)) {
        [parameter, value] = splitParameters[entry].split('=');
        baseParameters[parameter] = value;
      }
    }

    return {hostname, path, baseParameters};
  }
}
