import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';
import {decode} from 'html-entities';

require('moment/locale/nl');

import {Gallery, GalleryEvent} from '../types';

const rijksmuseum: Gallery = {
  name: 'Rijksmuseum',
  address: 'Museumstraat 1, Amsterdam',
  website: 'https://www.rijksmuseum.nl/nl',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('.whatson-results .whatson-filtered').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const title = loadedElem('h3.whatson-filtered-heading').text().trim();

    const website = baseURL + loadedElem('a').attr('href');

    const rawSrc = loadedElem('img').attr('data-src').trim();
    const image = decode(rawSrc);

    const subtitle = loadedElem('p.block-content-subtitle').text().trim();

    if (!/t\/m/i.test(subtitle)) {
      return;
    }

    const rawDate = subtitle.replace(/.*t\/m/i, '').trim();
    let closeDate = moment(rawDate, 'DD MMM YYYY', 'nl');

    const today = moment()
    if (!closeDate.isSame(today, 'day') && closeDate.isBefore()) {
      closeDate = closeDate.add(1, 'year');
    }

    const event: GalleryEvent = {
      title, closeDate: closeDate.toDate(), gallery: rijksmuseum, website, image,
    }

    events = [event, ...events];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.rijksmuseum.nl';

  const opts = {
    url: `${baseURL}/nl/zien-en-doen?filter=tentoonstellingen&filter=nu-te-zien`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
