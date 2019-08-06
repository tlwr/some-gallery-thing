import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const tateModern: Gallery = {
  name: 'Tate Modern',
  address: 'Bankside, London SE1 9TG',
  website: 'https://www.tate.org.uk/visit/tate-modern',
};

const tateBritain: Gallery = {
  name: 'Tate Britain',
  address: 'Millbank, London SW1P 4RG',
  website: 'https://www.tate.org.uk/visit/tate-britain',
};

const parseEvents = (rawEvents: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  const eventDefs = html('div.card');

  let events: Array<GalleryEvent> = [];

  eventDefs.map((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const galleryHint = loadedElem('div.card-header h3.card__label--type').first().text().trim();

    let gallery: Gallery;

    if (galleryHint.match(/tate modern/i)) {
      gallery = tateModern;
    } else if (galleryHint.match(/tate britain/i)) {
      gallery = tateBritain;
    } else {
      throw new Error(`Unknown gallery '${galleryHint}'`);
    }

    const title = loadedElem('span.card__title--maintitle.card__title--exhibition').text().trim();

    const closeDate = moment(
      loadedElem('span.card__when--date')
      .text()
      .replace(/Until/, '')
      .trim(),
      'DD MMM YYYY',
    ).toDate();

    const image = loadedElem('img[data-original]').attr('data-original');


    events = [...events, {title, closeDate, gallery, image}];
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const opts = {
    url: 'https://www.tate.org.uk/whats-on?daterange=next_week&event_type=exhibition&gallery_group=tate_britain%2Ctate_modern&ajax=1&ajax_scope=card-group',
    resolveWithFullResponse: true,
  };

  const response = await request(opts);
  const rawEvents = response.body;
  const parsedEvents = parseEvents(rawEvents);

  return parsedEvents;
};

export const testable = {
  parseEvents,
};
