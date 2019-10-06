import {AppController} from './controllers/app';
import {GalleryEvent} from './types';

class StubCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    return Promise.resolve([]);
  }
}

const c = new AppController(new StubCollector());

addEventListener(
  'fetch',
  (
    /* tslint:disable */ e: any, /* tslint:enable */
  ) => e.respondWith(c.handle(e.request)),
);
