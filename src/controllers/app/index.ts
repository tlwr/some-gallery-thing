import { Request, Response } from 'node-fetch';
import URI from 'urijs';

import {EventsController} from '../events';
import {AssetsController} from '../assets';
import {HealthcheckController} from '../healthcheck';

import {GalleryCollector} from '../../types';

export class AppController {
  private assetsController: AssetsController;
  private eventsController: EventsController;
  private healthcheckController: HealthcheckController;

  public constructor(collector: GalleryCollector) {
    this.assetsController = new AssetsController();
    this.eventsController = new EventsController(collector);
    this.healthcheckController = new HealthcheckController();
  }

  public async handle(req: Request): Promise<Response> {
    switch(new URI(req.url).pathname()) {
      case '/events':
        return this.eventsController.handleListEvents(req);

      case '/healthcheck':
        return this.healthcheckController.handle(req);

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
