import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Request, Response } from "node-fetch";

import {exampleEvents} from '../../data/events';
import {GalleryCollector} from '../../types';

import {isProduction} from '../../utils';

import { GalleryEventsComponent } from "../../components";

export class EventsController {
  private collector: GalleryCollector;
  private city: string;

  public constructor(city: string, collector: GalleryCollector) {
    this.city = city;
    this.collector = collector;
  }

  public async handleListEvents(req: Request): Promise<Response> {
    const events = await this.collector.collect();

    const responseBody = `<!DOCTYPE HTML>${ReactDOM.renderToString(
      React.createElement(GalleryEventsComponent, {city: this.city, events})
    )}`;

    return new Response(
      responseBody, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'max-age=900, public',
        },
      },
    );
  }
}
