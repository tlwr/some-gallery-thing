import request from 'supertest';

import {app} from './app';

describe('app', () => {
  it('should redirect / to /london', async () => {
    await request(app)
      .get('/')
      .expect(302)
      .expect('Location', /\/london/)
    ;
  });

  it('should redirect /events to /london', async () => {
    await request(app)
      .get('/events')
      .expect(302)
      .expect('Location', /\/london/)
    ;
  });

  it('should redirect /amsterdam to /london', async () => {
    await request(app)
      .get('/amsterdam')
      .expect(302)
      .expect('Location', /\/london/)
    ;
  });

  it('should serve css on /assets/main.css', async () => {
    await request(app)
      .get('/assets/main.css')
      .expect(200)
      .expect('Content-Type', /text.css/)
    ;
  });
});
