import moment from 'moment';
import nock from 'nock';

import {collect} from './the-photographers-gallery';

describe('collector', () => {
  let nockPhotographersGallery: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockPhotographersGallery = nock('https://www.thephotographersgallery.org.uk');
  });

  afterEach(() => {
    nockPhotographersGallery.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawResp: any = [{
      "command": "insert",
      "method": "replaceWith",
      "selector": ".view-dom-id-",
      "data": "<div class=\"view view-whats-on view-id-whats_on view-display-id-now_upcoming_view_page whats-on clearfix tile-hovers tile-white tile-no-padding-lr view-dom-id-6e9fbfefc579a50faec3637db1194733\">\n        \n  \n  \n      <div class=\"view-content\">\n        <div class=\"views-row views-row-1 views-row-odd views-row-first col-sm-4\">\n      \n  <div class=\"views-field views-field-field-paragraphs-overview-image\">        <div class=\"field-content\"><a href=\"/whats-on/exhibition/shot-soho\"><img typeof=\"foaf:Image\" src=\"https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/03_%20Shot%20in%20Soho%20_1.jpg?itok=FSrh4HC-&amp;c=99ed4f471edef30c465329630f1e82dd\" alt=\"\" /></a></div>  </div>  \n  <div class=\"views-field views-field-field-paragraphs-event-type col-xs-6 type\">        <span class=\"field-content\">Exhibition</span>  </div>  \n  <div class=\"views-field views-field-field-event-dates col-xs-6 date\">        <div class=\"field-content\"><div class=\"date-display-range\">18 Oct 2019 - 09 Feb 2020</div></div>  </div>  \n  <div class=\"views-field views-field-field-paragraph-title title\">        <h3 class=\"field-content\"><a href=\"/whats-on/exhibition/shot-soho\">Shot In Soho</a></h3>  </div>  </div>\n  <div class=\"views-row views-row-2 views-row-even views-row-last col-sm-4\">\n      \n  <div class=\"views-field views-field-field-paragraphs-overview-image\">        <div class=\"field-content\"><a href=\"/whats-on/exhibition/feast-eyes-story-food-photography\"><img typeof=\"foaf:Image\" src=\"https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/5.%20FFE_329_Maida_Jello_0.jpg?itok=_A0vP2o3\" alt=\"\" /></a></div>  </div>  \n  <div class=\"views-field views-field-field-paragraphs-event-type col-xs-6 type\">        <span class=\"field-content\">Exhibition</span>  </div>  \n  <div class=\"views-field views-field-field-event-dates col-xs-6 date\">        <div class=\"field-content\"><div class=\"date-display-range\">18 Oct 2019 - 09 Feb 2020</div></div>  </div>  \n  <div class=\"views-field views-field-field-paragraph-title title\">        <h3 class=\"field-content\"><a href=\"/whats-on/exhibition/feast-eyes-story-food-photography\">Feast for the Eyes – The Story of Food in Photography</a></h3>  </div>  </div>\n    </div>\n  \n  \n  \n  \n  \n  \n</div>",
      "settings": null,
    }];

    nockPhotographersGallery
      .post(/views.ajax/)
      .reply(200, rawResp);
    ;

    const events = await collect();

    expect(events.length).toBe(2);

    expect(events).toMatchObject([{
      title: 'Shot In Soho',

      openDate:  moment('2019/10/18', 'YYYY/MM/DD').toDate(),
      closeDate: moment('2020/02/09', 'YYYY/MM/DD').toDate(),

      website: 'https://thephotographersgallery.org.uk/whats-on/exhibition/shot-soho',
      image:   'https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/03_%20Shot%20in%20Soho%20_1.jpg?itok=FSrh4HC-&c=99ed4f471edef30c465329630f1e82dd',

      gallery: {
        name: "The Photographer's Gallery",
      },
    }, {
      title: 'Feast for the Eyes – The Story of Food in Photography',

      openDate:  moment('2019/10/18', 'YYYY/MM/DD').toDate(),
      closeDate: moment('2020/02/09', 'YYYY/MM/DD').toDate(),

      website: 'https://thephotographersgallery.org.uk/whats-on/exhibition/feast-eyes-story-food-photography',
      image:   'https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/5.%20FFE_329_Maida_Jello_0.jpg?itok=_A0vP2o3',

      gallery: {
        name: "The Photographer's Gallery",
      },
    }]);
  });

  it('should skip events without dates', async () => {
    const rawResp: any = [{
      "command": "insert",
      "method": "replaceWith",
      "selector": ".view-dom-id-",
      "data": "<div class=\"view view-whats-on view-id-whats_on view-display-id-now_upcoming_view_page whats-on clearfix tile-hovers tile-white tile-no-padding-lr view-dom-id-6e9fbfefc579a50faec3637db1194733\">\n        \n  \n  \n      <div class=\"view-content\">\n        <div class=\"views-row views-row-1 views-row-odd views-row-first col-sm-4\">\n      \n  <div class=\"views-field views-field-field-paragraphs-overview-image\">        <div class=\"field-content\"><a href=\"/whats-on/exhibition/shot-soho\"><img typeof=\"foaf:Image\" src=\"https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/03_%20Shot%20in%20Soho%20_1.jpg?itok=FSrh4HC-&amp;c=99ed4f471edef30c465329630f1e82dd\" alt=\"\" /></a></div>  </div>  \n  <div class=\"views-field views-field-field-paragraphs-event-type col-xs-6 type\">        <span class=\"field-content\">Exhibition</span>  </div>  \n  <div class=\"views-field views-field-field-event-dates col-xs-6 date\">        <div class=\"field-content\"><div class=\"date-display-range\">18 Oct 2019 - 09 Feb 2020</div></div>  </div>  \n  <div class=\"views-field views-field-field-paragraph-title title\">        <h3 class=\"field-content\"><a href=\"/whats-on/exhibition/shot-soho\">Shot In Soho</a></h3>  </div>  </div>\n  <div class=\"views-row views-row-2 views-row-even views-row-last col-sm-4\">\n      \n  <div class=\"views-field views-field-field-paragraphs-overview-image\">        <div class=\"field-content\"><a href=\"/whats-on/exhibition/feast-eyes-story-food-photography\"><img typeof=\"foaf:Image\" src=\"https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/5.%20FFE_329_Maida_Jello_0.jpg?itok=_A0vP2o3\" alt=\"\" /></a></div>  </div>  \n  <div class=\"views-field views-field-field-paragraphs-event-type col-xs-6 type\">        <span class=\"field-content\">Exhibition</span>  </div>  \n  <div class=\"views-field views-field-field-event-dates col-xs-6 date\">        <div class=\"field-content\"><div class=\"date-display-range\"></div></div>  </div>  \n  <div class=\"views-field views-field-field-paragraph-title title\">        <h3 class=\"field-content\"><a href=\"/whats-on/exhibition/feast-eyes-story-food-photography\">Feast for the Eyes – The Story of Food in Photography</a></h3>  </div>  </div>\n    </div>\n  \n  \n  \n  \n  \n  \n</div>",
      "settings": null,
    }];

    nockPhotographersGallery
      .post(/views.ajax/)
      .reply(200, rawResp);
    ;

    const events = await collect();

    expect(events.length).toBe(1);

    expect(events).toMatchObject([{
      title: 'Shot In Soho',

      openDate:  moment('2019/10/18', 'YYYY/MM/DD').toDate(),
      closeDate: moment('2020/02/09', 'YYYY/MM/DD').toDate(),

      website: 'https://thephotographersgallery.org.uk/whats-on/exhibition/shot-soho',
      image:   'https://thephotographersgallery.org.uk/sites/default/files/styles/what_s_on_400x324/public/03_%20Shot%20in%20Soho%20_1.jpg?itok=FSrh4HC-&c=99ed4f471edef30c465329630f1e82dd',

      gallery: {
        name: "The Photographer's Gallery",
      },
    }]);
  });


  it('should fail gracefully when not OK', async () => {
    nockPhotographersGallery
      .post(/views.ajax/)
      .reply(404);
    ;

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockPhotographersGallery
      .post(/views.ajax/)
      .reply(200, 'malformed response');
    ;

    const events = await collect();

    expect(events.length).toBe(0);
  });

  it('should fail gracefully when not an array of commands', async () => {
    nockPhotographersGallery
      .post(/views.ajax/)
      .reply(200, JSON.stringify({}));
    ;

    await expect(collect()).rejects.toThrow(/weird AJAX commands/);
  });

  it('should fail gracefully when no commands', async () => {
    nockPhotographersGallery
      .post(/views.ajax/)
      .reply(200, JSON.stringify([]));
    ;

    await expect(collect()).rejects.toThrow(/weird AJAX replace command/);
  });
});
