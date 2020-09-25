import { Component } from '@angular/core';
import {
  render,
  RenderComponentOptions,
  screen,
} from '@testing-library/angular';
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

  it('should pass through html attributes', async () => {
    const test = await renderImgTemplate(
      `<ix-img src="amsterdam.jpg" [htmlAttributes]="{'class': 'img-class'}" ></ix-img>`,
    );

    expect(test.getComponent().getAttribute('class')).toBe('img-class');
  });
});
