// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const ASSETS: any; // cloudflare KV namespace

import {AppController} from '../controllers/app';
import {GalleryEvent} from '../types';

const d = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

function ds(k: string, v: string): unknown {
  if (typeof v === 'string' && d.test(v)) {
    return new Date(v);
  }

  return v;
}

class CFKVEventsCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    const rawEventsJSON = await ASSETS.get('latest-events');
    const events = JSON.parse(rawEventsJSON, ds); // Parse whilst deserialising dates into dates
    return events;
  }
}

const c = new AppController(new CFKVEventsCollector());

addEventListener(
  'fetch', (e: any): void => e.respondWith(c.handle(e.request)), // eslint-disable-line @typescript-eslint/no-explicit-any
);
