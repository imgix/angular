import {
  expectElementToHaveFixedSrcAndSrcSet,
  expectElementToHaveFluidSrcAndSrcSet,
  expectEverySrcsetToMatch,
  expectURLToHaveIxlibParam,
} from '../test/url-assert';
import { renderTemplate } from '../test/util';

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
    expectEverySrcsetToMatch('txt=Hello')(
      (
        await renderImgTemplate(
          `<ix-img src='amsterdam.jpg' [imgixParams]="{txt: 'Hello'}"></ix-img>`,
        )
      )
        .getComponent()
        .getAttribute('srcset'),
    );
  });

  it('should pass through html attributes', async () => {
    const test = await renderImgTemplate(
      `<ix-img src="amsterdam.jpg" [htmlAttributes]="{'class': 'img-class'}" ></ix-img>`,
    );

    expect(test.getComponent().getAttribute('class')).toBe('img-class');
  });

  describe('type guards', () => {
    const TEST_CASES: [
      /* html:  */ string,
      /* attribute:  */ string,
      /* expectedValue:  */ string,
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

  describe('ixlib param', () => {
    it(`should be present by default and equal to "ng"`, async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" ></ix-img>`,
      );

      const expectIxlibParam = expectURLToHaveIxlibParam('ng');

      const component = test.getComponent();
      expectIxlibParam(component.getAttribute('src'));
      expectIxlibParam(component.getAttribute('srcset'));
    });

    it(`should contain the correct package version`, async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" ></ix-img>`,
      );

      const packageVersion = require('../../package.json').version;
      const expectIxlibParam = expectURLToHaveIxlibParam(
        `ng-${packageVersion}`,
      );

      const component = test.getComponent();
      expectIxlibParam(component.getAttribute('src'));
      expectIxlibParam(component.getAttribute('srcset'));
    });

    it(`should not be included in src/srcset when includeLibraryParam is false`, async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" ></ix-img>`,
        { domain: 'assets.imgix.net', includeLibraryParam: false },
      );

      const component = test.getComponent();
      expect(component.getAttribute('src')).not.toMatch(/ixlib/);
      expect(component.getAttribute('srcset')).not.toMatch(/ixlib/);
    });
  });

  describe('default parameters', () => {
    it('should be applied to src', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg"></ix-img>`,
        {
          domain: 'assets.imgix.net',
          defaultImgixParams: {
            txt: 'Hello',
          },
        },
      );

      const expectedAttribute = jasmine.stringMatching(/txt=Hello/);
      expect(test.getComponent().getAttribute('src')).toEqual(
        expectedAttribute,
      );
    });
    it('should be applied to srcset', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg"></ix-img>`,
        {
          domain: 'assets.imgix.net',
          defaultImgixParams: {
            txt: 'Hello',
          },
        },
      );

      const expectedAttribute = jasmine.stringMatching(/txt=Hello/);
      expect(test.getComponent().getAttribute('srcset')).toEqual(
        expectedAttribute,
      );
    });
    it('should be overridden by locally set parameters', async () => {
      const test = await renderImgTemplate(
        `<ix-img src="amsterdam.jpg" [imgixParams]="{txt: 'Overridden'}"></ix-img>`,
        {
          domain: 'assets.imgix.net',
          defaultImgixParams: {
            txt: 'Hello',
          },
        },
      );

      const expectedAttribute = jasmine.stringMatching(/txt=Overridden/);
      expect(test.getComponent().getAttribute('src')).toEqual(
        expectedAttribute,
      );
    });
  });
});

const renderImgTemplate = async (
  ...args: Parameters<typeof renderTemplate>
) => {
  const result = await renderTemplate(...args);
  return { ...result, getComponent: () => result.getComponent('img') };
};
