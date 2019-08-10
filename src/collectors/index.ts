import lodash from 'lodash';

import {exampleEvents} from '../data/events';

import {collect as dpg} from './dulwich-picture-gallery';
import {collect as tate} from './tate';
import {collect as whiteCube} from './white-cube';

export default {
  DulwichPictureGallery: dpg,
  Tate: tate,
  WhiteCube: whiteCube,

  Stub: () => Promise.resolve(exampleEvents),

  All: async () => {
    const allEvents = await Promise
      .all([
        dpg(),
        tate(),
        whiteCube(),
      ])

    return lodash.flatten(allEvents);
  },
};
