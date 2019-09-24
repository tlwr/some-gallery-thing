import lodash from 'lodash';

import {exampleEvents} from '../data/events';
import {GalleryEvent} from '../types';

import {collect as dpg} from './dulwich-picture-gallery';
import {collect as tate} from './tate';
import {collect as whiteCube} from './white-cube';

// istanbul ignore next
export default {
  DulwichPictureGallery: dpg,
  Tate: tate,
  WhiteCube: whiteCube,

  Stub: async (): Promise<ReadonlyArray<GalleryEvent>> => {
    return Promise.resolve(exampleEvents);
  },

  All: async (): Promise<ReadonlyArray<GalleryEvent>> => {
    const allEvents = await Promise
      .all([
        dpg(),
        tate(),
        whiteCube(),
      ])

    return lodash.flatten(allEvents);
  },
};
