import lodash from 'lodash';

import {exampleEvents} from '../data/events';

import {collect as dpg} from './dulwich-picture-gallery';
import {collect as tate} from './tate';

export default {
  DulwichPictureGallery: dpg,
  Tate: tate,

  Stub: () => Promise.resolve(exampleEvents),

  All: async () => {
    const allEvents = await Promise
      .all([
        dpg(),
        tate(),
      ])

    return lodash.flatten(allEvents);
  },
};
