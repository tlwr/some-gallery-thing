import cheerio from 'cheerio';
import moment from 'moment';
import request from 'request-promise-native';

import {Gallery, GalleryEvent} from '../types';

const tpgEventWebsitePrefix = 'https://thephotographersgallery.org.uk';

const gallery: Gallery = {
  name: `The Photographer's Gallery`,
  address: '16–18 Ramillies Street, London W1F 7LW',
  website: 'https://thephotographersgallery.org.uk',
};

const parseEvents = (rawEvents: string): ReadonlyArray<GalleryEvent> => {
  const html = cheerio.load(rawEvents);

  const events: Array<GalleryEvent> = [];

  html('.views-row').each((_i, elem) => {
    const loadedElem = cheerio.load(elem);

    const image = loadedElem('img').attr('src');
    const title = loadedElem('.title').text().trim();

    const dates = loadedElem('.date-display-range').text();

    const dateFragments = dates.match(/\d* [A-Za-z]* \d*/g);

    if (dateFragments === null) {
      return;
    }

    const openDate = moment(dateFragments[0], 'DD MMMM YYYY').toDate();
    const closeDate = moment(dateFragments[1], 'DD MMMM YYYY').toDate();

    const slug = loadedElem('a').attr('href');

    const website = `${tpgEventWebsitePrefix}${slug}`;

    events.push({
      gallery, image, title, closeDate, openDate, website,
    });
  });

  return events;
};

export const collect = async (): Promise<ReadonlyArray<GalleryEvent>> => {
  const baseURL = 'https://www.thephotographersgallery.org.uk';

  const opts = {
    url: `${baseURL}/views/ajax`,
    resolveWithFullResponse: true,
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host':         'thephotographersgallery.org.uk',
    },

    body: `field_paragraphs_event_type_tid=2&combine=23+Nov+2019+-+23+Nov+2021&daterangepicker_start=23+Nov+2019&daterangepicker_end=23+Nov+2021&field_event_for_tid=All&view_name=whats_on&view_display_id=now_upcoming_view_page&view_args=&view_path=whats-on%2Fnow-upcoming&view_base_path=whats-on%2Fnow-upcoming`,
  };

  const response = await request(opts);

  try {
    const parsedResponse: ReadonlyArray<any> = JSON.parse(response.body);

    if (!Array.isArray(parsedResponse)) {
      throw new Error(
        "Could not get weird AJAX commands from Photographer's gallery",
      );
    }

    const commands = parsedResponse.filter(
      (c: any) => c.command === 'insert' && c.method === 'replaceWith',
    );

    if (commands.length !== 1) {
      throw new Error(
        "Could not get weird AJAX replace command from Photographer's gallery",
      );
    }

    return parseEvents(commands[0].data);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return [];
    } else {
      throw e;
    }
  }
};
