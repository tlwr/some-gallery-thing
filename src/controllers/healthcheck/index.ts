import { Request, Response } from "node-fetch";

export const healthcheck = (
  _req: Request,
): Response => {
  return new Response('OK', { headers: { 'Content-Type': 'text/plain' } });
};
