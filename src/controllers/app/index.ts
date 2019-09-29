import { Request, Response } from "node-fetch";

import {healthcheck} from '../healthcheck';
import {listEvents} from '../events';
import {css} from '../assets';

import {GalleryCollector} from '../../types';

export class AppController {
  private collector: GalleryCollector;

  public constructor(collector: GalleryCollector) {
    this.collector = collector;
  }

  public async handle(req: Request): Promise<Response> {
    switch(new URL(req.url).pathname) {
      case '/events':
        return listEvents(this.collector, req);

      case '/healthcheck':
        return healthcheck(req);

      case '/assets/main.css':
        return css(req);

      default:
        return new Response('', {
          status: 302,
          headers: { 'Location': '/events' },
        });
    }
  }
}
