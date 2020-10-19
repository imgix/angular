import { Component } from '@angular/core';
import {
  render,
  RenderComponentOptions,
  screen,
} from '@testing-library/angular';
import { ImgixAngularModule } from '../lib/imgix-angular.module';
import { ImgixConfig } from '../lib/imgix-config.service';
import { IxImgComponent } from '../lib/ix-img.component';

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
  renderOptions?: RenderComponentOptions<IxImgComponent>,
  config?: ImgixConfig,
) =>
  await render(component, {
    imports: [
      ImgixAngularModule.forRoot(
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
