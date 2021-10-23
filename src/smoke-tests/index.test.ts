import cheerio from 'cheerio';
import request from 'request-promise-native';

const baseURL = 'https://some-gallery-thing.toby.codes';

const headers = {
  'User-Agent': 'some-gallery-thing-smoke-test',
};

describe('smoke-tests', () => {
  describe('london', () => {
    const url = `${baseURL}/london`;

    it('should serve a page with events present', async () => {
      const response = await request({
        url, headers,
        resolveWithFullResponse: true,
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatch(/<main/);

      const html = cheerio.load(response.body);
      const events = html('.event');
      const images = html('img');

      expect(events.length).toBeGreaterThan(0);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe('assets', () => {
    const assetsURL = `${baseURL}/assets`;

    it('should serve css assets', async () => {
      const url = `${assetsURL}/main.css`;

      const response = await request({
        url, headers,
        resolveWithFullResponse: true,
      });

      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toEqual('text/css');
      expect(response.body).toMatch(/[.]event/);
    });
  });
});
