import * as React from "react";
import moment from 'moment';

require('moment/locale/en-gb');
require('moment/locale/nl');

import { GalleryEvent } from '../types';

export interface GalleryEventComponentProps {
  city: string;
  event: GalleryEvent;
}

export function link (galleryWebsite: string, eventWebsite?: string): string {
  if (!eventWebsite) {
    return galleryWebsite;
  }

  return eventWebsite;
}

const i18n : {[key: string]: {[key: string]: string}} = {
  'london': {
    'until today': 'until today',
    'until tomorrow': 'until tomorrow',
    'until': 'until',
    'locale': 'en-gb',
  },
  'amsterdam': {
    'until today': 't/m vandaag',
    'until tomorrow': 't/m morgen',
    'until': 't/m',
    'locale': 'nl',
  },
};

export function niceCloseDate(d: Date, city: string): string {
  const md = moment(d).locale(i18n[city].locale);

  const now = moment();
  const tomorrow = moment().add(1, 'days');

  if (md.isSame(now, 'd')) {
    return i18n[city]['until today'];
  }

  if (md.isSame(tomorrow, 'd')) {
    return i18n[city]['until tomorrow'];
  }

  const daysDiff = md.diff(now, 'days');

  if (daysDiff <= 5) {
    return md.format(`[${i18n[city]['until']}] dddd`).toLowerCase();
  }

  return md.format(`[${i18n[city]['until']}] D MMM YYYY`).toLowerCase();
}

export class GalleryEventComponent extends React.Component<GalleryEventComponentProps, Record<string, never>> {
  // istanbul ignore next
  public render(): React.ReactElement {
    return <a className="event"
              href={link(this.props.event.gallery.website, this.props.event.website)}>
      <div className="event-details">
        <div className="event-meta">
          <p className="gallery">{this.props.event.gallery.name.toLowerCase()}</p>
          <p className="close-date">
            {niceCloseDate(this.props.event.closeDate, this.props.city)}
          </p>
        </div>

        <h2>{this.props.event.title}</h2>
      </div>

      {
        this.props.event.image
        ? <img src={this.props.event.image}/>
        : ''
      }
    </a>;
  }
}
