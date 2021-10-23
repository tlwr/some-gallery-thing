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

class LondonCFKVEventsCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    const rawEventsJSON = await ASSETS.get('latest-events');
    const events = JSON.parse(rawEventsJSON, ds).london; // Parse whilst deserialising dates into dates
    return events;
  }
}

class AmsterdamCFKVEventsCollector {
  async collect(): Promise<ReadonlyArray<GalleryEvent>> {
    const rawEventsJSON = await ASSETS.get('latest-events');
    const events = JSON.parse(rawEventsJSON, ds).amsterdam; // Parse whilst deserialising dates into dates
    return events;
  }
}

const londonEventsController = new EventsController('london', new LondonCFKVEventsCollector());
const amsterdamEventsController = new EventsController('amsterdam', new AmsterdamCFKVEventsCollector());

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
    return new Response('', {status: 302, headers: {'Location': '/london'}})
  }

  if (path === '/london') {
    return await londonEventsController.handleListEvents(request);
  }

  if (path === '/amsterdam') {
    return await amsterdamEventsController.handleListEvents(request);
  }

  return new Response('', {status: 302, headers: {'Location': '/london'}})
};

addEventListener('fetch', (e : any) : void => e.respondWith(handle(e.request)));
