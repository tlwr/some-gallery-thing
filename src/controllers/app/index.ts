import { Request, Response } from 'node-fetch';
import URI from 'urijs';

import {EventsController} from '../events';
import {AssetsController} from '../assets';

import {GalleryCollector} from '../../types';

export class AppController {
  private assetsController: AssetsController;
  private eventsController: EventsController;

  public constructor(collector: GalleryCollector) {
    this.assetsController = new AssetsController();
    this.eventsController = new EventsController(collector);
  }

  public async handle(req: Request): Promise<Response> {
    switch(new URI(req.url).pathname()) {
      case '/events':
        return this.eventsController.handleListEvents(req);

      case '/assets/main.css':
        return this.assetsController.handleCSS(req);

      default:
        return new Response('', {
          status: 302,
          headers: { 'Location': '/events' },
        });
    }
  }
}
