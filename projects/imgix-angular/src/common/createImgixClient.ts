import ImgixClient from 'imgix-core-js';
import { ImgixConfig } from '../lib/imgix-config.service';
import { IMGIX_NG_VERSION } from './constants';

export function createImgixClient(config: ImgixConfig): ImgixClient {
  const client = new ImgixClient({
    domain: config.domain,
    includeLibraryParam: false,
  });

  if (!(config.includeLibraryParam === false)) {
    (client as any).settings.libraryParam = `ng-${IMGIX_NG_VERSION}`;
  }

  return client;
}
