import {
  expectSrcSetToBeFixed,
  expectSrcSetToBeFluid,
  expectURLToHaveIxlibParam,
  stringMatchingFixedSrcSetHeight,
} from '../test/url-assert';
import { renderTemplate } from '../test/util';

describe('Picture mode', () => {
  describe('ix-source', () => {
    it('should set a srcset with the correct url', async () => {
      expect(
        (
          await renderSourceTemplate(
            `<ix-source src='amsterdam.jpg'></ix-source>`,
          )
        )
          .getComponent()
          .getAttribute('srcset'),
      ).toMatch('https://assets.imgix.net/amsterdam.jpg');
    });
    it('should set a fluid srcset', async () => {
      expectSrcSetToBeFluid(
        (
          await renderSourceTemplate(
            `<ix-source src='amsterdam.jpg'></ix-source>`,
          )
        )
          .getComponent()
          .getAttribute('srcset'),
      );
    });
    it('should set a fixed srcset when width set in imgixParams', async () => {
      expectSrcSetToBeFixed(
        (
          await renderSourceTemplate(
            `<ix-source src='amsterdam.jpg' [imgixParams]="{w: 100}"></ix-source>`,
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
            `<ix-source src='amsterdam.jpg' [imgixParams]="{h: 200}"></ix-source>`,
          )
        )
          .getComponent()
          .getAttribute('srcset'),
      ).toEqual(stringMatchingFixedSrcSetHeight(200));
    });

    it('should pass through html attributes', async () => {
      const test = await renderSourceTemplate(
        `<ix-source src="amsterdam.jpg" [htmlAttributes]="{'class': 'img-class'}" ></ix-source>`,
      );

      expect(test.getComponent().getAttribute('class')).toBe('img-class');
    });

    describe('attributeConfig', () => {
      const ATTRIBUTES = ['srcset'];
      ATTRIBUTES.forEach((attribute) => {
        it(`${attribute} can be configured to use data-${attribute}`, async () => {
          const test = await renderSourceTemplate(
            `<ix-source src="amsterdam.jpg" [attributeConfig]="{'${attribute}': 'data-${attribute}'}" ></ix-source>`,
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
          `<ix-source src="amsterdam.jpg" [imgixParams]="{w: 100}"></ix-source>`,
        );

        const srcset = test.getComponent().getAttribute('srcset');

        const srcsets = srcset.split(',');
        const getQuality = (srcset) => srcset.match(/q=\d*/)[0].slice(2);

        const firstQuality = getQuality(srcsets[0]);
        const lastQuality = getQuality(srcsets[srcsets.length - 1]);

        expect(firstQuality).not.toBe(lastQuality);
      });
      it('the srcset should have a variable quality when disableVariableQuality attribute set', async () => {
        const test = await renderSourceTemplate(
          `<ix-source src="amsterdam.jpg" [imgixParams]="{w: 100}" disableVariableQuality></ix-source>`,
        );

        const srcset = test.getComponent().getAttribute('srcset');

        expect(srcset).not.toMatch(/q=/);
      });
    });
    describe('ixlib param', () => {
      it(`should be present by default and equal to "ng"`, async () => {
        const test = await renderSourceTemplate(
          `<ix-source src="amsterdam.jpg" ></ix-source>`,
        );

        const expectIxlibParam = expectURLToHaveIxlibParam('ng');

        const component = test.getComponent();
        expectIxlibParam(component.getAttribute('srcset'));
      });

      it(`should contain the correct package version`, async () => {
        const test = await renderSourceTemplate(
          `<ix-source src="amsterdam.jpg" ></ix-source>`,
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
          `<ix-source src="amsterdam.jpg" ></ix-source>`,
          { domain: 'assets.imgix.net', includeLibraryParam: false },
        );

        const component = test.getComponent();
        expect(component.getAttribute('srcset')).not.toMatch(/ixlib/);
      });
    });

    describe('default parameters', () => {
      it('should be applied to srcset', async () => {
        const test = await renderSourceTemplate(
          `<ix-source src="amsterdam.jpg"></ix-source>`,
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
          `<ix-source src="amsterdam.jpg" [imgixParams]="{txt: 'Overridden'}"></ix-source>`,
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

  describe('ix-picture', () => {
    it('renders a picture', async () => {
      expect(
        (
          await renderPictureTemplate(`<ix-picture></ix-picture>`)
        ).getComponent(),
      );
    });
    it('renders children', async () => {
      expect(
        (
          await renderPictureTemplate(
            `<ix-picture><ix-source src="amsterdam.jpg"></ix-source></ix-picture>`,
          )
        )
          .getComponent()
          .querySelector('source'),
      );
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
