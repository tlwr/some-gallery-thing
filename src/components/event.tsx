import * as React from "react";

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

export class GalleryEventComponent extends React.Component<GalleryEventComponentProps, {}> {
  public render(): React.ReactElement {
    return <div>
      <a className="db center mw5 black link dim"
         href={link(this.props.event.gallery.website, this.props.event.website)}>

        {
          this.props.event.image
          ? <img src={this.props.event.image} className="w-100 db outline black-10"/>
          : ''
        }
        <dl className="mt2 f6">
          <dd className="ml0 fw9">{this.props.event.title}</dd>
          <dd className="ml0 gray">{this.props.event.gallery.name}</dd>
        </dl>
      </a>
    </div>;
  }
}
