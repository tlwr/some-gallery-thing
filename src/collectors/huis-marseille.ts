import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

require('moment/locale/nl');

import {Gallery, GalleryEvent} from '../types';

const huismarseille: Gallery = {
  name: 'Huis Marseille',
  address: 'Keizersgracht 401, Amsterdam, 1016 EK',
  website: 'https://www.huismarseille.nl/nl',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('section.article__content li.tease').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const title = loadedElem('.h2').text().replace(/\s+/mg, ' ').trim();
    const website = baseURL + loadedElem('h3 a').attr('href');

    const image = baseURL + loadedElem('a.image').attr('data-bg').trim();

    const date = loadedElem('time').text().trim();
    const dates = date.split(/—/).map(ds => ds.trim());

    const [rawOpenDate, rawCloseDate, ...DATES] = dates;

    const openDate = moment(rawOpenDate, 'DD.MM.YYYY', 'nl');
    const closeDate = moment(rawCloseDate, 'DD.MM.YYYY', 'nl');

    const today = moment()
    // istanbul ignore next
    if (today.isBefore(openDate)) {
      return;
    }

    const event: GalleryEvent = {
      title, closeDate: closeDate.toDate(), gallery: huismarseille, website, image,
    }

    events = [event, ...events];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.huismarseille.nl';

  const opts = {
    url: `${baseURL}/tentoonstellingen/`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
