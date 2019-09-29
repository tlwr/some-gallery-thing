import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Request, Response } from "node-fetch";

import {exampleEvents} from '../../data/events';
import {GalleryCollector} from '../../types';

import {isProduction} from '../../utils';

import { GalleryEventsComponent } from "../../components";

export const listEvents = async (
  collector: GalleryCollector,
  _req: Request,
): Promise<Response> => {
  const events = await collector.collect();

  const responseBody = `<!DOCTYPE HTML>${ReactDOM.renderToString(
    React.createElement(GalleryEventsComponent, {events})
  )}`;

  return new Response(
    responseBody, {
      headers: { 'Content-Type': 'text/html' },
    },
  );
};
