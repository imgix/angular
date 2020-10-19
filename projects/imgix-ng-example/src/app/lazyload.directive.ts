import { AfterViewChecked, Directive, ElementRef } from '@angular/core';
import lozad from 'lozad';

const isNativeLazyLoadingSupported = 'loading' in HTMLImageElement.prototype;

@Directive({
  selector: '[lazyImg]',
})
export class LazyloadDirective implements AfterViewChecked {
  private observer: lozad.Observer;
  constructor(private el: ElementRef) {}
  ngAfterViewChecked() {
    const nativeEl = this.el.nativeElement;
    if (
      isNativeLazyLoadingSupported ||
      nativeEl.getAttribute('data-loaded') === 'true'
    ) {
      // If native lazy loading is supported, we want to redirect the "lazyload"
      // data-attributes to the actual attributes, and let the browser do the work
      nativeEl.setAttribute('src', nativeEl.getAttribute('data-src'));
      nativeEl.setAttribute('srcset', nativeEl.getAttribute('data-srcset'));
      return;
    }
    // Otherwise, we tell lozad to listen for when this element scrolls into the viewport
    if (!this.observer) {
      this.observer = lozad(nativeEl);
      this.observer.observe();
    }
  }
}
