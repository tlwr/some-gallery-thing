import { BodyInit, Headers, Request, Response } from "node-fetch";

import mainCSS from '../../css/main.scss';

export class AssetsController {
  public async handleCSS(req: Request): Promise<Response> {
    return Promise.resolve(new Response(mainCSS.toString(), {
      headers: {
        'Content-Type': 'text/css',
        'Cache-Control': 'max-age=86400, public',
      },
    }));
  }
}
