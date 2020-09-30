import { Component } from '@angular/core';
import {
  render,
  RenderComponentOptions,
  screen,
} from '@testing-library/angular';
import {
  expectElementToHaveFixedSrcAndSrcSet,
  expectElementToHaveFluidSrcAndSrcSet,
} from '../test/url-assert';
import { ImgixConfig } from './imgix-config.service';
import { ImgixComponent } from './imgix.component';
import { NgImgixModule } from './ng-imgix.module';

const createComponent = (template: string) => {
  @Component({
    template: template,
  })
  class TestComponent {}

  return TestComponent;
};

const createComponentWithTestWrapper = (template: string) => {
  const testid = genRandId();
  @Component({
    template: `<div [attr.data-testid]="testid">${template}</div>`,
  })
  class TestComponent {
    testid: string = testid;
  }

  return {
    component: TestComponent,
    testid,
    getWrapper: () => screen.getByTestId(testid),
  };
};

const renderComponentWithImgixComponent = async (
  component: Parameters<typeof render>[0],
  renderOptions?: RenderComponentOptions<ImgixComponent>,
  config?: ImgixConfig,
) =>
  await render(component, {
    imports: [
      NgImgixModule.forRoot(
        config ?? {
          domain: 'assets.imgix.net',
        },
      ),
    ],
    excludeComponentDeclaration: true,
    ...renderOptions,
  });

let randCounter = 0;
const genRandId = () => `test-${randCounter++}`;

const renderWithProps = async ({
  props,
  config,
}: {
  props: Partial<ImgixComponent>;
  config?: ImgixConfig;
}) => {
  const testid = genRandId();
  const fixture = await render(ImgixComponent, {
    imports: [
      NgImgixModule.forRoot(
        config ?? {
          domain: 'assets.imgix.net',
        },
      ),
    ],
    componentProperties: {
      ...props,
      htmlAttributes: {
        'data-testid': testid,
      },
    },
    excludeComponentDeclaration: true,
  });

  return {
    fixture,
    el: screen.getByTestId(testid),
  };
};

const renderImgTemplate = async (template: string, config?: ImgixConfig) => {
  const componentObj = createComponentWithTestWrapper(template);
  const renderResult = await renderComponentWithImgixComponent(
    componentObj.component,
    {
      declarations: [componentObj.component],
    },
    config,
  );

  return {
    getComponent: () => componentObj.getWrapper().querySelector('img'),
  };
};

describe('Imgix Component', () => {
  it('should combine the domain and path into the src', async () => {
    expect(
      (await renderImgTemplate(`<ix-img src='amsterdam.jpg'></ix-img>`))
        .getComponent()
        .getAttribute('src'),
    ).toMatch('https://assets.imgix.net/amsterdam.jpg');
  });

  it('should set srcset correctly', async () => {
    const srcset = (
      await renderImgTemplate(`<ix-img src='amsterdam.jpg'></ix-img>`)
    )
      .getComponent()
      .getAttribute('srcset');

    expect(srcset).not.toBeFalsy();
    if (!srcset) {
      fail('srcset is null');
    }

    const firstSrcSet = srcset.split(',').map((v) => v.trim())[0];
    expect(firstSrcSet.split(' ').length).toBe(2);
    const [aSrcFromSrcSet, aWidthFromSrcSet] = firstSrcSet.split(' ');
    expect(aSrcFromSrcSet).toContain('amsterdam.jpg');
    expect(aWidthFromSrcSet).toMatch(/^\d+w$/);
  });

  it('should set imgix params on the src', async () => {
    expect(
      (
        await renderImgTemplate(
          `<ix-img src='amsterdam.jpg' [imgixParams]="{txt: 'Hello'}"></ix-img>`,
        )
      )
        .getComponent()
        .getAttribute('src'),
    ).toMatch('txt=Hello');
  });

  it('should set imgix params on the srcset', async () => {
    expect(
      (
        await renderImgTemplate(
          `<ix-img src='amsterdam.jpg' [imgixParams]="{txt: 'Hello'}"></ix-img>`,
        )
      )
        .getComponent()
        .getAttribute('srcset'),
    ).toMatch('txt=Hello');
  });

  it('should pass through html attributes', async () => {
    const test = await renderImgTemplate(
      `<ix-img src="amsterdam.jpg" [htmlAttributes]="{'class': 'img-class'}" ></ix-img>`,
    );

    expect(test.getComponent().getAttribute('class')).toBe('img-class');
  });

  describe('type guards', () => {
    const TEST_CASES: [
      html: string,
      attribute: string,
      expectedValue: string,
    ][] = [
      [`width="100"`, 'width', '100'],
      [`width=100`, 'width', '100'],
      [`[width]="100"`, 'width', '100'],
      [`height="100"`, 'height', '100'],
      [`height=100`, 'height', '100'],
      [`[height]="100"`, 'height', '100'],
    ];

    TEST_CASES.map(([html, attribute, expectedValue]) => {
      it(`${attribute} should be ${expectedValue} when the html attribute is ${html}`, async () => {
        const test = await renderImgTemplate(
          `<ix-img src="amsterdam.jpg" ${html}></ix-img>`,
        );

        expect(test.getComponent().getAttribute(attribute)).toBe(expectedValue);
      });
    });
  });

  describe('in fluid mode (no fixed props set)', () => {
    it('ix-img should render a fluid image if width is passed as attribute with no fixed attribute', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" ></ix-img>`,
      );

      expectElementToHaveFluidSrcAndSrcSet(test.getComponent());
      expect(test.getComponent().getAttribute('width')).toBe('100');
    });
    it('ix-img should render a fluid image if width is passed as attribute with fixed="false" attribute', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" fixed="false"></ix-img>`,
      );

      expectElementToHaveFluidSrcAndSrcSet(test.getComponent());
      expect(test.getComponent().getAttribute('width')).toBe('100');
    });
    it('ix-img should render a fluid image if width is passed as attribute with [fixed]="false" attribute', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" [fixed]="false"></ix-img>`,
      );

      expectElementToHaveFluidSrcAndSrcSet(test.getComponent());
      expect(test.getComponent().getAttribute('width')).toBe('100');
    });
    it('a width attribute should be passed through to the underlying component', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100"></ix-img>`,
      );
      expect(test.getComponent().getAttribute('width')).toBe('100');
    });
    it('a width attribute should not be set on the underlying component if width is not passed', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg"></ix-img>`,
      );
      expect(test.getComponent().hasAttribute('width')).toBe(false);
    });
    it('a height attribute should be passed through to the underlying component', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" height="100"></ix-img>`,
      );
      expect(test.getComponent().getAttribute('height')).toBe('100');
    });
    it('a height attribute should not be set on the underlying component if height is not passed', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg"></ix-img>`,
      );
      expect(test.getComponent().hasAttribute('height')).toBe(false);
    });
  });

  describe('in fixed mode (fixed prop set, or width/height passed to imgixParams)', () => {
    it('the src and srcset should be in fixed size mode when a width is passed to imgixParams', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" [imgixParams]="{w: 100}" ></ix-img>`,
      );

      expectElementToHaveFixedSrcAndSrcSet(test.getComponent(), 100);
    });
    it('the src and srcset should be in fixed size mode when a fixed prop is passed to the element', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" height="150" fixed></ix-img>`,
      );

      const el = test.getComponent();
      expectElementToHaveFixedSrcAndSrcSet(el, 100);

      expect(el.getAttribute('src')).toEqual(jasmine.stringMatching('w=100'));
      expect(el.getAttribute('srcset')).toEqual(
        jasmine.stringMatching('w=100'),
      );
      expect(el.getAttribute('src')).toEqual(jasmine.stringMatching('h=150'));
      expect(el.getAttribute('srcset')).toEqual(
        jasmine.stringMatching('h=150'),
      );
    });
    it('the src and srcset should be in fixed size mode when a fixed="true" prop is passed to the element', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" height="150" fixed="true"></ix-img>`,
      );

      const el = test.getComponent();
      expectElementToHaveFixedSrcAndSrcSet(el, 100);

      expect(el.getAttribute('src')).toEqual(jasmine.stringMatching('h=150'));
      expect(el.getAttribute('srcset')).toEqual(
        jasmine.stringMatching('h=150'),
      );
    });
    it('the src and srcset should be in fixed size mode when a [fixed]="true" prop is passed to the element', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" height="150" [fixed]="true"></ix-img>`,
      );

      const el = test.getComponent();
      expectElementToHaveFixedSrcAndSrcSet(el, 100);

      expect(el.getAttribute('src')).toEqual(jasmine.stringMatching('h=150'));
      expect(el.getAttribute('srcset')).toEqual(
        jasmine.stringMatching('h=150'),
      );
    });

    it('a width attribute should be passed through to the underlying component', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" width="100" fixed></ix-img>`,
      );
      expect(test.getComponent().getAttribute('width')).toBe('100');
    });
    it('a height attribute should be passed through to the underlying component', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" height="100" fixed></ix-img>`,
      );
      expect(test.getComponent().getAttribute('height')).toBe('100');
    });
  });

  describe('attributeConfig', () => {
    const ATTRIBUTES = ['src', 'srcset'];
    ATTRIBUTES.forEach((attribute) => {
      it(`${attribute} can be configured to use data-${attribute}`, async () => {
        const test = await renderImgTemplate(
          `<ix-img src="amsterdam.jpg" [attributeConfig]="{'${attribute}': 'data-${attribute}'}" ></ix-img>`,
        );

        expect(test.getComponent().getAttribute(`data-${attribute}`)).toMatch(
          /ixlib/,
        );
        expect(test.getComponent().hasAttribute(attribute)).toBe(false);
      });
    });
  });

  describe('disableVariableQuality', () => {
    it('should not disable variable quality by default', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" fixed width="100" height="100"></ix-img>`,
      );

      const srcset = test.getComponent().getAttribute('srcset');

      const srcsets = srcset.split(',');
      const getQuality = (srcset) => srcset.match(/q=\d*/)[0].slice(2);

      const firstQuality = getQuality(srcsets[0]);
      const lastQuality = getQuality(srcsets[srcsets.length - 1]);

      expect(firstQuality).not.toBe(lastQuality);
    });
    it('the srcset should have a variable quality when disableVariableQuality attribute set', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" fixed width="100" height="100" disableVariableQuality></ix-img>`,
      );

      const srcset = test.getComponent().getAttribute('srcset');

      expect(srcset).not.toMatch(/q=/);
    });
  });
});
