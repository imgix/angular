import {
  expectSrcSetToBeFixed,
  expectSrcSetToBeFluid,
  expectURLToHaveIxlibParam,
  stringMatchingFixedSrcSetHeight,
} from '../test/url-assert';
import { renderTemplate } from '../test/util';

describe('Picture mode', () => {
  describe('ixSource', () => {
    it('should set a srcset with the correct url', async () => {
      expect(
        (await renderSourceTemplate(`<source ixSource path='amsterdam.jpg' />`))
          .getComponent()
          .getAttribute('srcset'),
      ).toMatch('https://assets.imgix.net/amsterdam.jpg');
    });
    it('should set a fluid srcset', async () => {
      expectSrcSetToBeFluid(
        (await renderSourceTemplate(`<source ixSource path='amsterdam.jpg' />`))
          .getComponent()
          .getAttribute('srcset'),
      );
    });
    it('should set a fixed srcset when width set in imgixParams', async () => {
      expectSrcSetToBeFixed(
        (
          await renderSourceTemplate(
            `<source ixSource path='amsterdam.jpg' [imgixParams]="{w: 100}" />`,
          )
        )
          .getComponent()
          .getAttribute('srcset'),
        100,
      );
    });
    // Skipping this test for now due to bug in imgix-core-js: https://github.com/imgix/imgix-core-js/issues/177
    xit('should set a fixed srcset when height set in imgixParams', async () => {
      expect(
        (
          await renderSourceTemplate(
            `<source ixSource path='amsterdam.jpg' [imgixParams]="{h: 200}" />`,
          )
        )
          .getComponent()
          .getAttribute('srcset'),
      ).toEqual(stringMatchingFixedSrcSetHeight(200));
    });

    it('should pass through html attributes', async () => {
      const test = await renderSourceTemplate(
        `<source ixSource path="amsterdam.jpg" class="img-class"  />`,
      );

      expect(test.getComponent().getAttribute('class')).toBe('img-class');
    });

    describe('attributeConfig', () => {
      const ATTRIBUTES = ['srcset'];
      ATTRIBUTES.forEach((attribute) => {
        it(`${attribute} can be configured to use data-${attribute}`, async () => {
          const test = await renderSourceTemplate(
            `<source ixSource path="amsterdam.jpg" [attributeConfig]="{'${attribute}': 'data-${attribute}'}"  />`,
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
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg" [imgixParams]="{w: 100}" />`,
        );

        const srcset = test.getComponent().getAttribute('srcset');

        const srcsets = srcset.split(',');
        const getQuality = (srcset) => srcset.match(/q=\d*/)[0].slice(2);

        const firstQuality = getQuality(srcsets[0]);
        const lastQuality = getQuality(srcsets[srcsets.length - 1]);

        expect(firstQuality).not.toBe(lastQuality);
      });
      it('the srcset should not have a variable quality when disableVariableQuality attribute set', async () => {
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg" [imgixParams]="{w: 100}" disableVariableQuality />`,
        );

        const srcset = test.getComponent().getAttribute('srcset');

        expect(srcset).not.toMatch(/q=/);
      });
    });
    describe('ixlib param', () => {
      it(`should be present by default and equal to "ng"`, async () => {
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg"  />`,
        );

        const expectIxlibParam = expectURLToHaveIxlibParam('ng');

        const component = test.getComponent();
        expectIxlibParam(component.getAttribute('srcset'));
      });

      it(`should contain the correct package version`, async () => {
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg"  />`,
        );

        const packageVersion = require('../../package.json').version;
        const expectIxlibParam = expectURLToHaveIxlibParam(
          `ng-${packageVersion}`,
        );

        const component = test.getComponent();
        expectIxlibParam(component.getAttribute('srcset'));
      });

      it(`should not be included in src/srcset when includeLibraryParam is false`, async () => {
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg"  />`,
          { domain: 'assets.imgix.net', includeLibraryParam: false },
        );

        const component = test.getComponent();
        expect(component.getAttribute('srcset')).not.toMatch(/ixlib/);
      });
    });

    describe('default parameters', () => {
      it('should be applied to srcset', async () => {
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg" />`,
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
        const test = await renderSourceTemplate(
          `<source ixSource path="amsterdam.jpg" [imgixParams]="{txt: 'Overridden'}" />`,
          {
            domain: 'assets.imgix.net',
            defaultImgixParams: {
              txt: 'Hello',
            },
          },
        );

        const expectedAttribute = jasmine.stringMatching(/txt=Overridden/);
        expect(test.getComponent().getAttribute('srcset')).toEqual(
          expectedAttribute,
        );
      });
    });
  });

  describe('ixPicture', () => {
    it('renders a picture', async () => {
      expect(
        (
          await renderPictureTemplate(`<picture ixPicture></picture>`)
        ).getComponent().tagName,
      ).toBe('PICTURE');
    });
    it('renders children', async () => {
      expect(
        (
          await renderPictureTemplate(
            `<picture ixPicture><source ixSource path="amsterdam.jpg" /></picture>`,
          )
        )
          .getComponent()
          .querySelector('source'),
      ).toBeTruthy();
    });
  });
});

const renderSourceTemplate = async (
  ...args: Parameters<typeof renderTemplate>
) => {
  const result = await renderTemplate(...args);
  return { ...result, getComponent: () => result.getComponent('source') };
};

const renderPictureTemplate = async (
  ...args: Parameters<typeof renderTemplate>
) => {
  const result = await renderTemplate(...args);
  return { ...result, getComponent: () => result.getComponent('picture') };
};
