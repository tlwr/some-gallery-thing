import { BodyInit, Headers, Request, Response } from "node-fetch";

import mainCSS from '../../css/main.scss';

export const css = (
  _req: Request,
): Response => {
  return new Response(mainCSS as BodyInit, {
    headers: {
      'Content-Type': 'text/css',
    },
  });
};
