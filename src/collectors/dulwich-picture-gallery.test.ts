import moment from 'moment';
import nock from 'nock';

import {Gallery, GalleryEvent} from '../types';
import {testable as t, collector} from './dulwich-picture-gallery';

describe('scraping', () => {
  let nockDulwich: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockDulwich = nock('https://www.dulwichpicturegallery.org.uk');
  });

  afterEach(() => {
    nockDulwich.done();

    nock.cleanAll();
  });

  it('should scrape events correctly', async () => {
    nockDulwich
      .get(/WhatsOnPage/)
      .reply(200, 'a response');
    ;

    const response = await t.getEventsAsRawHTML();

    expect(response).toEqual('a response');
  });

  it('should fail gracefully when not OK', async () => {
    nockDulwich
      .get(/WhatsOnPage/)
      .reply(404);
    ;

    await expect(t.getEventsAsRawHTML()).rejects.toThrow(/404/);
  });
});

describe('parsing', () => {
  it('should parse events correctly', async () => {
    const rawHTML = `
    <div class="list-inner-container" data-page-count="1" data-is-more-after-current-page="true">
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
          <img src="/media/10434/new-pav-thumbnail.jpg" alt="Dulwich Pavilion 2019: The Colour Palace">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
              Dulwich Pavilion 2019: The Colour Palace
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-12">12 Jun 2019</time>
            <time datetime="2019-09-22">22 Sep 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking/">
          <img src="/media/9194/tube-train-power-thumb.jpg" alt="Cutting Edge: Modernist British Printmaking">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking/">
              Cutting Edge: Modernist British Printmaking
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-19">19 Jun 2019</time>
            <time datetime="2019-09-08">8 Sep 2019</time>
          </div>
          <nav>
            <a href="https://my.dulwichpicturegallery.org.uk/calendar/3630/cutting-edge-and-gallery" class="book-tickets">
              Book now
            </a>
            <a href="/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/june/nahoko-kojima-sumi/">
          <img src="/media/10430/sumi-thumb.jpg" alt="Nahoko Kojima: Sumi">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/june/nahoko-kojima-sumi/">
              Nahoko Kojima: Sumi
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-19">19 Jun 2019</time>
            <time datetime="2019-09-08">8 Sep 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/june/nahoko-kojima-sumi/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
    </div>`;

    const events = t.parseEvents(rawHTML);

    expect(events.length).toBe(3);

    expect(events.some((event: GalleryEvent): boolean => {
      const title = !! event.title.match(/The Colour Palace/);
      const openDate = moment('2019-06-12').isSame(event.openDate);
      const closeDate = moment('2019-09-22').isSame(event.closeDate);

      return title && openDate && closeDate;
    })).toBe(true);

    expect(events.some((event: GalleryEvent): boolean => {
      const title = !! event.title.match(/Modernist British Printmaking/);
      const openDate = moment('2019-06-19').isSame(event.openDate);
      const closeDate = moment('2019-09-08').isSame(event.closeDate);

      return title && openDate && closeDate;
    })).toBe(true);

    expect(events.some((event: GalleryEvent): boolean => {
      const title = !! event.title.match(/Nahoko Kojima: Sumi/);
      const openDate = moment('2019-06-19').isSame(event.openDate);
      const closeDate = moment('2019-09-08').isSame(event.closeDate);

      return title && openDate && closeDate;
    })).toBe(true);
  });

  it('should throw an error when there is no title', async () => {
    const rawHTML = `
    <div class="list-inner-container" data-page-count="1" data-is-more-after-current-page="true">
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
          <img src="/media/10434/new-pav-thumbnail.jpg" alt="Dulwich Pavilion 2019: The Colour Palace">
        </a>
        <div class="stack-article-content">
          <div class="date">
            <time datetime="2019-06-12">12 Jun 2019</time>
            <time datetime="2019-09-22">22 Sep 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
    </div>`;

    expect(() => t.parseEvents(rawHTML)).toThrow(/Could not find title/);
  });

  it('should throw an error when there too few dates', async () => {
    const rawHTML = `
    <div class="list-inner-container" data-page-count="1" data-is-more-after-current-page="true">
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
          <img src="/media/10434/new-pav-thumbnail.jpg" alt="Dulwich Pavilion 2019: The Colour Palace">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
              Dulwich Pavilion 2019: The Colour Palace
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-12">12 Jun 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
    </div>`;

    expect(() => t.parseEvents(rawHTML)).toThrow(/Wrong number of dates/);
  });

  it('should throw an error when there are too many dates', async () => {
    const rawHTML = `
    <div class="list-inner-container" data-page-count="1" data-is-more-after-current-page="true">
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
          <img src="/media/10434/new-pav-thumbnail.jpg" alt="Dulwich Pavilion 2019: The Colour Palace">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
              Dulwich Pavilion 2019: The Colour Palace
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-12">12 Jun 2019</time>
            <time datetime="2019-06-12">12 Jun 2019</time>
            <time datetime="2019-09-22">22 Sep 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
    </div>`;

    expect(() => t.parseEvents(rawHTML)).toThrow(/Wrong number of dates/);
  });
});

describe('collector', () => {
  let nockDulwich: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockDulwich = nock('https://www.dulwichpicturegallery.org.uk');
  });

  afterEach(() => {
    nockDulwich.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
    <div class="list-inner-container" data-page-count="1" data-is-more-after-current-page="true">
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
          <img src="/media/10434/new-pav-thumbnail.jpg" alt="Dulwich Pavilion 2019: The Colour Palace">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/">
              Dulwich Pavilion 2019: The Colour Palace
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-12">12 Jun 2019</time>
            <time datetime="2019-09-22">22 Sep 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/may/dulwich-pavilion-2019-the-colour-palace/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking/">
          <img src="/media/9194/tube-train-power-thumb.jpg" alt="Cutting Edge: Modernist British Printmaking">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking/">
              Cutting Edge: Modernist British Printmaking
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-19">19 Jun 2019</time>
            <time datetime="2019-09-08">8 Sep 2019</time>
          </div>
          <nav>
            <a href="https://my.dulwichpicturegallery.org.uk/calendar/3630/cutting-edge-and-gallery" class="book-tickets">
              Book now
            </a>
            <a href="/whats-on/exhibitions/2019/june/cutting-edge-modernist-british-printmaking/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
      <div class="stack-article grid-nest-1234">
        <div class="block-tag"><p>Exhibitions</p></div>
        <a href="/whats-on/exhibitions/2019/june/nahoko-kojima-sumi/">
          <img src="/media/10430/sumi-thumb.jpg" alt="Nahoko Kojima: Sumi">
        </a>
        <div class="stack-article-content">
          <h2>
            <a href="/whats-on/exhibitions/2019/june/nahoko-kojima-sumi/">
              Nahoko Kojima: Sumi
            </a>
          </h2>
          <div class="date">
            <time datetime="2019-06-19">19 Jun 2019</time>
            <time datetime="2019-09-08">8 Sep 2019</time>
          </div>
          <nav>
            <a href="/whats-on/exhibitions/2019/june/nahoko-kojima-sumi/" class="more-info">
              More info
            </a>
          </nav>
        </div>
      </div>
    </div>`;

    nockDulwich
      .get(/WhatsOnPage/)
      .reply(200, rawHTML);
    ;

    const events = await collector();

    expect(events.length).toBe(3);

    expect(events.some((event: GalleryEvent): boolean => {
      const title = !! event.title.match(/The Colour Palace/);
      const openDate = moment('2019-06-12').isSame(event.openDate);
      const closeDate = moment('2019-09-22').isSame(event.closeDate);

      return title && openDate && closeDate;
    })).toBe(true);

    expect(events.some((event: GalleryEvent): boolean => {
      const title = !! event.title.match(/Modernist British Printmaking/);
      const openDate = moment('2019-06-19').isSame(event.openDate);
      const closeDate = moment('2019-09-08').isSame(event.closeDate);

      return title && openDate && closeDate;
    })).toBe(true);

    expect(events.some((event: GalleryEvent): boolean => {
      const title = !! event.title.match(/Nahoko Kojima: Sumi/);
      const openDate = moment('2019-06-19').isSame(event.openDate);
      const closeDate = moment('2019-09-08').isSame(event.closeDate);

      return title && openDate && closeDate;
    })).toBe(true);
  });

  it('should fail gracefully when not OK', async () => {
    nockDulwich
      .get(/WhatsOnPage/)
      .reply(404);
    ;

    await expect(collector()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockDulwich
      .get(/WhatsOnPage/)
      .reply(200, 'malformed response');
    ;

    await expect(collector()).rejects.toThrow(/Zero events collected/);
  });
});
