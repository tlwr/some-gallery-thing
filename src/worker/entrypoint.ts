/* eslint-disable @typescript-eslint/no-explicit-any */
declare const ASSETS: any; // cloudflare KV namespace

import URI from 'urijs';

import {EventsController} from '../controllers/events';
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

const c = new EventsController(new CFKVEventsCollector());

const handle = async (request: any) : Promise<any> => {
  const path = new URI(request.url).pathname();

  if (path === '/assets/main.css') {
    const styles = await ASSETS.get('styles');

    const response = new Response(
      styles,
      {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'max-age=86400, public',
        },
      }
    );

    return response
  }

  if (path === '/events') {
      return await c.handleListEvents(request);
  }

  return new Response('', {status: 302, headers: {'Location': '/events'}})
};

addEventListener('fetch', (e : any) : void => e.respondWith(handle(e.request)));
