import moment from 'moment';
import nock from 'nock';

import {collect} from './van-gogh';

describe('collector', () => {
  let nockVanGogh: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockVanGogh = nock('https://www.vangoghmuseum.nl');
  });

  afterEach(() => {
    nockVanGogh.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
<section class="content-row grid-container teaser-row">
    <div class="grid-row ">
      <header class="teaser-row-header">
<section class="content-title-wrapper">
  <h2 id="nu-te-zien" class="page-bar-nav-title content-title" page-bar-nav-item>
    Nu te zien
  </h2>
</section>
      </header>
    </div>
    <div class="grid-row ">
<article class="teaser page-teaser">
  <push-analytics-event data-gtm-category="generic" data-gtm-action="klik teaser intern" data-gtm-label="De aardappeleters: misser of meesterwerk?">
    <a href="/nl/bezoek/tentoonstellingen/tentoonstelling-de-aardappeleters" class="teaser-link-wrapper">
        <div class="teaser-image-wrapper">
              <div style="padding-bottom: 70.512%;" class="image-wrapper teaser-image">

<picture><source data-srcset="https://micrio.vangoghmuseum.nl/iiif/yzksg/full/300,/0/default.webp?hash=Poq3ztv1awy5QFAVMbicjk4wIeQrxB3XUtvKxaQTFd0 300w,https://micrio.vangoghmuseum.nl/iiif/yzksg/full/600,/0/default.webp?hash=UYB0-MI2nlSQrAwsVB1sxxWGh8xcLKzLbPv-SNrktj4 600w,https://micrio.vangoghmuseum.nl/iiif/yzksg/full/800,/0/default.webp?hash=eLY2UG-p4yEdfBXVX-AdpBsPIeF0wI93BYBl5bC1z1E 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" type="image/webp" /><source data-srcset="https://micrio.vangoghmuseum.nl/iiif/yzksg/full/300,/0/default.jpg?hash=pOk2lOhbQUBp7c81lD9D9Qh6kYAy2glT0wjEebaM6mk 300w,https://micrio.vangoghmuseum.nl/iiif/yzksg/full/600,/0/default.jpg?hash=gv3NE00V9SlVx7FGqXBBorSzp1FnwOIOpyY15qrbmB4 600w,https://micrio.vangoghmuseum.nl/iiif/yzksg/full/800,/0/default.jpg?hash=ZhiK_58vuV1Cc1rSk-YYBfHAi6-D5QyY-k-Lip_EV0o 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" /><img alt="Vincent van Gogh, De aardappeleters, 1885" class="lazy-image not-loaded " data-src="https://micrio.vangoghmuseum.nl/iiif/yzksg/full/300,/0/default.jpg?hash=pOk2lOhbQUBp7c81lD9D9Qh6kYAy2glT0wjEebaM6mk" data-srcset="https://micrio.vangoghmuseum.nl/iiif/yzksg/full/300,/0/default.jpg?hash=pOk2lOhbQUBp7c81lD9D9Qh6kYAy2glT0wjEebaM6mk 300w,https://micrio.vangoghmuseum.nl/iiif/yzksg/full/600,/0/default.jpg?hash=gv3NE00V9SlVx7FGqXBBorSzp1FnwOIOpyY15qrbmB4 600w,https://micrio.vangoghmuseum.nl/iiif/yzksg/full/800,/0/default.jpg?hash=ZhiK_58vuV1Cc1rSk-YYBfHAi6-D5QyY-k-Lip_EV0o 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" v-bind:style="" /></picture>
              </div>
        </div>
      <h3 class="teaser-title heading-5">
        <span>De aardappeleters: misser of meesterwerk?</span>
        <svg class="icon-arrow-right-big" aria-hidden="true" focusable="false"><use xlink:href="#icon-arrow-right-big" href="#icon-arrow-right-big" ></use></svg>
      </h3>
        <p class="page-teaser-date">8 oktober 2021 - 13 februari 2022</p>

  <div class="markdown">
    <p>Hoe ontstond Van Goghs allereerste meesterwerk <em>De aardappeleters</em>? Wat wilde hij met dit schilderij bereiken en hoe ging hij te werk? Ontdek alles over <em>De aardappeleters</em> in deze najaarstentoonstelling.</p>
  </div>
    </a>
  </push-analytics-event>
</article>
<article class="teaser page-teaser">
  <push-analytics-event data-gtm-category="generic" data-gtm-action="klik teaser intern" data-gtm-label="Van Gogh inspireert: Jan&#xA0;Robert Leegte">
    <a href="/nl/bezoek/tentoonstellingen/van-gogh-inspireert-jan-robert-leegte" class="teaser-link-wrapper">
        <div class="teaser-image-wrapper">
            <div style="padding-bottom: 66.725%;" class="image-wrapper teaser-image">

<picture><source data-srcset="https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=300&amp;format=webp&amp;c=5e3fd9befbe8d7a0db49f6ddfd1b5050b580f83d57b7386c69225a9294bcaa19 300w,https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=600&amp;format=webp&amp;c=b5fcc67b7935b5bab02f315b1e935617729d92a35658b22106bc966caa9b7da4 600w,https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=800&amp;format=webp&amp;c=cbbb6ffe94d5a50768832a21f759efd3438bd77304ce586d3701d9ea589bf57a 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" type="image/webp" /><source data-srcset="https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=300&amp;c=3b4d91cc80b3ef4e583a37cd41c16fa6547940ff0a5242d22a52fc890e07aeeb 300w,https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=600&amp;c=9435d7a6e670855b9d29340c0630de96db0cb238aca0af4c23a84089c6b1c5b2 600w,https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=800&amp;c=f48dc1b734af919c34b9851f0635d2242e46986ceb7c30ee39d1cedcefcc72a6 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" /><img alt="Museumzaal met Compressed Landscapes van Jan Robert Leegte bij &#x27;Korenveld met patrijs&#x27; en &#x27;Herfstdag&#x27; van Vincent van Gogh, Foto: Michael Floor" class="lazy-image not-loaded " data-src="https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=300&amp;c=3b4d91cc80b3ef4e583a37cd41c16fa6547940ff0a5242d22a52fc890e07aeeb" data-srcset="https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=300&amp;c=3b4d91cc80b3ef4e583a37cd41c16fa6547940ff0a5242d22a52fc890e07aeeb 300w,https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=600&amp;c=9435d7a6e670855b9d29340c0630de96db0cb238aca0af4c23a84089c6b1c5b2 600w,https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=800&amp;c=f48dc1b734af919c34b9851f0635d2242e46986ceb7c30ee39d1cedcefcc72a6 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" v-bind:style="" /></picture>
            </div>
        </div>
      <h3 class="teaser-title heading-5">
        <span>Van Gogh inspireert: Jan&#xA0;Robert Leegte</span>
        <svg class="icon-arrow-right-big" aria-hidden="true" focusable="false"><use xlink:href="#icon-arrow-right-big" href="#icon-arrow-right-big" ></use></svg>
      </h3>
        <p class="page-teaser-date"> Tot en met 7 november 2021</p>
        <p class="page-teaser-time-indication"> </p>

  <div class="markdown">
    <p>De landschappen van Vincent van Gogh en de impressionisten vormen de inspiratie voor de <em>Compressed Landscapes</em> van Jan Robert Leegte (1973).</p>
  </div>
    </a>
  </push-analytics-event>
</article>
<article class="teaser page-teaser">
  <push-analytics-event data-gtm-category="generic" data-gtm-action="klik teaser intern" data-gtm-label="De vaste collectie: Van&#xA0;Goghs meesterwerken">
    <a href="/nl/bezoek/agenda-en-activiteiten/de-vaste-collectie-van-goghs-meesterwerken" class="teaser-link-wrapper">
        <div class="teaser-image-wrapper">
              <div style="padding-bottom: 131.436%;" class="image-wrapper teaser-image">

<picture><source data-srcset="https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/300,/0/default.webp?hash=zEAJO6l-2mTAaFs9pgI7DdLG-VJpDjp94gAl9nXPPAE 300w,https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/600,/0/default.webp?hash=Y4rnpMq0CJ905GHT4wvvP6WLxWaJkB_m9klg5MvWCQM 600w,https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/800,/0/default.webp?hash=GXLqjNIfX3E3v2nZ1StdI_L5VG8eCRbpvGxaAs-cMlo 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" type="image/webp" /><source data-srcset="https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/300,/0/default.jpg?hash=GX65NLbVLRjiZCNA0OWAm6DND2mceGta5RjC15UaQyw 300w,https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/600,/0/default.jpg?hash=4woIdZnKOoLmYbIgxHUB7Jkyh-EpSV8GbMm7ua3z-nQ 600w,https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/800,/0/default.jpg?hash=4W_tyEkyt8opfsX1LLSPOtE8lIGxMBWscN7bsaEXteU 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" /><img alt="Vincent van Gogh, Zonnebloemen, 1889" class="lazy-image not-loaded " data-src="https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/300,/0/default.jpg?hash=GX65NLbVLRjiZCNA0OWAm6DND2mceGta5RjC15UaQyw" data-srcset="https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/300,/0/default.jpg?hash=GX65NLbVLRjiZCNA0OWAm6DND2mceGta5RjC15UaQyw 300w,https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/600,/0/default.jpg?hash=4woIdZnKOoLmYbIgxHUB7Jkyh-EpSV8GbMm7ua3z-nQ 600w,https://micrio.vangoghmuseum.nl/iiif/TZCqF/full/800,/0/default.jpg?hash=4W_tyEkyt8opfsX1LLSPOtE8lIGxMBWscN7bsaEXteU 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" v-bind:style="" /></picture>
              </div>
        </div>
      <h3 class="teaser-title heading-5">
        <span>De vaste collectie: Van&#xA0;Goghs meesterwerken</span>
        <svg class="icon-arrow-right-big" aria-hidden="true" focusable="false"><use xlink:href="#icon-arrow-right-big" href="#icon-arrow-right-big" ></use></svg>
      </h3>
        <p class="page-teaser-date"> Altijd te zien</p>
        <p class="page-teaser-time-indication"> </p>

  <div class="markdown">
    <p>Bekijk de meesterwerken van Vincent van Gogh in het museum en laat je meevoeren in zijn ontwikkeling als kunstenaar. Stap in Van Goghs wereld en ontdek de ideeën en ambities achter zijn kunst.</p>
  </div>
    </a>
  </push-analytics-event>
</article>
    </div>
</section>
<section class="content-row grid-container teaser-row">
    <div class="grid-row columns-2">
      <header class="teaser-row-header">
<section class="content-title-wrapper">
  <h2 id="verwacht" class="page-bar-nav-title content-title" page-bar-nav-item>
    Verwacht
  </h2>
</section>
      </header>
    </div>
    <div class="grid-row columns-2">
<article class="teaser page-teaser">
  <push-analytics-event data-gtm-category="generic" data-gtm-action="klik teaser intern" data-gtm-label="Zielsverwanten Andries Bonger en Odilon Redon">
    <a href="/nl/bezoek/tentoonstellingen/andries-bonger-en-odilon-redon" class="teaser-link-wrapper">
        <div class="teaser-image-wrapper">
            <div style="padding-bottom: 75.456%;" class="image-wrapper teaser-image">
<picture><source data-srcset="https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=300&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;format=webp&amp;c=d271d2083eb0747957491646289acacf110f57d0cb4860495e144a646014fd60 300w,https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=600&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;format=webp&amp;c=da3fb3f32f5b1a163bb5e7085802c7af13c3933270b285ffde03d9bc3c38c5bf 600w,https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=800&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;format=webp&amp;c=9329c4315d774ada708020c2dbadcc5feda211d35e9c1fc4eafef0f6433607a1 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" type="image/webp" /><source data-srcset="https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=300&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=76b79d0ed9d42531564db7815327747ce47c7db55031ac0a5587d7c802d6bae0 300w,https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=600&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=a48b8eb11a43d564b07bda41e054ebe1511649c9f7f4d3f8959b312b6727f809 600w,https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=800&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=5a2d5dd80b532322f6e06248ba580eebd080238601d2c0fd670cb8b6ffc67744 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" /><img alt="Andries Bonger in zijn interieur, Vossiusstraat, Amsterdam, ca. 1908, foto op karton, particuliere collectie Nederland " class="lazy-image not-loaded " data-src="https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=300&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=76b79d0ed9d42531564db7815327747ce47c7db55031ac0a5587d7c802d6bae0" data-srcset="https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=300&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=76b79d0ed9d42531564db7815327747ce47c7db55031ac0a5587d7c802d6bae0 300w,https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=600&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=a48b8eb11a43d564b07bda41e054ebe1511649c9f7f4d3f8959b312b6727f809 600w,https://assets.vangoghmuseum.nl/2582a3e5-6360-4714-9ae3-2c5a28581064?w=800&amp;x=3&amp;y=644&amp;cropWidth=2355&amp;cropHeight=1777&amp;c=5a2d5dd80b532322f6e06248ba580eebd080238601d2c0fd670cb8b6ffc67744 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" v-bind:style="" /></picture>
            </div>
        </div>
      <h3 class="teaser-title heading-5">
        <span>Zielsverwanten Andries Bonger en Odilon Redon</span>
        <svg class="icon-arrow-right-big" aria-hidden="true" focusable="false"><use xlink:href="#icon-arrow-right-big" href="#icon-arrow-right-big" ></use></svg>
      </h3>
        <p class="page-teaser-date">Voorjaar 2022</p>

  <div class="markdown">
    <p>Tussen verzamelaar Andries Bonger en kunstenaar Odilon Redon ontstond een innige vriendschap. Deze wordt belicht aan de hand van citaten uit hun rijke correspondentie en de meer dan 30 mooiste Redons uit Bongers verzameling die in het bezit zijn van het museum.</p>
  </div>
    </a>
  </push-analytics-event>
</article>
<article class="teaser page-teaser">
  <push-analytics-event data-gtm-category="generic" data-gtm-action="klik teaser intern" data-gtm-label="Van Gogh en de olijfgaarden">
    <a href="/nl/bezoek/tentoonstellingen/van-gogh-en-de-olijfgaarden" class="teaser-link-wrapper">
        <div class="teaser-image-wrapper">
              <div style="padding-bottom: 78.103%;" class="image-wrapper teaser-image">
<picture><source data-srcset="https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/300,/0/default.webp?hash=_sQ98F4w3AAkvjKcK2GT_VAI1SdGXvuAuSjXd_TQWYc 300w,https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/600,/0/default.webp?hash=avGyNZTp4cA35xpAJcwDEjGDES0Hi3V6VLQ-LIeq4k4 600w,https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/800,/0/default.webp?hash=bIkt5cREOlbkvoEYxMiDBc4diC0Q71kBJ9B7lm1mjYw 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" type="image/webp" /><source data-srcset="https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/300,/0/default.jpg?hash=u3RAFB_CLFp-a96JHaEKX4war4cxju4WnyLF5gZIm4w 300w,https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/600,/0/default.jpg?hash=1ppGHN8JGvzqSmrmS8IWkMPYNFWk2MQBIXm0bgy00-U 600w,https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/800,/0/default.jpg?hash=_wrtmW1_dvBitIyPd9R2T2er2m81Qlf6_RO_7MBkUWg 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" /><img alt="Vincent van Gogh, Olijfgaard, 1889" class="lazy-image not-loaded " data-src="https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/300,/0/default.jpg?hash=u3RAFB_CLFp-a96JHaEKX4war4cxju4WnyLF5gZIm4w" data-srcset="https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/300,/0/default.jpg?hash=u3RAFB_CLFp-a96JHaEKX4war4cxju4WnyLF5gZIm4w 300w,https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/600,/0/default.jpg?hash=1ppGHN8JGvzqSmrmS8IWkMPYNFWk2MQBIXm0bgy00-U 600w,https://micrio.vangoghmuseum.nl/iiif/uaHTe/full/800,/0/default.jpg?hash=_wrtmW1_dvBitIyPd9R2T2er2m81Qlf6_RO_7MBkUWg 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" v-bind:style="" /></picture>
              </div>
        </div>
      <h3 class="teaser-title heading-5">
        <span>Van Gogh en de olijfgaarden</span>
        <svg class="icon-arrow-right-big" aria-hidden="true" focusable="false"><use xlink:href="#icon-arrow-right-big" href="#icon-arrow-right-big" ></use></svg>
      </h3>
        <p class="page-teaser-date">11 maart 2022 - 12 juni 2022</p>
  <div class="markdown">
    <p>Voor het eerst weer samen te zien: de meer dan tien schilderijen die Vincent van Gogh maakte van olijfgaarden. Wat vond hij zo bijzonder aan olijfbomen?</p>
  </div>
    </a>
  </push-analytics-event>
</article>
    </div>
</section>
<section class="content-row grid-container teaser-row">
    <div class="grid-row columns-2">
      <header class="teaser-row-header">
<section class="content-title-wrapper">
  <h2 id="geweest" class="page-bar-nav-title content-title" page-bar-nav-item>
    Geweest
  </h2>
</section>
      </header>
    </div>
    <div class="grid-row columns-2">
<article class="teaser page-teaser">
  <push-analytics-event data-gtm-category="generic" data-gtm-action="klik teaser intern" data-gtm-label="Overzicht tentoonstellingen geweest">
    <a href="/nl/bezoek/tentoonstellingen/overzicht-geweest" class="teaser-link-wrapper">
        <div class="teaser-image-wrapper">
            <div style="padding-bottom: 66.675%;" class="image-wrapper teaser-image">
<picture><source data-srcset="https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=300&amp;format=webp&amp;c=66b5f24eeee98e55c37182e364dd7a85dbc546fe68982da59f69854f3aafb9d0 300w,https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=600&amp;format=webp&amp;c=8b5e9b4cf84a05480be7d8dfacefd9442ab677482266a0a736ff4d0bca7c766f 600w,https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=800&amp;format=webp&amp;c=286ed99c0492d595b447ac75bb317a59a9ef1bbbac7639abd0f8223d956a0a5c 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" type="image/webp" /><source data-srcset="https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=300&amp;c=e1cfd5517199a3ab105bab8706d056f3c4afc9464f734a9692301a46bbb5712b 300w,https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=600&amp;c=4f538a42e243af8dffb993ca3aafad8fbbfd024703d3ea7fb728fd2687274a0c 600w,https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=800&amp;c=cb8dc613c39ecb4443377462539b004fc760f70ed9e9aa021d7b03487443067d 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" /><img alt="In de tentoonstelling vergelijkt een vrouw de briefschets van Vincent van Gogh met het het schilderij Veld met een ploeger uit 1889. Foto: Tomek Dersu Aaron" class="lazy-image not-loaded " data-src="https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=300&amp;c=e1cfd5517199a3ab105bab8706d056f3c4afc9464f734a9692301a46bbb5712b" data-srcset="https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=300&amp;c=e1cfd5517199a3ab105bab8706d056f3c4afc9464f734a9692301a46bbb5712b 300w,https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=600&amp;c=4f538a42e243af8dffb993ca3aafad8fbbfd024703d3ea7fb728fd2687274a0c 600w,https://assets.vangoghmuseum.nl/929f208e-2158-405e-bc4e-8efc1e7a0da4?w=800&amp;c=cb8dc613c39ecb4443377462539b004fc760f70ed9e9aa021d7b03487443067d 800w" sizes="(min-width: 120em) 530px, (min-width: 64em) 30vw, (min-width: 45em) 45vw, 95vw" v-bind:style="" /></picture>
            </div>
        </div>
      <h3 class="teaser-title heading-5">
        <span>Overzicht tentoonstellingen geweest</span>
        <svg class="icon-arrow-right-big" aria-hidden="true" focusable="false"><use xlink:href="#icon-arrow-right-big" href="#icon-arrow-right-big" ></use></svg>
      </h3>
  <div class="markdown">
    <p>Overzicht van tentoonstellingen die in het Van Gogh Museum zijn geweest sinds 1999.</p>
  </div>
    </a>
  </push-analytics-event>
</article>
    </div>
</section>
    `;

    nockVanGogh
      .get(/tentoonstellingen/)
      .reply(200, rawHTML);

    const events = await collect();

    expect(events).toMatchObject([{
      title: 'Van Gogh inspireert: Jan Robert Leegte',
      closeDate: moment('2021-11-07').toDate(),
      gallery: {
        name: 'Van Gogh Museum',
        address: 'Museumplein 6, Amsterdam, 1071 DJ',
        website: 'https://www.vangoghmuseum.nl/nl/'
      },
      website: 'https://www.vangoghmuseum.nl/nl/bezoek/tentoonstellingen/van-gogh-inspireert-jan-robert-leegte',
      image: 'https://assets.vangoghmuseum.nl/3db0d81b-8f44-438e-ae49-549267c687b2?w=300&c=3b4d91cc80b3ef4e583a37cd41c16fa6547940ff0a5242d22a52fc890e07aeeb'
    },
    {
      title: 'De aardappeleters: misser of meesterwerk?',
      closeDate: moment('2022-02-13').toDate(),
      gallery: {
        name: 'Van Gogh Museum',
        address: 'Museumplein 6, Amsterdam, 1071 DJ',
        website: 'https://www.vangoghmuseum.nl/nl/'
      },
      website: 'https://www.vangoghmuseum.nl/nl/bezoek/tentoonstellingen/tentoonstelling-de-aardappeleters',
      image: 'https://micrio.vangoghmuseum.nl/iiif/yzksg/full/300,/0/default.jpg?hash=pOk2lOhbQUBp7c81lD9D9Qh6kYAy2glT0wjEebaM6mk'
    }])
  });

  it('should fail gracefully when not OK', async () => {
    nockVanGogh
      .get(/tentoonstellingen/)
      .reply(404);

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockVanGogh
      .get(/tentoonstellingen/)
      .reply(200, 'malformed response');

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
