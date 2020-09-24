import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { ImgixConfigService } from './imgix-config.service';
import { ImgixComponent } from './imgix.component';

describe('Imgix Component', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ImgixConfigService,
          useValue: { domain: 'assets.imgix.net' },
        },
      ],
    });
  });
  it('basic test', async () => {
    await render(ImgixComponent, {
      componentProperties: { src: 'amsterdam.jpg' },
    });

    expect(screen.getByRole('img').getAttribute('src')).toMatch(
      'https://assets.imgix.net/amsterdam.jpg',
    );
  });
});
