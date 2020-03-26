import { IxSrcsetDirective } from './ix-srcset.directive';
import { ElementRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const VERSION = require('../../package.json').version;

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

@Component({
  template: `
  <img src="https://assets.imgix.net/examples/bluehat.jpg" />
  <img src="https://assets.imgix.net/unsplash/motorbike.jpg" [ixSrcset]="{ minWidth: 800, maxWidth: 1200 }" />
  <img src="https://assets.imgix.net/unsplash/bridge.jpg?w=500" ixSrcset />
  <img src="https://assets.imgix.net/unsplash/raspberries.jpg?w=1000" [ixSrcset]="{ disableVariableQuality: true }" />
  `
})
class TestComponent { }

describe('The IxSrcsetDirective class', () => {
  const directive = new IxSrcsetDirective(new MockElementRef());

  it('should create an instance of the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should reflect the correct package version', () => {
    expect(directive.VERSION).toBe(VERSION);
  });
});

describe('The ixSrcset attribute directive', () => {
  let fixture;
  let des;
  let bareImg;
  let FLUID_IMG_PATTERN;
  let FLUID_SRCSET_PATTERN;
  let FIXED_IMG_PATTERN;
  let FIXED_SRCSET_PATTERN;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ IxSrcsetDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached IxSrcsetDirective
    des = fixture.debugElement.queryAll(By.directive(IxSrcsetDirective));

    // all elements without an IxSrcsetDirective
    bareImg = fixture.debugElement.query(By.css('img:not([ixSrcset])'));

    // the expected pattern of an img src that would produce a fluid srcset
    // for the sake of simplicity, we only test for a parameterless URL
    FLUID_IMG_PATTERN = /^[^?]+$/gm;

    // the expected pattern for fluid srcset; e.g. '...?w=100 w,'
    FLUID_SRCSET_PATTERN = /(?:[\w:\/\-.&=?])+ \d+w/;

    // the expected pattern for an img src that would produce a fixed src; e.g. '?w=100'
    // for the sake of simplicity, we only test for the existance of a 'w=' parameter
    FIXED_IMG_PATTERN = /(?:[\w:\/\-.&=?])+(w=\d+)/;

    // the expected patten for fixed srcset, e.g. '...?dpr=2 2x,'
    FIXED_SRCSET_PATTERN = /(?:[\w:\/\-.&=?])+ \dx/;
  });

  it('should be reflected on any elements it is attached to', () => {
    expect(des.length).toBe(3);
  });

  it('should create a srcset attribute when used', () => {
    des.map(el => {
      expect(el.nativeElement.srcset).toBeTruthy();
    });
  });

  it('should create a fluid srcset if no width is provided', () => {
    des.map(el => {
      if (FLUID_IMG_PATTERN.exec(el.nativeElement.src)) {
        const srcset = el.nativeElement.srcset;
        expect(FLUID_SRCSET_PATTERN.exec(srcset)).toBeTruthy();
      }
    });
  });

  it('should create a fixed srcset if a width is provided', () => {
    des.map(el => {
      if (FIXED_IMG_PATTERN.exec(el.nativeElement.src)) {
        const srcset = el.nativeElement.srcset;
        expect(FIXED_SRCSET_PATTERN.exec(srcset)).toBeTruthy();
      }
    });
  });

  it('should not create a srcset on any untagged <img> elements', () => {
    expect(bareImg.attributes.srcset).toBeUndefined();
  });
});
