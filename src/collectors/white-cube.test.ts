import moment from 'moment';
import nock from 'nock';

import {collect} from './white-cube';

describe('collector', () => {
  let nockWhiteCube: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockWhiteCube = nock('https://whitecube.com');
  });

  afterEach(() => {
    nockWhiteCube.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
<header class="links-v-default-title-hide">
<div class="container"><a href="https://whitecube.com/" class=
"logo" title="White Cube"><img src=
"https://whitecube.com/skins/whitecube/assets/img/white_cube_logo.svg"
alt=""></a>
<ul class="enumenu_ul main-menu">
<li><a href="https://whitecube.com/" title="Home">Home</a></li>
<li><a href="https://whitecube.com/artists" title=
"Artists">Artists</a></li>
<li><a href="https://whitecube.com/exhibitions" title=
"Exhibitions">Exhibitions</a></li>
<li><a href="https://whitecube.com/news" title="News">News</a></li>
<li><a href="https://whitecube.com/channel" title=
"Channel">Channel</a></li>
<li><a href="https://whitecube.com/contact" title=
"Contact">Contact</a></li>
<li><a href="https://whitecube.com/shop" title="Shop">Shop</a></li>
<li><form class="keyword-search-menu" method="post" action=
"https://whitecube.com/search/search"><input autocomplete="off"
type="text" id="keywords" name="keywords" placeholder="Search">
<input class="submit-search" type="submit" value="Search"></form>
</li>
</ul>
<div class="search-form"></div>
</div>
<div class="container line-div">
<h3>Exhibitions</h3>
<hr></div>
<ul class="tab-listingright mobile-show"></ul>
<div class="container fixed-on-scroll">
<ul data-tester="" class="tab-listing">
<li class="active"><a href=
"https://whitecube.com/exhibitions/exhibition/sort/current" title=
"Current">Current</a></li>
<li class=""><a href=
"https://whitecube.com/exhibitions/exhibition/sort/future" title=
"Future">Future</a></li>
<li class=""><a href=
"https://whitecube.com/exhibitions/exhibition/sort/past" title=
"Past">Past</a></li>
</ul>
<ul class="tab-listingright hide-desktop"></ul>
</div>
<div class="half-section exhibitions-list">
<div class="container">
<div class="row">
<div class="col col-6" data-exclude-item="">
<figure><a href=
"https://whitecube.com/exhibitions/exhibition/the_real_three_propositions_bermondsey_2019"
title="" class="img-thumb"><img src=
"/media/w800/Artists/the-real-three-propositions-bermondsey-2019.jpg"
alt="" title=
"Peter Dreher Des Lawrence and Konrad Klapheck-The Real Three Propositions-White Cube Bermondsey"></a>
<figcaption><a href=
"https://whitecube.com/exhibitions/exhibition/the_real_three_propositions_bermondsey_2019"
title="" class="title-hover">
<h4><em>The Real: Three Propositions</em></h4>
<h5>10 July 2019 – 25 August 2019<br>
White Cube Bermondsey</h5>
</a></figcaption>
</figure>
</div>
<div class="col col-6" data-exclude-item="">
<figure><a href=
"https://whitecube.com/exhibitions/exhibition/jeff_wall_masons_yards_2019"
title="" class="img-thumb"><img src=
"/media/w800/jeff-wall-white-cube-masons-yard-2019-13.jpg" alt=""
title="Jeff Wall-White Cube Masons Yard-2019 "></a>
<figcaption><a href=
"https://whitecube.com/exhibitions/exhibition/jeff_wall_masons_yards_2019"
title="" class="title-hover">
<h4>Jeff Wall<br></h4>
<h5>28 June 2019 – 7 September 2019<br>
White Cube Mason's Yard</h5>
</a></figcaption>
</figure>
</div>
<div class="col col-6" data-exclude-item="">
<figure><a href=
"https://whitecube.com/exhibitions/exhibition/harland_miller_hong_kong_2019"
title="" class="img-thumb"><img src=
"/media/w800/harland-miller-hong-kong-2019-3.jpg" alt="" title=
" Harland Miller - Hong Kong - 2019"></a>
<figcaption><a href=
"https://whitecube.com/exhibitions/exhibition/harland_miller_hong_kong_2019"
title="" class="title-hover">
<h4>Harland Miller<br></h4>
<h5>31 May 2019 – 24 August 2019<br>
White Cube Hong Kong</h5>
</a></figcaption>
</figure>
</div>
<div class="col col-6" data-exclude-item="">
<figure><a href=
"https://whitecube.com/exhibitions/exhibition/harland_miller_hong_kong_2019"
title="" class="img-thumb"><img src=
"/media/w800/harland-miller-hong-kong-2019-3.jpg" alt="" title=
" Harland Miller - Hong Kong - 2019"></a>
<figcaption><a href=
"https://whitecube.com/exhibitions/exhibition/harland_miller_hong_kong_2019"
title="" class="title-hover">
<h4>Harland Miller<br></h4>
<h5>no location and no date</h5>
</a></figcaption>
</figure>
</div>
<div class="col col-6 hidden hidden-fade-in" data-new-field=""
data-exhibitions-template="">
<figure><a href="" title="" class="img-thumb"><img src=""></a>
<figcaption><a href="" title="" class=
"title-hover"></a></figcaption>
</figure>
</div>
</div>
</div>
</div>
<div class="container">
<hr></div>
<footer>
<div class="container">
<div class="row">
<div class="col col-4">
<h4>White Cube Bermondsey</h4>
<address>
<p>144 – 152 Bermondsey Street&nbsp;<br>
London SE1 3TQ</p>
</address>
</div>
<div class="col col-4">
<h4>White Cube Mason's Yard</h4>
<address>
<p>25 – 26 Mason's Yard&nbsp;<br>
London SW1Y 6BU</p>
<p>&nbsp;</p>
</address>
</div>
<div class="col col-4">
<h4>White Cube Hong Kong</h4>
<address>
<p>50 Connaught Road Central&nbsp;<br>
Hong Kong</p>
</address>
</div>
<div class="col col-4">
<ul class="social-ul">
<li><a href="https://twitter.com/_whitecube" target="_blank" title=
"Follow White Cube on Twitter">TWITTER</a></li>
<li><a href="https://www.instagram.com/whitecube/" target="_blank"
title="Follow White Cube on Instagram">INSTAGRAM</a></li>
<li><a href="https://www.facebook.com/whitecubegalleries" target=
"_blank" title="Like White Cube on Facebook">FACEBOOK</a></li>
<li><a href=
"https://whitecube.qi-cms.com/media/_file/wechat-qr-code.pdf"
title="WECHAT" target="_blank">WECHAT</a></li>
<li><a href="https://www.youtube.com/c/WhiteCubeOfficial" target=
"_blank" title="Subscribe White Cube on YouTube">YOUTUBE</a></li>
</ul>
</div>
</div>
<div class="row">
<div class="col col-4">
<h6 id="copywrite">© 2019 WHITE CUBE</h6>
</div>
<div class="col col-6">
<ul class="footer-ul">
<li><a href=
"https://whitecube.com/contact/contact">Contact</a></li>
<li><a href=
"https://whitecube.com/contact/contact/#newsletter">Newsletter</a></li>
<li><a href="https://whitecube.com/footer/privacy-and-cookies"
title="Privacy and Cookies">Privacy and Cookies</a></li>
<li><a href="https://whitecube.com/footer/accessibility" title=
"Accessibility">Accessibility</a></li>
</ul>
</div>
<div class="col-2"><a href="#" class="top-to-bottom" title=
"top to bottom"><img src=
"https://whitecube.com/skins/whitecube/assets/img/top-to-bottom.svg"
alt="top to bottom"> <img src=
"https://whitecube.com/skins/whitecube/assets/img/top-to-bottom-hover.svg"
alt="top to bottom"></a></div>
</div>
</div>
</footer>
</body>
</html>
    `;

    nockWhiteCube
      .get(/exhibitions.exhibition.sort.current/)
      .reply(200, rawHTML);
    ;

    const events = await collect();

    expect(events.length).toBe(2);

    expect(events).toMatchObject([{
      title: 'Jeff Wall',
      openDate: moment('2019-06-28').toDate(),
      closeDate: moment('2019-09-07').toDate(),
      website: 'https://whitecube.com/exhibitions/exhibition/jeff_wall_masons_yards_2019',
      image: 'https://whitecube.com/media/w800/jeff-wall-white-cube-masons-yard-2019-13.jpg',

      gallery: {
        name: `White Cube Mason's Yard`,
      },
    },{
      title: 'The Real: Three Propositions',
      openDate: moment('2019-07-10').toDate(),
      closeDate: moment('2019-08-25').toDate(),
      website: 'https://whitecube.com/exhibitions/exhibition/the_real_three_propositions_bermondsey_2019',
      image: 'https://whitecube.com/media/w800/Artists/the-real-three-propositions-bermondsey-2019.jpg',

      gallery: {
        name: 'White Cube Bermondsey',
      },
    }]);
  });


  it('should fail gracefully when not OK', async () => {
    nockWhiteCube
      .get(/exhibitions.exhibition.sort.current/)
      .reply(404);
    ;

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockWhiteCube
      .get(/exhibitions.exhibition.sort.current/)
      .reply(200, 'malformed response');
    ;

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
