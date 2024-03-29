import * as React from "react";

import { GalleryEvent } from '../types';
import {GalleryEventComponent} from './event';
import {truncateEven} from '../utils';

export interface GalleryEventsComponentProps {
  events: ReadonlyArray<GalleryEvent>;
  city: string;
}

export function sortEvents(events: ReadonlyArray<GalleryEvent>): ReadonlyArray<GalleryEvent> {
  return Array
    .from(events)
    .sort((a, b) => {
      return (new Date(a.closeDate).getTime()) - (new Date(b.closeDate).getTime());
    });
}

export class GalleryEventsComponent extends React.Component<GalleryEventsComponentProps, Record<string, never>> {
  // istanbul ignore next
  public render(): React.ReactElement {
    return <html lang="en">
      <head>
        <title>some gallery thing</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/assets/main.css"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖼️</text></svg>"/>
      </head>
      <body>

        <div className="">
          <header className="header">
            <h1>some gallery thing</h1>
            <ul>
              {
                this.props.city === 'london' ?
                <li className="active"><a href="/london">london</a></li> :
                <li><a href="/london">london</a></li>
              }
              {
                this.props.city === 'amsterdam' ?
                <li className="active"><a href="/amsterdam">amsterdam</a></li> :
                <li><a href="/amsterdam">amsterdam</a></li>
              }
            </ul>
          </header>

          <main className="grid-container">
           {this.renderEvents(truncateEven(sortEvents(this.props.events)))}
          </main>

          <footer className="footer">
            <ul>
              <li>
                {this.localise('website by')} <>
                </><a href="http://soniaturcotte.com/">sonia turcotte</a> <>
                </>{this.localise('and')} <>
                </><a href="https://toby.codes/">tlwr</a></li>
              <li><a href="https://github.com/tlwr/some-gallery-thing">github</a></li>
              <li><a href="https://www.instagram.com/somegallerything/">instagram</a></li>
            </ul>
        </footer>
        </div>

      </body>
    </html>;
  }

  // istanbul ignore next
  public renderEvents(events: ReadonlyArray<GalleryEvent>): ReadonlyArray<React.ReactElement> {
    return Array
      .from(events)
      .map((e, i) => <GalleryEventComponent key={i} event={e} city={this.props.city}/>)
    ;
  }

  // istanbul ignore next
  private localise(s: string): string {
    const i18n : {[key: string]: {[key: string]: string}}  = {
      london: {
        'website by': 'website by',
        'and': 'and',
      },
      amsterdam: {
        'website by': 'website door',
        'and': 'en',
      },
    };

    return i18n[this.props.city][s];
  }
}
