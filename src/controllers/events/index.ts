import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { Request, Response } from "node-fetch";

import {exampleEvents} from '../../data/events';
import collectors from '../../collectors';

import {isProduction} from '../../utils';

import { GalleryEventsComponent } from "../../components";

export const listEvents = async (
  _req: Request,
): Promise<Response> => {

  const events = isProduction()
    ? /* istanbul ignore next */ await collectors.All()
    : await collectors.Stub();

  const responseBody = `<!DOCTYPE HTML>${ReactDOM.renderToString(
    React.createElement(GalleryEventsComponent, {events})
  )}`;

  return new Response(
    responseBody, {
      headers: { 'Content-Type': 'text/html' },
    },
  );
};
