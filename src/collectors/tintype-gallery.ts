import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const tintypeGallery: Gallery = {
  name: 'Tintype',
  address: '107 Essex Road, London N1 2SL',
  website: 'https://wwww.tintypegallery.com',
};

const parseEvents = (rawEvents: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('article.category-current-forthcoming').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const artist = loadedElem('span.artist').text().trim()
    const title = loadedElem('span.title').text().trim()
    const fullTitle = `${artist}: ${title}`;
    const website = loadedElem('header a').attr('href');

    const dates = loadedElem('h3.date').text().trim().split('–')
    const openDate = moment(dates[0], 'DD MMMM').toDate();
    const closeDate = moment(dates[1], 'DD MMMM YYYY').toDate();
    const event: GalleryEvent = {
      title: fullTitle, openDate, closeDate, gallery: tintypeGallery, website,
    }

    events = [event, ...events];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.tintypegallery.com';

  const opts = {
    url: `${baseURL}/exhibitions`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents);

  return parsedEvents;
};
