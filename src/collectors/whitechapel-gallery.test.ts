import moment from 'moment';
import nock from 'nock';

import {GalleryEvent} from '../types';
import {collect} from './whitechapel-gallery';

describe('collector', () => {
  let nockWhitechapelGallery: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockWhitechapelGallery = nock('https://www.whitechapelgallery.org');
  });

  afterEach(() => {
    nockWhitechapelGallery.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
  <div class="contentWrapper">
    <h1 class="whitechapelFont">On Now</h1>
    <div class='oneHalfMedia onehalfImage  content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/anna-maria-maiolino/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/07/AMM_WebCrop_V1-570x428.jpg' alt='AMM_WebCrop_V1' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/anna-maria-maiolino/'>Anna Maria Maiolino</a></h4><h4 class='category_title'>Making Love Revolutionary</h4><p>25 Sep - 12 Jan 2020</p></div><div class='oneHalfMedia onehalfImage last content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/eileen-simpson-ben-white-open-music-archive/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/06/Eileen-Simpson-and-Ben-White-Everything-I-Have-Is-Yours-2019_web-570x428.jpg' alt='Eileen Simpson and Ben White, Everything I Have Is Yours, 2019_web' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/eileen-simpson-ben-white-open-music-archive/'>Eileen Simpson and Ben White (Open Music Archive)</a></h4><h4 class='category_title'>Once Heard Before </h4><p>27 Aug - 5 Jan 2020</p></div><div class='clearRow'></div><div class='oneHalfMedia onehalfImage  content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/sense-sound-sound-sense/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/06/WebCrop-570x428.jpg' alt='WebCrop' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/sense-sound-sound-sense/'>Sense Sound/Sound Sense</a></h4><h4 class='category_title'>Fluxus Music, Scores & Records in the Luigi Bonotto Collection </h4><p>3 Sep - 1 Feb 2020</p></div><div class='oneHalfMedia onehalfImage last content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/la-caixa-collection-tom-mccarthy/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/06/laCaixa3_WebCrop_V2-570x428.jpg' alt='laCaixa3_WebCrop_V2' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/la-caixa-collection-tom-mccarthy/'>”la Caixa” Collection of Contemporary Art</a></h4><h4 class='category_title'>Selected by Tom McCarthy</h4><p>19 Sep - 5 Jan 2020</p></div><div class='clearRow'></div><div class='oneHalfMedia onehalfImage  content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/angela-su-tomasz-machcinski-dette-nogle/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/06/02-570x428.jpg' alt='02' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/angela-su-tomasz-machcinski-dette-nogle/'>Angela Su, Tomasz Machciński, D’Ette Nogle</a></h4><h4 class='category_title'>Artists' Film International</h4><p>1 Oct - 24 Nov 2019</p></div><div class='oneHalfMedia onehalfImage last content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/palace-4-m/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/05/Image-3-570x428.png' alt='Image 3' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/palace-4-m/'>The Palace at 4 a.m.</a></h4><h4 class='category_title'>Offsite Exhibition: Archaeological Museum of Mykonos </h4><p>17 May - 31 Oct 2019</p></div><div class='clearRow'></div>
  </div>
      </div>

      <div class="wrapperBackground pageContainer">
      <div class="contentWrapper">
      <hr />
      <h1 class="whitechapelFont">Coming Soon</h1>
      <div class='oneThirdMedia  content mediaBlock'><a href='https://www.whitechapelgallery.org/exhibitions/film-london-jarman-award/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/08/Jarman-Award-2019-composite-design_narrow_1170x655-370x280.jpg' alt='Jarman-Award-2019-composite-design_narrow_1170x655' class='' /></a><h4 class='category_name'><a href='https://www.whitechapelgallery.org/exhibitions/film-london-jarman-award/'>The Film London Jarman Award</a></h4><h4 class='category_title'></h4><p>26 Nov - 8 Dec 2019</p></div>	</div>
      </div>


      <div class="wrapperBackground pageContainer">
      <div class="contentWrapper">
      <hr />
      <h1 class="whitechapelFont">Past Exhibitions</h1>
      </div>
      <div id="AJAXpastExhibtions" class="contentWrapper packery relatedItemContainer">
      <div class='packeryItem'><a href='https://www.whitechapelgallery.org/exhibitions/palace-4-m/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/05/Image-3-270x172.png' alt='Image 3' class='' /></a><h4><a href='https://www.whitechapelgallery.org/exhibitions/palace-4-m/'>The Palace at 4 a.m.</a></h4><p>2019</p></div><div class='packeryItem'><a href='https://www.whitechapelgallery.org/exhibitions/senem-gokce-ogultekin-fannie-sosa-nguyen-hai-yen/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/06/IM-Photo-1-270x152.jpg' alt='Senem Gökçe Oğultekin, Dun (Home), 2017. Courtesy the artist' class='' /></a><h4><a href='https://www.whitechapelgallery.org/exhibitions/senem-gokce-ogultekin-fannie-sosa-nguyen-hai-yen/'>Senem Gökçe Oğultekin, Fannie Sosa, Nguyen Hai Yen</a></h4><p>2019</p></div><div class='packeryItem'><a href='https://www.whitechapelgallery.org/exhibitions/v-a-c-live-this-is-not-a-cinema/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2019/07/VAC_webcrop_v1_web-270x151.jpg' alt='VAC_webcrop_v1_web' class='' /></a><h4><a href='https://www.whitechapelgallery.org/exhibitions/v-a-c-live-this-is-not-a-cinema/'>V-A-C LIVE</a></h4><p>2019</p></div><div class='packeryItem'><a href='https://www.whitechapelgallery.org/exhibitions/london-art-book-fair-2019/'><img src='https://www.whitechapelgallery.org/wp-content/uploads/2018/12/Web-Thumbnail-Image_V1-270x203.jpg' alt='Web Thumbnail Image_V1' class='' /></a><h4><a href='https://www.whitechapelgallery.org/exhibitions/london-art-book-fair-2019/'>London Art Book Fair 2019</a></h4><p>2019</p></div><div class='row'><a href='https://www.whitechapelgallery.org/exhibitions/?past=2' data-wrapper='#AJAXpastExhibtions' data-masonry='true' class='more loadMore marginTop40'>MORE</a></div>	</div>
      </div>
    `;

    nockWhitechapelGallery
      .get(/exhibitions/)
      .reply(200, rawHTML);
    ;

    const events = await collect();

    expect(events.length).toBe(5);

    expect(events).toMatchObject([{
      title: `Anna Maria Maiolino - Making Love Revolutionary`,
      website: 'https://www.whitechapelgallery.org/exhibitions/anna-maria-maiolino/',
      image: 'https://www.whitechapelgallery.org/wp-content/uploads/2019/07/AMM_WebCrop_V1-570x428.jpg',
      closeDate: moment('2020/01/12', 'YYYY/MM/DD').toDate(),

      gallery: {
        name: 'Whitechapel Gallery',
      }
    }, {
      title: `Eileen Simpson and Ben White (Open Music Archive) - Once Heard Before`,
      website: 'https://www.whitechapelgallery.org/exhibitions/eileen-simpson-ben-white-open-music-archive/',
      image: 'https://www.whitechapelgallery.org/wp-content/uploads/2019/06/Eileen-Simpson-and-Ben-White-Everything-I-Have-Is-Yours-2019_web-570x428.jpg',
      closeDate: moment('2020/01/05', 'YYYY/MM/DD').toDate(),

      gallery: {
        name: 'Whitechapel Gallery',
      }
    }, {
      title: `Sense Sound/Sound Sense - Fluxus Music, Scores & Records in the Luigi Bonotto Collection`,
      website: 'https://www.whitechapelgallery.org/exhibitions/sense-sound-sound-sense/',
      image: 'https://www.whitechapelgallery.org/wp-content/uploads/2019/06/WebCrop-570x428.jpg',
      closeDate: moment('2020/02/01', 'YYYY/MM/DD').toDate(),

      gallery: {
        name: 'Whitechapel Gallery',
      },
    }, {
      title: `”la Caixa” Collection of Contemporary Art - Selected by Tom McCarthy`,
      website: 'https://www.whitechapelgallery.org/exhibitions/la-caixa-collection-tom-mccarthy/',
      image: 'https://www.whitechapelgallery.org/wp-content/uploads/2019/06/laCaixa3_WebCrop_V2-570x428.jpg',
      closeDate: moment('2020/01/05', 'YYYY/MM/DD').toDate(),

      gallery: {
        name: 'Whitechapel Gallery',
      }
    }, {
      title: `Angela Su, Tomasz Machciński, D’Ette Nogle - Artists' Film International`,
      website: 'https://www.whitechapelgallery.org/exhibitions/angela-su-tomasz-machcinski-dette-nogle/',
      image: 'https://www.whitechapelgallery.org/wp-content/uploads/2019/06/02-570x428.jpg',
      closeDate: moment('2019/11/24', 'YYYY/MM/DD').toDate(),

      gallery: {
        name: 'Whitechapel Gallery',
      },
    }]);
  });


  it('should fail gracefully when not OK', async () => {
    nockWhitechapelGallery
      .get(/exhibitions/)
      .reply(404);
    ;

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockWhitechapelGallery
      .get(/exhibitions/)
      .reply(200, 'malformed response');
    ;

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
