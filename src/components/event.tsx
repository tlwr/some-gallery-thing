import * as React from "react";
import moment from 'moment';

import { GalleryEvent } from '../types';

export interface GalleryEventComponentProps {
  event: GalleryEvent;
}

export function link (galleryWebsite: string, eventWebsite?: string): string {
  if (!eventWebsite) {
    return galleryWebsite;
  }

  return eventWebsite;
};

export function niceCloseDate(d: Date): string {
  const md = moment(d);

  const now = moment();
  const tomorrow = moment().add(1, 'days');

  if (md.isSame(now, 'd')) {
    return 'until today';
  }

  if (md.isSame(tomorrow, 'd')) {
    return 'until tomorrow';
  }

  const daysDiff = md.diff(now, 'days');

  if (daysDiff <= 5) {
    return md.format('[until] dddd').toLowerCase();
  }

  return md.format('[until] dddd YYYY/MM/DD').toLowerCase();
}

export class GalleryEventComponent extends React.Component<GalleryEventComponentProps, {}> {
  public render(): React.ReactElement {
    return <a className="event link dim"
              href={link(this.props.event.gallery.website, this.props.event.website)}>
      <dl>
        <dd>{this.props.event.title.toLowerCase()}</dd>
        <dd>{this.props.event.gallery.name.toLowerCase()}</dd>
      </dl>

      {
        this.props.event.image
        ? <img src={this.props.event.image}/>
        : ''
      }

      <p>
          {niceCloseDate(this.props.event.closeDate)}
      </p>
    </a>;
  }
}
