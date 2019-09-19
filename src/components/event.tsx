import * as React from "react";

import { GalleryEvent } from '../types';

export interface IGalleryEventComponentProps {
  event: GalleryEvent;
}

export class GalleryEventComponent extends React.Component<IGalleryEventComponentProps, {}> {
  public render() {
    return <div>
      <a className="db center mw5 black link dim"
         href="{event.website || event.gallery.website}">

         if (event.image) {
          <img src={this.props.event.image}
               className="w-100 db outline black-10"/>
         }
        <dl className="mt2 f6">
          <dd className="ml0 fw9">{this.props.event.title}</dd>
          <dd className="ml0 gray">{this.props.event.gallery.name}</dd>
        </dl>
      </a>
    </div>;
  }
}
