import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const gasworks: Gallery = {
  name: 'Gasworks',
  address: '155 Vauxhall Street London SE11 5RH',
  website: 'https://wwww.gasworks.org.uk',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('section#current article, section#forthcoming article').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const title = loadedElem('h1').text().trim();
    const website = baseURL + loadedElem('h1 a').attr('href');
    const image = baseURL + loadedElem('figure img').attr('src');

    const openDate = moment(
      loadedElem('h2.date span:first-child').text(),
      'DD MMM [-]',
    ).toDate();

    const closeDate = moment(
      loadedElem('h2.date span:last-child').text(),
      'DD MMM YY',
    ).toDate();

    const event: GalleryEvent = {
      title, openDate, closeDate, gallery: gasworks, website, image,
    }

    events = [event, ...events];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.gasworks.org.uk';

  const opts = {
    url: `${baseURL}/exhibitions`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
