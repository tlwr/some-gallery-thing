import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';
import {decode} from 'html-entities';

import {Gallery, GalleryEvent} from '../types';

const foam: Gallery = {
  name: 'Foam Fotografiemuseum',
  address: 'Keizersgracht 609, Amsterdam, 1017 DS',
  website: 'https://www.foam.org/',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('.CollageCard__Item-sc-16ftgjk-0').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    if (!/exhibition ?at/i.test(cheerio(elem).html())) {
      return;
    }

    const title = loadedElem('h3').text().trim();

    const website = baseURL + loadedElem('a').attr('href');

    const noscript = loadedElem('noscript').html();
    const rawSrc = cheerio(noscript).filter((_, img) => cheerio(img).attr('src').indexOf('gif') < 0).attr('src');
    const image = `${baseURL}/${decode(rawSrc)}`;

    const subtitle = loadedElem('h4').text().trim();
    if (!/until/i.test(subtitle)) {
      return;
    }

    const rawDate = subtitle.replace(/until/i, '').trim();
    let closeDate = moment(rawDate, 'DD MMM');

    const today = moment()
    if (!closeDate.isSame(today, 'day') && closeDate.isBefore()) {
      closeDate = closeDate.add(1, 'year');
    }

    const event: GalleryEvent = {
      title, closeDate: closeDate.toDate(), gallery: foam, image, website,
    }

    events = [event, ...events];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.foam.org';

  const opts = {
    url: `${baseURL}/programme`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
