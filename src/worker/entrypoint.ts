import {AppController} from '../controllers/app';
import {GalleryEvent} from '../types';
import allEvents from '../../dist/events.json';

const d = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

function ds(k: string, v: string): any {
  if (typeof v === 'string' && d.test(v)) {
    return new Date(v);
  }

  return v;
}

class StaticAllEventsCollector {
  collect(): Promise<ReadonlyArray<GalleryEvent>> {
    // Stringify then parse whilst deserialising dates into dates
    return Promise.resolve(JSON.parse(
      JSON.stringify(allEvents.events),
      ds,
    ));
  }
}

const c = new AppController(new StaticAllEventsCollector());

addEventListener(
  'fetch', (e: any): void => e.respondWith(c.handle(e.request)),
);
