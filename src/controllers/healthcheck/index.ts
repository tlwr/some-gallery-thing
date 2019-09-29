import { Request, Response } from "node-fetch";

export class HealthcheckController {
  public async handle(req: Request): Promise<Response> {
    return new Response('OK', { headers: { 'Content-Type': 'text/plain' } });
  }
}
