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
}

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

  return md.format('[until] D MMM YYYY').toLowerCase();
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
            {niceCloseDate(this.props.event.closeDate)}
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
