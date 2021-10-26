import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';
import {decode} from 'html-entities';

require('moment/locale/nl');

import {Gallery, GalleryEvent} from '../types';

const vangogh: Gallery = {
  name: 'Van Gogh Museum',
  address: 'Museumplein 6, Amsterdam, 1071 DJ',
  website: 'https://www.vangoghmuseum.nl/nl/',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  let nuTeZien = false;

  html('.grid-row ').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    if (loadedElem('#nu-te-zien').length > 0) {
      nuTeZien = true;
      return
    }

    if (!nuTeZien) {
      return;
    }

    loadedElem('article.teaser').each((_, teaser) => {
      const teaserElem = cheerio.load(teaser);

      const title = teaserElem('h3.teaser-title').text().trim();

      const website = baseURL + teaserElem('a').attr('href');

      const rawSrc = teaserElem('img').attr('data-src').trim();
      const image = decode(rawSrc);

      const subtitle = teaserElem('p.page-teaser-date').text().trim();

      if (/altijd te zien/i.test(subtitle)) {
        return
      }

      const rawDate = subtitle.replace(/^[^-]+ -/i, '').replace(/^tot en met/i, '').trim();
      const closeDate = moment(rawDate, 'DD MMM YYYY', 'nl');

      const event: GalleryEvent = {
        title, closeDate: closeDate.toDate(), gallery: vangogh, website, image,
      }

      events = [event, ...events];
    });

    nuTeZien = false;
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.vangoghmuseum.nl';

  const opts = {
    url: `${baseURL}/nl/bezoek/tentoonstellingen`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
