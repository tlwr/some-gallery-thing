import request from 'supertest';

import {app} from '../../app';

describe('london', () => {
  it('should include the title', async () => {
    await request(app)
      .get('/london')
      .expect(200)
      .expect(/some gallery thing/i)
    ;
  });

  it('should include an event name', async () => {
    await request(app)
      .get('/london')
      .expect(200)
      .expect(/Van Gogh and Britain/i)
    ;
  });

  it('should include a gallery name', async () => {
    await request(app)
      .get('/london')
      .expect(200)
      .expect(/Tate Britain/i)
    ;
  });
});
