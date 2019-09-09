import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const whiteCubeBermondsey: Gallery = {
  name: 'White Cube Bermondsey',
  address: '144 – 152 Bermondsey Street London SE1 3TQ',
  website: 'https://wwww.whitecube.com',
};

const whiteCubeMasonsYard: Gallery = {
  name: `White Cube Mason's Yard`,
  address: `5 – 26 Mason's Yard London SW1Y 6BU`,
  website: 'https://wwww.whitecube.com',
};

const parseEvents = (rawEvents: string, baseURL: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  let events: Array<GalleryEvent> = [];

  html('figure').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    if (loadedElem('a').text().trim() === '') {
      return;
    }

    const title = loadedElem('h4').text().trim();
    const website = loadedElem('figcaption a').attr('href');

    const meta = loadedElem('h5').text().trim();

    const location = meta.match(/White Cube .*/)[0];
    let gallery: Gallery;
    if (location.match(/bermondsey/i)) {
      gallery = whiteCubeBermondsey;
    } else if (location.match(/mason/i)) {
      gallery = whiteCubeMasonsYard;
    } else {
      return;
    }

    const openAndClose = meta.replace(/White Cube.*/, '');
    const openDate = moment(
      openAndClose.split('–')[0], 'D MMMM YYYY',
    ).toDate();

    const closeDate = moment(
      openAndClose.split('–')[1], 'D MMMM YYYY',
    ).toDate();

    const image = baseURL + loadedElem('img').attr('src');

    const event: GalleryEvent = {
      title, openDate, closeDate, gallery, website, image,
    }

    events = [event, ...events];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://whitecube.com';

  const opts = {
    url: `${baseURL}/exhibitions/exhibition/sort/current`,
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents, baseURL);

  return parsedEvents;
};
