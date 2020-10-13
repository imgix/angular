import { Component } from '@angular/core';
import {
  render,
  RenderComponentOptions,
  screen,
} from '@testing-library/angular';
import { ImgixConfig } from '../lib/imgix-config.service';
import { NgImgixModule } from '../lib/imgix-ng.module';
import { ImgixComponent } from '../lib/imgix.component';

let randCounter = 0;
export const genRandId = () => `test-${randCounter++}`;
export const createComponentWithTestWrapper = (template: string) => {
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

export const renderComponentWithImgixComponent = async (
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

const createComponent = (template: string) => {
  @Component({
    template: template,
  })
  class TestComponent {}

  return TestComponent;
};

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

export const renderTemplate = async (
  template: string,
  config?: ImgixConfig,
) => {
  const componentObj = createComponentWithTestWrapper(template);
  const renderResult = await renderComponentWithImgixComponent(
    componentObj.component,
    {
      declarations: [componentObj.component],
    },
    config,
  );

  return {
    renderResult,
    getWrapper: () => componentObj.getWrapper(),
    getComponent: <T extends keyof HTMLElementTagNameMap>(query: T) =>
      componentObj.getWrapper().querySelector(query),
  };
};
