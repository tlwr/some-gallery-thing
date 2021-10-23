import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

require('moment/locale/nl');

import {Gallery, GalleryEvent} from '../types';

const stedelijk: Gallery = {
  name: 'Stedelijk',
  address: 'Museumplein 10, 1071 DJ Amsterdam',
  website: 'https://www.stedelijk.nl/nl',
};

const parseEvents = (rawEvents: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('.bar-group').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const groupKind = loadedElem('h2.bar-group__title').text().trim();

    if (groupKind !== 'Nu') {
      return;
    }

    loadedElem('li a.bar:not(.bar--collection)').each((_ii, li) => {
      const lli = cheerio.load(li);

      const title = lli('h3.bar__title').text().trim().replace(/\s+/mg, ' ');
      const website = cheerio(li).attr('href');

      const image = lli('img').attr('src');

      const subtitle = lli('footer p').text().trim();

      if (!/t\/m/i.test(subtitle)) {
        return;
      }

      const rawDate = subtitle.replace(/.*t\/m/, '').trim();
      const closeDate = moment(rawDate, 'DD MMM YYYY', 'nl');

      const event: GalleryEvent = {
        title, closeDate: closeDate.toDate(), gallery: stedelijk, website,
      }

      if (image !== undefined) {
        event.image = image.trim();
      }

      events = [event, ...events];
    });
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.stedelijk.nl';

  const opts = {
    url: `${baseURL}/nl/nu-te-zien/tentoonstellingen`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents);

  return parsedEvents;
};
