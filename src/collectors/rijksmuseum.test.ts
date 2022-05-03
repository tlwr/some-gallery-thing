import moment from 'moment';
import nock from 'nock';

import {collect} from './rijksmuseum';

describe('collector', () => {
  let nockRijksmuseum: nock.Scope;

  beforeEach(() => {
    nock.cleanAll();

    nockRijksmuseum = nock('https://www.rijksmuseum.nl');
  });

  afterEach(() => {
    nockRijksmuseum.done();

    nock.cleanAll();
  });

  it('should scrape and parse events correctly', async () => {
    const rawHTML = `
<div class="whatson-results">
    <div class="whatson-filtered">
<a href="/nl/zien-en-doen/tentoonstellingen/vergeet-me-niet" class="fit-parent object-fit-container cover block-link">
<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=211&amp;h=694&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=a84067904218b6251c2100190ffc5255a5fd8ad5ee25264f987313199ed4b700 211w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=250&amp;h=823&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=24d82e8ee6f709a79737a6a6ca002f4b9c1410b12141de4bcc7e32a79c236275 250w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=273&amp;h=899&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=79d05f06199e6ee0b0991a581ed19e6044c1ec1cd0935042e50fe488a45d036a 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=211&amp;h=694&amp;fx=1203&amp;fy=1694&amp;c=8e92deb275e6633f81b97bb8f1ddcc3cde0b57c4013441b88883d7d2e11a221c 211w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=250&amp;h=823&amp;fx=1203&amp;fy=1694&amp;c=ca715f6033e51a16d7b999d6d93406a3b355e45e7d763eacbdc874b0eea635e4 250w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=273&amp;h=899&amp;fx=1203&amp;fy=1694&amp;c=b915601441116bc32bc1326f2bf0d3b3ac4880ad88454391d2523d11da50c7af 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=254&amp;h=513&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=88917f6234d780f1b186dedf648e5e127b51a986fc6321198e595b702e575d20 254w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=475&amp;h=959&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=1825a978aad3aa0ecd2fd54f1294c3dc027bec981446887abf74d13b3339bad8 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=254&amp;h=513&amp;fx=1203&amp;fy=1694&amp;c=47caf6115c847c2a1da5dad94ea97fa61426d6ffdaa29a19c21eba796c6b85a5 254w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=475&amp;h=959&amp;fx=1203&amp;fy=1694&amp;c=10095a9a7e2827ae03fb4a903a70bf2fa0503c0722f63f93099a6c1da656fe22 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=337&amp;h=383&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=97e6a977bd222ff5ae6a040810ccbce5125c7b80bb4f47972a3cf339169c1e83 337w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=475&amp;h=541&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=5b61e2357a0b798aa67bbd922b9522af0b24421dbd74667e91bcee038f615c34 475w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=675&amp;h=768&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=e33d0bdfc224b40a621803d831c72bda8966f425b824c43b3cd8ec754b72e390 675w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=950&amp;h=1082&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=602facda84c59ad7027ffad95e5b63008e3896fc29fb00c6c24d7d32091152a3 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=337&amp;h=383&amp;fx=1203&amp;fy=1694&amp;c=13815dab86f0418d4cb86cc07d5dbaba600039f45a65f10723dedf5254b941a7 337w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=475&amp;h=541&amp;fx=1203&amp;fy=1694&amp;c=6546220ef679a897f770e3e7437a7bbd5eafbdf4dca65e868baddfa5e69f0e7a 475w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=675&amp;h=768&amp;fx=1203&amp;fy=1694&amp;c=c9a04762c1b6b34099cd3845c5cfa2f52004acc8a0694716c5c482996adfea27 675w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=950&amp;h=1082&amp;fx=1203&amp;fy=1694&amp;c=fe187714bb2fd33c82a19bd1188bc2713a4f16be136e93cfb41a51bfa5233e77 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=475&amp;h=369&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=5f18993fc33adf567ebb25c8bcb5b1367f192fe6ba17dec8a23996d09df46835 475w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=633&amp;h=491&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=31b5daab3b9ed746669063b58c4a182a3c08277b24fd7d0b8fde0b6358f84af1 633w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=950&amp;h=738&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=d4ecb82e89f1613afe814d9884e251adfc6392d0c26af038ff41007d17b73337 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=475&amp;h=369&amp;fx=1203&amp;fy=1694&amp;c=d648439337d2ef66bfccf74e113f2e661b7cd077329f46645f563c59ac2998f0 475w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=633&amp;h=491&amp;fx=1203&amp;fy=1694&amp;c=91e0fb548f07c4db3d94a68c8c91dc8f4fb0f9d01062215b876304c9458199be 633w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=950&amp;h=738&amp;fx=1203&amp;fy=1694&amp;c=393d54b92ee3d79f3496eb5be9df4e042b8d12fb612d781adc3b3d7fedd8d4e2 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=320&amp;h=695&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=b8a337adf78e24edf6e895f6f89135551519ff23d1131f7f3289d1f675fd864b 320w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=380&amp;h=826&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=9f1776c045e94290db50a8b105720ddca6d0ade69ad61da5c7685191b46c1876 380w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=415&amp;h=902&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=a45334ebd23e64cee18e2997132c00fd458da53c3707e4a7f2470a48e1828c23 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=320&amp;h=695&amp;fx=1203&amp;fy=1694&amp;c=03ed0153b4a8638589ae02bc25ce51689f3be4c81a2f5185692c3c0a5346f83e 320w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=380&amp;h=826&amp;fx=1203&amp;fy=1694&amp;c=6b392c3be8367a63e7900d3dc7d28fd176483f5f2f10571f1dee37087c468c25 380w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=415&amp;h=902&amp;fx=1203&amp;fy=1694&amp;c=08659ec8c82d7012d400c37cd2a6fd249ec577a5132b752f97562e74656d3d6e 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=385&amp;h=513&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=13d6ea611099c2ff75118371d49b35b0156f61b7e3409d735edc4c7f44da325f 385w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=960&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=d0153e9a58deeb30e26e21da7ee930dbcb916cba31ad98afa49964b208a55b0e 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=385&amp;h=513&amp;fx=1203&amp;fy=1694&amp;c=8d531a50cec9c3747854a5d8ca31f285548692ceeeeb46702f30825b90d90fd9 385w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=960&amp;fx=1203&amp;fy=1694&amp;c=c2afc6f07622e8f86ae3b12e368ccafea42cfb1ad8d8babf1f4894969f22762d 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=512&amp;h=384&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=a086e81366713808f60707f64d4da838003cc677c0dad35345b40353233cdde8 512w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=541&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=18887e42741ed0293be910c13d8e4eeca16a3c716d96604d07f48ede16292182 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1024&amp;h=769&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=c7ac1242f488c755ed50678585b518caa321bfbd73ba7a4e026a47275c26d2dc 1024w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=1082&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=c8bf53ecdd375d778bd63428a014b0099657111f19bd6968f71ec217f21d66b9 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=512&amp;h=384&amp;fx=1203&amp;fy=1694&amp;c=295a2a86407133a19cdf820655e0408eb2b31db38afbc866283837a2e018487a 512w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=541&amp;fx=1203&amp;fy=1694&amp;c=ffdbfe2135a010268cfa7f2952d1e231d364d4d863fc84b63cc1c6b8f6e58637 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1024&amp;h=769&amp;fx=1203&amp;fy=1694&amp;c=b6f94397002096308760ed4204399464f2d881ebe13ba6586659befda512302a 1024w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=1082&amp;fx=1203&amp;fy=1694&amp;c=43c098ee0f3dd5749fcc2d4cabbc3fcdec5970c7b8eb646946625061cf31ef4d 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=369&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=5c5f9e6e6de30f70658fce69f362090adb4c8c29390bc102c6b59d018e6a5851 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=960&amp;h=492&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=116153c316fc915ef33c3be67783200a5b8577a0067804cc8334c8b10af1ae0a 960w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=738&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=01f9040761001f89702df40012c3472cd2f79a000da7b47f7082ccc08e22926d 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=369&amp;fx=1203&amp;fy=1694&amp;c=2978c607ed96193fc2cc61375bdf3dd3c4b9a4f55f3dc8fbc0b2a25a65c33f2d 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=960&amp;h=492&amp;fx=1203&amp;fy=1694&amp;c=eeb972564423e83be70da11dac0dfa06e3604254bcc7790d4bc980d382e2933d 960w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=738&amp;fx=1203&amp;fy=1694&amp;c=af7f5971336172b5e040ca5f730ba9753e07bfd20f86eb411efa16b8f4310d2c 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=320&amp;h=459&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=8888efbd5f7e18157006c563fd166021f051dfbe78065cb6920d352bbb284b6d 320w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=380&amp;h=545&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=53ef29852b1d7e1d757c9af346025f3769c58a249820f445a941097e1c9f3d27 380w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=415&amp;h=595&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=0616b9c7500cb8687f875125ff3c71ff9e2aa12014fda29e9139fbe858915655 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=320&amp;h=459&amp;fx=1203&amp;fy=1694&amp;c=e8fd362272f5fa81df01af50816f0506d49ec9d37aa6aadec1e59c1dfd73de12 320w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=380&amp;h=545&amp;fx=1203&amp;fy=1694&amp;c=01ad1fab2c0324f7f214c97e3d90dacac52508a1f4ea9edab8fa352fd5a25148 380w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=415&amp;h=595&amp;fx=1203&amp;fy=1694&amp;c=c080a76b4dab7f5378239de9fe89e50fbfed33ff789007eb18b6d0eecbf22238 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=385&amp;h=338&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=1626d721d24e4e55b9d40541f906859c7f54eb71ef30ada5b072eabd236244ee 385w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=633&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=0e8a055890defc1d970e2166a01f66ff0d109e3a59e4eb76daf384c11900acfe 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=385&amp;h=338&amp;fx=1203&amp;fy=1694&amp;c=d3165b9b4027c542d7a8dc8f8ca92db55cfc251261d7126208d736f297488db1 385w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=633&amp;fx=1203&amp;fy=1694&amp;c=cb0d560d9b8a1b309ec8fb064c4fbaef70b61d5f31a3462a5bc94418a3a646e7 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=512&amp;h=254&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=e680b64fa4c1d25e4e751a623038728061d9bb645dc4fa7c1a9fa121b74f0182 512w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=357&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=710de905c81a4bd2a26f1a42d4b581e13fdb560703ce5f620655dff83b4f4ee7 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1024&amp;h=508&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=9cf99b93bc9aa339d6827807b4d0b8a8f9511d25589362d2a25432a7065ef7e4 1024w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=714&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=72517cdd61a750151a07f633132059d2b7a65c55858f9fb4b333ac3f7e1264c0 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=512&amp;h=254&amp;fx=1203&amp;fy=1694&amp;c=04b191890c60c5509a420f75e348de1c3e1693ec992ef2a43754696b2eb8ce49 512w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=357&amp;fx=1203&amp;fy=1694&amp;c=75c6bc1eedd8c999ec844be82709f1b73866e589faa5a9609e175f416b786938 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1024&amp;h=508&amp;fx=1203&amp;fy=1694&amp;c=cdbee70a009b21d8c8971ec5d30f2f50775229e88a1bdfa10fcb0ccca2a11223 1024w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=714&amp;fx=1203&amp;fy=1694&amp;c=b9a7a2d0a78c515d7e2c2ab672c3c2a9515b23f5f814bef2d5ca89ff0a2d3ce8 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=243&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=a2aef0818deac983c0e011958570e8c028437e923caf84bafa60c0377f642792 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=960&amp;h=324&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=785258bc902a70ac7bd86f564ced11f0b10d27029dbbd9c0169d49fc3aeac53d 960w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=487&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=574d2f0175519912138cf9b32c77a85440f3bee642db20ea05d4ac2f1ed157a3 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=720&amp;h=243&amp;fx=1203&amp;fy=1694&amp;c=d8b8b3f9b159ab5e1a38df40fabfdbbd7f24e17db1b82b77830bf334d85df579 720w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=960&amp;h=324&amp;fx=1203&amp;fy=1694&amp;c=a4d71b5cf52e2e033cc5b4e950502cfb659eea2e4fbe54432780db6f157599ef 960w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=487&amp;fx=1203&amp;fy=1694&amp;c=7e01597843eb6ccaec0ed84250f52208179719d7c373dedcd3110902d3b5297b 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=640&amp;h=695&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=dc7236162ef15da8d82e16385a84bf9cb752580646a151aaf307cb19eb5c72dd 640w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=760&amp;h=826&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=07d463e901ff376d67f085e2bc556f84dfe87e35f86d18dee7c910201e26e102 760w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=830&amp;h=902&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=663b12b46d99ed3f62b5a8831f878f13cce1b53ff557d00ef10e063a82ab114a 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=640&amp;h=695&amp;fx=1203&amp;fy=1694&amp;c=b5d9c41e90cb3d60313218f07b14e38ba5c1b942442422613392a35f0dda6768 640w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=760&amp;h=826&amp;fx=1203&amp;fy=1694&amp;c=82783395b498c23ec1b8886d99b33ce96c945f161a15a6391efec40b21cdb854 760w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=830&amp;h=902&amp;fx=1203&amp;fy=1694&amp;c=2817c380877f78f2f499fb3bd40a0c7480acde34155ef469fbc4d5103f6bd0da 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=770&amp;h=513&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=9b3b60ada2018c0b7dae313b85fa19f5237dfab89a2d5724e0782d847610b205 770w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=960&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=0cb2e1489bf76bb33513fa13f511e278c8ac8fea87fad8b33fa9c239806da21e 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=770&amp;h=513&amp;fx=1203&amp;fy=1694&amp;c=8cc9a582b433969617e0871e3023e59a4d3761268bda05ef140d4e0a1495d28d 770w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=960&amp;fx=1203&amp;fy=1694&amp;c=6ece43b6bff778cbdec7935826ef59c686927f8ba399b9706eb4c55c150b546c 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1024&amp;h=384&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=7099d4a77a72ced9649fde9aea6126e893567a094379539c5239ed29d8ba2371 1024w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=541&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=c940129663ee1871dd3bca878e82b0f8d8ebf4100e030a03a2ba179b0e86f88d 1440w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=2048&amp;h=769&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=8f4562849f437f3d9cd2fa49ed5ab04d1a816d8a8a02b3ebd4e2ccc7a9f4dc95 2048w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=2880&amp;h=1082&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=69cb75f6ae6f6cb9f22ba1468b7a2418aaa4fb4d4b40e2055259d4c75b7af3b6 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1024&amp;h=384&amp;fx=1203&amp;fy=1694&amp;c=e44191a0366d1c97f990c46cd4356e34b213a2720d55a15b24ae2b04598b1d50 1024w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=541&amp;fx=1203&amp;fy=1694&amp;c=13a88a31c7e0a08a1a221e544f6fc3f1991a713c2b7d6cc300fa37397b1024ff 1440w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=2048&amp;h=769&amp;fx=1203&amp;fy=1694&amp;c=cff1c2a9856a634b4782538c89e3cc262618be4ce5779bd415fd64de88116a42 2048w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=2880&amp;h=1082&amp;fx=1203&amp;fy=1694&amp;c=5106482407d4f46d5ebefa5c0d31151b247262930d049290e5debb8740d0986f 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=369&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=84bbe8fc3b79ad91bc717263e4e5dbc354df179054486f8423ad3999053df84e 1440w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1920&amp;h=492&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=4afde4deb112cedb32707e47d17df36d313059280f017e01829256e334c25846 1920w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=2880&amp;h=738&amp;fx=1203&amp;fy=1694&amp;format=webp&amp;c=67c82eb713ebaeebc4937b869bf9d00f43151f399a0211272ffbe799db1b8590 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1440&amp;h=369&amp;fx=1203&amp;fy=1694&amp;c=8bdf23a7eb90d023c747a031fd6840e8ac7b573eab53c56728c22474579e0400 1440w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=1920&amp;h=492&amp;fx=1203&amp;fy=1694&amp;c=21b56dfae3d64848ac85883503954b1a59d9fd84a3db02a109e093a4f71a738e 1920w,https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=2880&amp;h=738&amp;fx=1203&amp;fy=1694&amp;c=1796f6c31a7a6b8d898d395e1a90838d921641c8318151037d696fc0bbac571e 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=633&amp;h=540&amp;fx=1203&amp;fy=1694&amp;c=e2e69ef09cf3fa873ea46962a06c800cb844a176b46e6f3518becc15437d9691" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=65&amp;fx=1203&amp;fy=1694&amp;c=36535a7f1414ccc38a96af71b94e0cb43c44a6fbcbd51f1fcb4344f8ae4c1c75" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=40&amp;fx=1203&amp;fy=1694&amp;c=0f71e7f6da05e4ff5b69b3472c64442670a9075ad8ffb8eedbe26aee11fe21d7" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=22&amp;fx=1203&amp;fy=1694&amp;c=a957be4bef658806eb93ad68ab73ada83f7ac8a158468f8f514c983a9f3970fd" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=15&amp;fx=1203&amp;fy=1694&amp;c=0db67bd7a399b0c5b0dff07a55e331070d9521649ad92eff253ac291e2d40054" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=43&amp;fx=1203&amp;fy=1694&amp;c=651f9faaeb62de3a50184dcfe32fc34a8b3c9ef839c4552487a06e784ac53b0e" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=26&amp;fx=1203&amp;fy=1694&amp;c=b76e30b3a8c97b9d399a71887eaeffa38929dddae12322bfa3bc78629920b0b0" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=15&amp;fx=1203&amp;fy=1694&amp;c=0db67bd7a399b0c5b0dff07a55e331070d9521649ad92eff253ac291e2d40054" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=10&amp;fx=1203&amp;fy=1694&amp;c=99204a421d38a07d137f9f684ecff48511f4adcfca4976196cca577639ec31f7" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=28&amp;fx=1203&amp;fy=1694&amp;c=379a980d0521a0178ce67634f56e2c86779e446f046a772fef0d023599fd07e6" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=17&amp;fx=1203&amp;fy=1694&amp;c=abab0a05acf096eda79700846b841a3924cc2bd42d18375f9600c886e8cfeb03" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=9&amp;fx=1203&amp;fy=1694&amp;c=3f5766a392cf7e300151a1ebc40214823f1cd8194cc1b0118d82be6944565916" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=6&amp;fx=1203&amp;fy=1694&amp;c=ca8b6fe9e3c7d12ebba1eeff4feef12c0a8f8ed90757c97a4d196655d8cf5533" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=21&amp;fx=1203&amp;fy=1694&amp;c=4dc6a96aa8772d1ee18023a11a0dcb05622cd40452d2d1726d192e951b221c61" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=13&amp;fx=1203&amp;fy=1694&amp;c=60a0ca59ab06a28a196140b2aa7fddbf1f4423a1aaf49af0004e0c7958be82b6" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=7&amp;fx=1203&amp;fy=1694&amp;c=0fa8d78f29309a89f32766acc20ea9d34b66e3e3c90b07ea1fd6576b84664d3b" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=5&amp;fx=1203&amp;fy=1694&amp;c=ab69bab4c210c8cffdf90eb321f18326d956e5a65f7bb7d9deb62053545590ce" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=20&amp;h=11&amp;fx=1203&amp;fy=1694&amp;c=61b4f1b987936d084cdf7249fe4b03195fe98ea400c2137170480a4a7b95f5e5" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Vergeet me niet
        </span>
      </h3>

        <p class="block-content-subtitle">
          t/m 16 januari 2022
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">
<a href="/nl/zien-en-doen/tentoonstellingen/henk-wildschut" class="fit-parent object-fit-container cover block-link">
<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=211&amp;h=694&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=9d838ba33160c5c9e0cdae54ba3137284bd89a67419503025edb9f9e6f3b503b 211w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=250&amp;h=823&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=465733c5c5d608d2ae35530debc7840d5c580fa3f0aa4e8b797788abcfec56fb 250w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=273&amp;h=899&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=8f6d5a802506bdfa4d0584a17a9071a42a2629775c2b012b98290cf5e4fb10a8 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=211&amp;h=694&amp;fx=4492&amp;fy=3366&amp;c=b04f4bb8af7ae111d31648c69627463756abe621e8793d2c4fcbe635187ae510 211w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=250&amp;h=823&amp;fx=4492&amp;fy=3366&amp;c=4ff6afc0f34b42f516c8e749b36efc1d0a5f4e39968200c9c3feeae1a5905ad4 250w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=273&amp;h=899&amp;fx=4492&amp;fy=3366&amp;c=8211b02fdb0bc773583a87eadc5211847092cbb6e05c3a54c4c0bd1d92926f1d 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=254&amp;h=513&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=ce1df6574a8c59761eb78ede98729ca374803fcb8df69e3fd15aba7fd194ed2b 254w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=475&amp;h=959&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=010c929e84a913c9a19d6627633f14c44e79e5652a2f5c08c36d14f6680e8a36 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=254&amp;h=513&amp;fx=4492&amp;fy=3366&amp;c=ad4d3e92c03b3c4b87df21a2bf6387f435c2013e439aa8a6b7b8fc2d60fb5d6f 254w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=475&amp;h=959&amp;fx=4492&amp;fy=3366&amp;c=a10f1b28246598ced8696c44fc2b34fa223a2fedee7a8b6c1cc0491516acfb9a 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=337&amp;h=383&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=e52d5cf131fec94fb16762c086874d0de0a0a8adf7ccaaf5eba7f2384f24c295 337w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=475&amp;h=541&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=f541cc7b2cc70c7dd0e6565dbf34e81abc32dc89b244f22bda9c170196ebdb7e 475w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=675&amp;h=768&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=9894b9e22477fe3323bd6d78d56550ec12f475a82f798f4a23c7a3e84f39f85d 675w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=950&amp;h=1082&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=d73092925e4c8ee92d1bbfb6f07432a7cdb69790a61873c03371d9953b73a06a 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=337&amp;h=383&amp;fx=4492&amp;fy=3366&amp;c=0b62d0221ad0c7daa8ebf77592688362ecd793935fe81aee79c051cf785993cf 337w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=475&amp;h=541&amp;fx=4492&amp;fy=3366&amp;c=dae55e082edddd7ccd615dbbdae3129873bb4646aa880a99dfe023fb1c3771aa 475w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=675&amp;h=768&amp;fx=4492&amp;fy=3366&amp;c=5b1135b3a922f93df1c90c79533cf314dda26b72cdb3803bd39bfbdf029fbc31 675w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=950&amp;h=1082&amp;fx=4492&amp;fy=3366&amp;c=111bb8eb934115c7570ad10337da12b41420705e8f7fbdbb7467cf7a56f84e88 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=475&amp;h=369&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=8f2d3c0b861a036f7e831d841ad785582f61fbaea8cd399fd812044452cef7ee 475w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=633&amp;h=491&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=5f4cc0722f182b3ebfc57d351b3bde3daae49a9d5b7d03c11911616e74655a10 633w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=950&amp;h=738&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=d931807ba5d84507190770dfba5f443d1d8203d92b849edfa041e051946bda67 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=475&amp;h=369&amp;fx=4492&amp;fy=3366&amp;c=446b4e18ee173440d0d43570612ed79b6faafd2274ab6802a04f3f1cd77ce610 475w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=633&amp;h=491&amp;fx=4492&amp;fy=3366&amp;c=46bdc89f9e9d74e77bcc4a78ce8152e9451865a1fbd45c4c9c0711e750628ce6 633w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=950&amp;h=738&amp;fx=4492&amp;fy=3366&amp;c=75ac67b4031bf3f45ba1056ac2ae9962f2666474702f50f8b04928dee5f86f36 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=320&amp;h=695&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=4bf78948ef2c702480425d85e95f2aef70de14bd834da35763d25ce115b72519 320w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=380&amp;h=826&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=c6fcd1d08fe27923b81906bdd761f88c779558cc5167cc413debd85893f2209e 380w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=415&amp;h=902&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=28bed15a291ba2ed823018429080e486db1ae7449af50c0d17972c0a412af29e 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=320&amp;h=695&amp;fx=4492&amp;fy=3366&amp;c=3ff3a3d3f5d1d7540d75960184d7d23bfa02ed25bd321a77b9f83ab0d26342c1 320w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=380&amp;h=826&amp;fx=4492&amp;fy=3366&amp;c=344ab7aeabbc61ad7a5a7775350972a3f0423a36e6690cd83a47e2ba975de11c 380w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=415&amp;h=902&amp;fx=4492&amp;fy=3366&amp;c=811845cc9f3e2d5d35302313671fbeff0599ff96e4316e48d4af5796d5fd4aef 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=385&amp;h=513&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=ff9f560f13f4bfc04e42d081442a84e74ca48bcf668596453965d55d3814014b 385w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=960&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=91791112312c9266b424fcbbe18c2b7a4baf6e08155d50ba2f038ee27e7265c7 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=385&amp;h=513&amp;fx=4492&amp;fy=3366&amp;c=c63eac0306f873c64efba33d68f67b4884bb4dbeddedeaa55f28b558b44cf602 385w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=960&amp;fx=4492&amp;fy=3366&amp;c=fec421d78bdab3209a3acfd1576fe3cc923e27cae82332336cc3dc247f91731e 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=512&amp;h=384&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=97f92fed8610dee47d312e913f1746380bbde8071f2dc4899bb05f3e81224813 512w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=541&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=861799483baca93c559308dd6a7a867643a096e46e2c1b898e0b9b271c2c170d 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1024&amp;h=769&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=efa316d2ddbea405ed6ddc8b4db8075a708aa9c528495a1cc2cb33f5c116d478 1024w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=1082&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=953bf3ba0916f0663fbfda5d1b78a2a01ff45fe77d78e2fbc240a6d288dff41b 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=512&amp;h=384&amp;fx=4492&amp;fy=3366&amp;c=cb7caf3bc2b98c5cf23c0bfb6ebf3bbea0a20eb94bc2be36466cfc1df041f105 512w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=541&amp;fx=4492&amp;fy=3366&amp;c=7c45937808401e71f6dfbcf543e6ac9391473c7c5852b4097d308afbb7705fb9 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1024&amp;h=769&amp;fx=4492&amp;fy=3366&amp;c=e7e619629fbad2fd3ce4a03c766f931919ff6c7814283c79f630f3a30698119a 1024w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=1082&amp;fx=4492&amp;fy=3366&amp;c=cd4b946bf1852d56264b1760bcf0bc003e07d64e4d7acf684ab3f2f8309f14f1 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=369&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=62a01bfcf9cca300d4b91176b5dda9619de5d47adff9150339261dcf8023c0cc 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=960&amp;h=492&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=3dc9a5ab5470f2dac16ea7346756ea0ef0e95ea89602b6d655ef482254d53878 960w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=738&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=c01e2eba13e254d9870a5b01f951a14a5ed20f8417aedbf97ecaa4792f7409f7 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=369&amp;fx=4492&amp;fy=3366&amp;c=e7b0cb954d607470a9ce184500bc229c1fdef64fb5476d2d79d362b4a43d9ea1 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=960&amp;h=492&amp;fx=4492&amp;fy=3366&amp;c=5d449ffb0c58a9bda1471d6389892eddf5a27aad74921c1458885d9774e87e05 960w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=738&amp;fx=4492&amp;fy=3366&amp;c=5d64be464169226ef1489c56b36f0fa0c6195471acdd335ffbc7c2b891c922b9 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=320&amp;h=459&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=a5f1ef3bf99e5729c80a593a6d4c4ff82485324787cd97cf19209ada413e8724 320w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=380&amp;h=545&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=7c72bea8a543f19abc9a616e6b3264f2ad9f9d48d2332e7236304f834b4dae75 380w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=415&amp;h=595&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=d60849229d0e3dd2fb208d101febc581af6dd87a0b1a95a158574e950ff54a07 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=320&amp;h=459&amp;fx=4492&amp;fy=3366&amp;c=30c246345ff4e9ac082fa72b282577bfcb415754092435e03a782ac678653e11 320w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=380&amp;h=545&amp;fx=4492&amp;fy=3366&amp;c=ce52bd2d851133b9cca704d7ca11694b60d0fa989ae3d65ae82564b9282ad97c 380w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=415&amp;h=595&amp;fx=4492&amp;fy=3366&amp;c=ec8e040a046fb25c049bbc998d7ff8c9582bbbabea1eacc7d0ab6166eab96272 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=385&amp;h=338&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=18299eeddc719c8abddfab777d501cf27dd71d53fa0682ced222ac72fc9295f0 385w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=633&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=fcc7b0f3d189598eb81bcb5ed8eecb57df29176c98309bae9604cee01e1fcb16 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=385&amp;h=338&amp;fx=4492&amp;fy=3366&amp;c=05a1df6b9dd52a1c89b2792960be46de6ad9dc6f64cffe967172984729500f0a 385w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=633&amp;fx=4492&amp;fy=3366&amp;c=20ba99be09e70bf16fa7c10d6675ed8a6867c9e07a488a52b09b7bc4125e4b24 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=512&amp;h=254&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=82e1d91eef32080a927830ec9cffe74d3af5b6a5d89c53093919984210d96719 512w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=357&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=ba3fa09ece8f8cd757d83659b6f51dfbb64fbe489d81931f18a17517e5364373 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1024&amp;h=508&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=c2c285852009428f913ab7d3a9cc851806e04c8adff7c8631ffd96d57788f732 1024w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=714&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=5328c231ba0b0e49ba19a2bff3a584ce7fabf010c9c99176bfea308136694cd2 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=512&amp;h=254&amp;fx=4492&amp;fy=3366&amp;c=473312070e668fbc46cf94078939c040498d1b9960a00c910fbf6cc49ac2486d 512w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=357&amp;fx=4492&amp;fy=3366&amp;c=31f40f785820e8c3759a523a0356a5035b4fddeafb8cda23d26bd293945a0502 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1024&amp;h=508&amp;fx=4492&amp;fy=3366&amp;c=9b7ff17259fa81621f76f1b715caaf22ce6a196c5d3e672dcb0d465200b2bd0c 1024w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=714&amp;fx=4492&amp;fy=3366&amp;c=7717112ca2ccfec090a5411e3d4cd9f306e9f057d31c3c5b21bc89842066e86e 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=243&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=ab8750f601cd3a48bb436c80ec1d296221e8f9e53cd2c169a8ade82b41adbdf8 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=960&amp;h=324&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=d0b4b4431abece74ce0ec87a1be3c99a31407883d90841819fde3175142b9a0d 960w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=487&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=55644ca3071f9eac6f25c48c33e7230767eb13fa71ef6d7e1c16442ae3706e54 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=720&amp;h=243&amp;fx=4492&amp;fy=3366&amp;c=66219ba39bec44500ec75c699329bfe4bdf3be8e314038da9fd8da2608e717a5 720w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=960&amp;h=324&amp;fx=4492&amp;fy=3366&amp;c=3c6fa9c8df39dc840dc41f512fe54277fb6c5993a867afcbddf37e17aa6855d3 960w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=487&amp;fx=4492&amp;fy=3366&amp;c=1d1490843e4eb52c093cb1223063755ee1f82d0b65991ae05cfb792bf2d2ce24 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=640&amp;h=695&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=4b113612bc9691b5234285df4edc1f2a1079078982fe355812d1578bd549bb2c 640w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=760&amp;h=826&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=089a794b840fd868af4b21c845879078ee9d105f74bc6f0c8ea7203a8f65c574 760w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=830&amp;h=902&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=2a0ee64a81ad0d3781e75c8de276808645c86f3dbb375f4d0107f9b4cfb42565 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=640&amp;h=695&amp;fx=4492&amp;fy=3366&amp;c=f7df6e267da89ad94e325b0f39ac17547b39eb8d11c1bf23123fcd8b49386a20 640w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=760&amp;h=826&amp;fx=4492&amp;fy=3366&amp;c=d48aca7845881d56c029a89484a4b642d0ae0ee0a52e5ac670880ee010a07e8c 760w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=830&amp;h=902&amp;fx=4492&amp;fy=3366&amp;c=145aebe0f5cc7756ca169eead4e8c7a5da9e099387f98695460d17ad6759b135 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=770&amp;h=513&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=bf8813558b5c538eea9acd304e87edfa8299886317734f1c074c75c5a3f17ef2 770w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=960&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=2d3bb9f5b77ecfe26f6a4c1dfe8990b111cbc72316e242619230f86fa88dc153 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=770&amp;h=513&amp;fx=4492&amp;fy=3366&amp;c=6bc308ae1a6cd4068140eba48d8297563faaad0088571e20165e5f82e036e755 770w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=960&amp;fx=4492&amp;fy=3366&amp;c=d3ef74fdff5162842818518e4150ec54805f788e99cbfbb7075055e82b7f417b 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1024&amp;h=384&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=179ff99303b4c2c8f8b73bf6f40784b1c43e02772d93ef3bcddcaf4795ace369 1024w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=541&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=797c8f18ad8e4ef8e65a76c0ecccc8c0a548b463b9480f222d707cee5c179fd7 1440w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=2048&amp;h=769&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=730c9ed695e8f29a042c1ef05ef4703082317d37ba3e26ffa1c6a57b406ce506 2048w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=2880&amp;h=1082&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=9bc82c239508290e5264e71d5d3b57ff21744ab3b59755b4a386bcde45659448 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1024&amp;h=384&amp;fx=4492&amp;fy=3366&amp;c=b4d926272c0d0dbe33cb253b536fac1ac2ef49fc9c79ec292188175924247291 1024w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=541&amp;fx=4492&amp;fy=3366&amp;c=81239fd54d0233f1c2b7143ebcea510394a2f385addbf83a90b09f3ec539b7fa 1440w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=2048&amp;h=769&amp;fx=4492&amp;fy=3366&amp;c=6ad658bf2996b808e7f8559ef727cca91e2ab4e4eb475b94c8435db169bc8858 2048w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=2880&amp;h=1082&amp;fx=4492&amp;fy=3366&amp;c=9edc654a840f9c87157b613a6560a6e1deb947fa8fbadbf709bea1b62c2c0e80 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=369&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=a80b60707d56e0b4401dda93f35387b30918ecaf65dfc63936c7cd693de75131 1440w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1920&amp;h=492&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=4bda2b59b862ec9b4be6c1a953e7f25b94eb3ee6abda44bb09ddc8f9ae85dcdc 1920w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=2880&amp;h=738&amp;fx=4492&amp;fy=3366&amp;format=webp&amp;c=fbb75630fce6975ebdebc8eea0f2a0927302e8c54683fc852e6fb61dbfb3fba8 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1440&amp;h=369&amp;fx=4492&amp;fy=3366&amp;c=faf933593e88de3b2adb7e2852a39099fcb42fd28713d17c0fca444910b97169 1440w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=1920&amp;h=492&amp;fx=4492&amp;fy=3366&amp;c=6476f32aa81fab55061b6e5154c9157393ccbc8e25f26362a685a641b87c4932 1920w,https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=2880&amp;h=738&amp;fx=4492&amp;fy=3366&amp;c=244cc08531839186196da19200cca6f5c434406cda8bae33870c3f8cd4d3a88e 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=633&amp;h=540&amp;fx=4492&amp;fy=3366&amp;c=7e081466bbef42957a375fcbd670898785790c0d65fec4a4436585662f714e23" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=65&amp;fx=4492&amp;fy=3366&amp;c=2646b9930c4c1a6a8588c5522a29cb3f930c868150e854b5acef3011be0e9b8a" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=40&amp;fx=4492&amp;fy=3366&amp;c=608571473f1eab14a30e0eddd81f30f2b95b439cf380575de45cbdaf65d9f6ab" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=22&amp;fx=4492&amp;fy=3366&amp;c=a7411f848684686e23d3c0f9a4d4ad5f4c33b9eac5e4c38de013c1e6bad34158" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=15&amp;fx=4492&amp;fy=3366&amp;c=bf3ba7888276f3b41021814d65d02b91cdda618efb42fe067ae8c471fc0b8222" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=43&amp;fx=4492&amp;fy=3366&amp;c=eaf857ee42ab81f46870bab6f38b6db0cf913dabc903ea61e4970b0823a0512e" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=26&amp;fx=4492&amp;fy=3366&amp;c=b29004b8652da8c2c3b2f67d24f603688c2acc7dd9447b036569b3b1af507e00" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=15&amp;fx=4492&amp;fy=3366&amp;c=bf3ba7888276f3b41021814d65d02b91cdda618efb42fe067ae8c471fc0b8222" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=10&amp;fx=4492&amp;fy=3366&amp;c=4e0f43d6534af7f9f252cb04fd1188b33a5956a7bc352c0be25ed999795c0cd8" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=28&amp;fx=4492&amp;fy=3366&amp;c=2102c4152e1c53e00e375f7f1d02db31125603df8f38e754609f30f557fb322e" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=17&amp;fx=4492&amp;fy=3366&amp;c=2953917e891e26a32a9d5bb18369776f5b74e30e0b3a32cdd44a02e3e8cf5164" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=9&amp;fx=4492&amp;fy=3366&amp;c=d6dc379f9b22cfc25c855b269bb58f45187aefe047aae096bc3e786e3ada1d8d" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=6&amp;fx=4492&amp;fy=3366&amp;c=dcd99d287e27e5e55eeb103bed7e7b415071a0f640b336a58ee7694d8561f41a" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=21&amp;fx=4492&amp;fy=3366&amp;c=027140a64bee02899e500d843e69da86779f1a316b7d8f738fe86eab56435871" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=13&amp;fx=4492&amp;fy=3366&amp;c=bd059fbaeb86135fbdd6d46c95e95655c1378378121c7f22dca54f2bf40ddd85" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=7&amp;fx=4492&amp;fy=3366&amp;c=0ea8c4befe67a26a5cf6b10b4ce42202495b83dd44560b75ee6ef4a47f24e8af" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=5&amp;fx=4492&amp;fy=3366&amp;c=a287cfdd2e7c70a48d57bbdfc0cd8f09259bbad1f8f9de4a6f59e2b19f256367" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=20&amp;h=11&amp;fx=4492&amp;fy=3366&amp;c=6201f026fc1806f3aa9b253e6ac4a581317a0ece5e0e103d7b21e36931520a92" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Document Nederland: Henk Wildschut
        </span>
      </h3>

        <p class="block-content-subtitle">
          t/m 16 januari
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/rijksmuseum-en-slavernij" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center bottom"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2159,0,1157,3808/211,694/0/default.webp 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2159,0,1156,3808/250,823/0/default.webp 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2159,0,1156,3808/273,899/0/default.webp 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2159,0,1157,3808/211,694/0/default.jpg 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2159,0,1156,3808/250,823/0/default.jpg 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2159,0,1156,3808/273,899/0/default.jpg 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1795,0,1885,3808/254,513/0/default.webp 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1794,0,1886,3808/475,959/0/default.webp 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1795,0,1885,3808/254,513/0/default.jpg 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1794,0,1886,3808/475,959/0/default.jpg 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1062,0,3350,3808/337,383/0/default.webp 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1066,0,3343,3808/475,541/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1064,0,3346,3808/675,768/0/default.webp 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1066,0,3343,3808/950,1082/0/default.webp 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1062,0,3350,3808/337,383/0/default.jpg 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1066,0,3343,3808/475,541/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1064,0,3346,3808/675,768/0/default.jpg 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1066,0,3343,3808/950,1082/0/default.jpg 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/287,0,4901,3808/475,369/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/283,0,4909,3808/633,491/0/default.webp 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/287,0,4901,3808/950,738/0/default.webp 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/287,0,4901,3808/475,369/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/283,0,4909,3808/633,491/0/default.jpg 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/287,0,4901,3808/950,738/0/default.jpg 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1861,0,1753,3808/320,695/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1862,0,1751,3808/380,826/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1861,0,1752,3808/415,902/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1861,0,1753,3808/320,695/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1862,0,1751,3808/380,826/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1861,0,1752,3808/415,902/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1309,0,2857,3808/385,513/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1309,0,2856,3808/720,960/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1309,0,2857,3808/385,513/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1309,0,2856,3808/720,960/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/199,0,5077,3808/512,384/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/204,0,5067,3808/720,541/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/202,0,5070,3808/1024,769/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/204,0,5067,3808/1440,1082/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/199,0,5077,3808/512,384/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/204,0,5067,3808/720,541/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/202,0,5070,3808/1024,769/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/204,0,5067,3808/1440,1082/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,748,5972,3060/720,369/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,748,5972,3060/960,492/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,748,5972,3060/1440,738/0/default.webp 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,748,5972,3060/720,369/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,748,5972,3060/960,492/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,748,5972,3060/1440,738/0/default.jpg 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1410,0,2654,3808/320,459/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1410,0,2655,3808/380,545/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1409,0,2656,3808/415,595/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1410,0,2654,3808/320,459/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1410,0,2655,3808/380,545/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1409,0,2656,3808/415,595/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/569,0,4337,3808/385,338/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/572,0,4331,3808/720,633/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/569,0,4337,3808/385,338/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/572,0,4331,3808/720,633/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,846,5972,2962/512,254/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,847,5972,2961/720,357/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,846,5972,2962/1024,508/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,847,5972,2961/1440,714/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,846,5972,2962/512,254/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,847,5972,2961/720,357/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,846,5972,2962/1024,508/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,847,5972,2961/1440,714/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1793,5972,2015/720,243/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1793,5972,2015/960,324/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1789,5972,2019/1440,487/0/default.webp 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1793,5972,2015/720,243/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1793,5972,2015/960,324/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1789,5972,2019/1440,487/0/default.jpg 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/984,0,3506,3808/640,695/0/default.webp 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/986,0,3503,3808/760,826/0/default.webp 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/985,0,3504,3808/830,902/0/default.webp 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/984,0,3506,3808/640,695/0/default.jpg 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/986,0,3503,3808/760,826/0/default.jpg 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/985,0,3504,3808/830,902/0/default.jpg 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,0,5715,3808/770,513/0/default.webp 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,0,5712,3808/1440,960/0/default.webp 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,0,5715,3808/770,513/0/default.jpg 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,0,5712,3808/1440,960/0/default.jpg 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1569,5972,2239/1024,384/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1565,5972,2243/1440,541/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1566,5972,2242/2048,769/0/default.webp 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1565,5972,2243/2880,1082/0/default.webp 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1569,5972,2239/1024,384/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1565,5972,2243/1440,541/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1566,5972,2242/2048,769/0/default.jpg 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1565,5972,2243/2880,1082/0/default.jpg 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2278,5972,1530/1440,369/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2278,5972,1530/1920,492/0/default.webp 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2278,5972,1530/2880,738/0/default.webp 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2278,5972,1530/1440,369/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2278,5972,1530/1920,492/0/default.jpg 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2278,5972,1530/2880,738/0/default.jpg 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="De handelsloge van de VOC in Hougly in Bengalen" class="lazy-image not-loaded " data-src="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/506,0,4463,3808/633,540/0/default.jpg" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/2152,0,1171,3808/20,65/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1785,0,1904,3808/20,40/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1007,0,3461,3808/20,22/0/default.jpg" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/199,0,5077,3808/20,15/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1852,0,1771,3808/20,43/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1273,0,2929,3808/20,26/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/199,0,5077,3808/20,15/0/default.jpg" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,822,5972,2986/20,10/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/1377,0,2720,3808/20,28/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/497,0,4480,3808/20,17/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1121,5972,2687/20,9/0/default.jpg" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2017,5972,1791/20,6/0/default.jpg" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/924,0,3626,3808/20,21/0/default.jpg" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,0,5858,3808/20,13/0/default.jpg" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,1718,5972,2090/20,7/0/default.jpg" /><source sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,2315,5972,1493/20,5/0/default.jpg" /><img :style="objectPositionStyle" alt="De handelsloge van de VOC in Hougly in Bengalen" class="lazy-image-placeholder" src="https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/0,524,5972,3284/20,11/0/default.jpg" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Rijksmuseum &amp; Slavernij
        </span>
      </h3>

        <p class="block-content-subtitle">
          t/m 28 feb 2022
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/ellsworth-kelly" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=211&amp;h=694&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=c99e6a1c592f4eea5a4aee7d2cfdad4a9806671d9d849d5d13b9dc5d30229e5b 211w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=250&amp;h=823&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=d1c467978d3c8b6abfe09b4af51c9f48076b6fa97cd31145b3c3fb10d47643cf 250w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=273&amp;h=899&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=6fa89a6d6324c28e2e72750585b8baa572e1652f7ef2883240047a1ab9d2fa52 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=211&amp;h=694&amp;fx=3553&amp;fy=2475&amp;c=2830bc277c5626f435bb977e60ccf05749b5e3a9c7cec5adf43c84f267567a9c 211w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=250&amp;h=823&amp;fx=3553&amp;fy=2475&amp;c=c5168fd1d877488ebcf9830bf96070c74e2d19c50382c2528e6ddd532c4dd6bc 250w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=273&amp;h=899&amp;fx=3553&amp;fy=2475&amp;c=705a06343fc5c80e85d8a34485006dc13df6ea73f2d670c7a13eb8ab1ed05fb2 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=254&amp;h=513&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=77846e62195e450ef2714b3ae3128fa314a36f3548d5e33dc07a3ba0937afc05 254w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=475&amp;h=959&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=b1aa3c8edb9323b7e94c5881797cad1ddf9ad92450e9c6231b83954c8f065a9f 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=254&amp;h=513&amp;fx=3553&amp;fy=2475&amp;c=5704b3e5a3e7e1f1114500142898f82115e8e48a78b2c0f1194d86ad10573564 254w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=475&amp;h=959&amp;fx=3553&amp;fy=2475&amp;c=6263730a3443daf81b7fa2ee45fdd18e9eb420eb0548ab3b308f51853b527f74 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=337&amp;h=383&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=6a8c0faec3a339e38b160f374f1e47fc9299e3714786f07ceca96d3f27a7cd6d 337w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=475&amp;h=541&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=2d8b644370b51acaf4b8819287a61d9f9ba26096e6b19e405f20728f0c1e82b4 475w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=675&amp;h=768&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=716f380941ee3c6e7f990eb5afd25ed39266581422caae7d257cbab85450bfb0 675w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=950&amp;h=1082&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=b2faed2b56684616acd874c1adb2e94a89e327a976c48ffc26cb7f7bb0db6243 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=337&amp;h=383&amp;fx=3553&amp;fy=2475&amp;c=3d555176d1befc08973b6cdeb56a292e20081178dc31cd654020f34906c01724 337w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=475&amp;h=541&amp;fx=3553&amp;fy=2475&amp;c=238c7f3985535080c3f682c891e93ed261d548132014878bed56d6813468cf06 475w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=675&amp;h=768&amp;fx=3553&amp;fy=2475&amp;c=d8e973ff59a04b770ae690ece0fc5f80c19a9d01e96d61eff42afc49b4327795 675w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=950&amp;h=1082&amp;fx=3553&amp;fy=2475&amp;c=f57799784c48804359c6c69412b0602a163d977660f0dfa29cc944f35ee4b25a 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=475&amp;h=369&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=15026bdcdbd6a97ac50f36ddca7b23929a7db625445e361fa9c24428d900d3f0 475w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=633&amp;h=491&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=0118067c6365377fd01414fdec44d6f6930fac1d392be63115e3d84e29142332 633w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=950&amp;h=738&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=c3f132071e03b75874a593a09b7d0df86a2e28227e2da978542f2f7aa4ad99a5 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=475&amp;h=369&amp;fx=3553&amp;fy=2475&amp;c=7a0000ca83280f8c06cd888c6f0712755d2981739aa76d82d5a6de13444f7daf 475w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=633&amp;h=491&amp;fx=3553&amp;fy=2475&amp;c=20988d1dc56995d2e8a5cc91282a2bce72354def584b24c947f99acc0699c941 633w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=950&amp;h=738&amp;fx=3553&amp;fy=2475&amp;c=73785797b53a2c1f7ab72c4929e84ab3725bf9e4b399d0eaf0feb83174b988a0 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=320&amp;h=695&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=d59bac844e47afc39dee19707acad8d17ad9c9be71dac30fe850f6b839a4f450 320w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=380&amp;h=826&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=55e64c0b6c4fcc2098e2cd038ee050d0509d96fa1263da9f3c8f08255d511351 380w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=415&amp;h=902&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=eafa9fad7928d40e200c77eee3f4ba04de6244d82f930b40d7a0b703f31264f8 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=320&amp;h=695&amp;fx=3553&amp;fy=2475&amp;c=4df2449bac30b65a533a8da83d7a8c25d2cf44b632b4c2d793bd205949161cc3 320w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=380&amp;h=826&amp;fx=3553&amp;fy=2475&amp;c=a5e3489fa6b84a0678bf0f0cfef391577128064f646d421d3b90e31a83c5df2e 380w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=415&amp;h=902&amp;fx=3553&amp;fy=2475&amp;c=b08718ce2a65dd6f8d148d8e09890a3212e50d9fa0ec3598bbd54ffbb678abbe 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=385&amp;h=513&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=ea1271a11a0d11be2cc01b905b574476a4e092c0d4806c57c02875a98eb14b13 385w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=960&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=729bb11084ecf45b929271b3808821c481204cefc0f17a49927a087b70b42adf 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=385&amp;h=513&amp;fx=3553&amp;fy=2475&amp;c=96ef3fdd1888ee292fa416dc65110cd72ec942f78863599f0e373f0eaf55279d 385w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=960&amp;fx=3553&amp;fy=2475&amp;c=384297bebf77d38e61020c7f8b2aed3012b84bae58ea76db3e884f374da0d541 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=512&amp;h=384&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=d2cbc800ea44c41b6547a4d4c638f02cf8219e580c6732c3ef2be1b5b73f727c 512w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=541&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=87b8577a2dca51393d8298ee7a7d480bc63439fb0c4b20c8219b18586d17c48b 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1024&amp;h=769&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=806a0d44152db83f72d1f7add2c84037f1e1c00d902e54bdd81e9162b7b997d0 1024w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=1082&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=26ec6e72154dc78c228d75d3578582802366b6bcf6066d20277d57a9e56c181f 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=512&amp;h=384&amp;fx=3553&amp;fy=2475&amp;c=1818bcf238e253e0412c6019730de38670b69f8fa2447529aac24cffd9220b63 512w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=541&amp;fx=3553&amp;fy=2475&amp;c=cc228142e10a05ac4c9295184a1599d065639cc691d19e873d88d409a872863c 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1024&amp;h=769&amp;fx=3553&amp;fy=2475&amp;c=6b0943a42bf2a5066999ce1bd93cba47f83d19e502ae77ed9a341fa4b4da45e6 1024w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=1082&amp;fx=3553&amp;fy=2475&amp;c=bf267642bc6f398d6c7cf1efad142154cd488c02b3abc4869aa1d2ecf7f69577 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=369&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=c77f08fbd7e11abd710c2813c5e89d09fafbe8d0f377758ad8d48613aa2ec1a7 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=960&amp;h=492&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=a5f136d3e7178d5c0f5feadd111ce063d52f08efc9334d5f7973db52d714e05b 960w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=738&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=12e74d73036948afe7169f0400958f3a159bc92b9287dea0b95163b9460ea6d6 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=369&amp;fx=3553&amp;fy=2475&amp;c=c7b914b5341aa4a76f8ea38eb5e3341b9fc0e7c43571fc7abaa3644a8ee1c5e5 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=960&amp;h=492&amp;fx=3553&amp;fy=2475&amp;c=561c5e5c47c291341936db699c9e1ed92b08613bab56dcb80aee0b275a53a488 960w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=738&amp;fx=3553&amp;fy=2475&amp;c=fcc30ddb9e18489c8b92ae1e895550f24eab90928a507009be9aa3fa3cc60ddc 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=320&amp;h=459&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=2176c85d0b9cd0b167f801128c5390b0ddb13af9b93bd295d16ffb6c38fce2e3 320w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=380&amp;h=545&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=f2c54ad414d408ddf3b9758e4889d14d49941f846733e9fdfade42f7e8e3fdc9 380w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=415&amp;h=595&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=ca63876373eb1d408dbaf1af3d01016b85536bc28bd54d07b65c8ee92c144c39 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=320&amp;h=459&amp;fx=3553&amp;fy=2475&amp;c=7b43848520433f8b76c15c4f5cc040855ae3e600d4c433b5184621633e19bccd 320w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=380&amp;h=545&amp;fx=3553&amp;fy=2475&amp;c=90a3f1daf4edac76a758b254d22da9d152c7670ddfc68e448d21f9560666c17a 380w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=415&amp;h=595&amp;fx=3553&amp;fy=2475&amp;c=0fd6169d1e7a154eec9325e23c3d8a6fe26b1953976bf69fabaa13148355b16b 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=385&amp;h=338&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=b6a02b7fceeb175c5746b06adc6efeb91e4730d2588b2c57908137920b1bed5e 385w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=633&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=ab21f9dda9a3469cc9092083e1fb015f570bfd2b970e28664ca8addb83ea80af 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=385&amp;h=338&amp;fx=3553&amp;fy=2475&amp;c=0a110c6d14581f5c5e035207972fb56208956cfcddd8e4146f43f9540f69f14d 385w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=633&amp;fx=3553&amp;fy=2475&amp;c=ce7765f115617ae09c32f8938c10309cbfc11941db91ccfa01f42c916e6b0575 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=512&amp;h=254&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=d582da1b15032322f5ec186b0fb6d96913070fb93a65fd77c89887494b9fe252 512w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=357&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=1b8a52a3ff94651e9c47de66254c21ba4d9e419521f2d9150ab1af0c9c499106 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1024&amp;h=508&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=2cd61273e5ca00ce57e23cd1a0895472eee1fa4bcd5dffeb8818d00965150363 1024w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=714&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=a0b64122f2a7d90e96e024845671daad8372cfa3e67bedbe2f239b1f942e5f60 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=512&amp;h=254&amp;fx=3553&amp;fy=2475&amp;c=0d8eb1170d32380a415267c4c3cba91534b5b5fa9544607b3da3cf947d24c3df 512w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=357&amp;fx=3553&amp;fy=2475&amp;c=081b7851cd1899fd512c0d7ee73c0be8096325e772bfd0416cff0f88beeb5434 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1024&amp;h=508&amp;fx=3553&amp;fy=2475&amp;c=8ed76b046d6b91b06920db9f44ffd5f3b1d8e47034084da5c4f093f904c2fd10 1024w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=714&amp;fx=3553&amp;fy=2475&amp;c=461bc680c6f24e19c175ddd17822bac70af56bfae6748452e744c6c3bb125e20 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=243&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=006c8c6b9a725196db233bc2beeb057796c1eacf61ba8f1d4291d12d21cd6309 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=960&amp;h=324&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=39b6d21cba72a25d8debf91cb3360a35633108886b725edc55ad77e8d0835b53 960w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=487&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=5e52e188df6ce039a6ca284ade66aae62ba5e017a57d1561ac3ae43b0698cb77 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=720&amp;h=243&amp;fx=3553&amp;fy=2475&amp;c=fb7a7fa818ad7bb9e10a3a962f094609e6f68358bdf07514ce5c816fff6ae949 720w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=960&amp;h=324&amp;fx=3553&amp;fy=2475&amp;c=c15335be00380d9a64047152073065eb7540f88f1b758a2a032aaf224d815e6c 960w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=487&amp;fx=3553&amp;fy=2475&amp;c=57ff073564494918e28610c14c1e1b84838532d45e47ab4bf650fb39f4d09a01 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=640&amp;h=695&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=1a1ae0b623c701eee556a76b697caadc4309de392f20a843b06b5d6ffa3dac6a 640w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=760&amp;h=826&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=a9ebf183a166100663c504c151f450f752e6e0274321508cd52bbd528e7f0f1f 760w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=830&amp;h=902&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=d71687f6aa7ad0e8a0423196026b240f839116ddbd100f5df7a7ccc35e287464 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=640&amp;h=695&amp;fx=3553&amp;fy=2475&amp;c=82a6f76266953aa71b1266e411a4c302bf53354b7c8c85e3b8ed9ec29772532f 640w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=760&amp;h=826&amp;fx=3553&amp;fy=2475&amp;c=1217a8236ac9ab10e766f95cd23d519546d480a0ebf47c5277514c780c0ae6a9 760w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=830&amp;h=902&amp;fx=3553&amp;fy=2475&amp;c=f042879a437b708d37dfeace0ba1c22ebda026f035a4db29dc49a4646ee2d27b 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=770&amp;h=513&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=74a8ba08597497693e88edb9cccc1742db123b222b88dc392bcb92be9aecda65 770w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=960&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=8af5053cedec77d085b109321761aefa0256fdb445fe52af7540b16ddb19e6b6 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=770&amp;h=513&amp;fx=3553&amp;fy=2475&amp;c=c07d6a5fa14198a208fc3609335d1ca406f0ca5ce41e02b0d25cf9e2c02c57cc 770w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=960&amp;fx=3553&amp;fy=2475&amp;c=f05e05817fb0d68e1dc81e32685ac182a7c0f4dd7d661b632e283ca5b521b360 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1024&amp;h=384&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=8007cd6546a146b68aa2e4282a06642f1197fd15edd27498d4b3ea07362ecd53 1024w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=541&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=f3a136e781f5134ef83805f1605ff9dcf2674cc367c271d69f49c5e67878ee48 1440w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=2048&amp;h=769&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=c0db0114bc3c0da05517cf129d83b5f2c50a46b3d9d143b9d70b78650dabfe51 2048w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=2880&amp;h=1082&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=0221637a3d0abccaa09ad9055e9d08aad20c6ca8624a35060c3c2972aef8a857 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1024&amp;h=384&amp;fx=3553&amp;fy=2475&amp;c=d27f0cfd983039e6e0e8703cc74bb595ce540a0bfc0a129693059e0b8e5856fe 1024w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=541&amp;fx=3553&amp;fy=2475&amp;c=5f7f6a49f37fbda88328f0a97209edba2fe730ea6a3ab3696c826a3a514a388e 1440w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=2048&amp;h=769&amp;fx=3553&amp;fy=2475&amp;c=2833859a6da29ffa651f2cb3ae79cbddbe30ec63fbba08198b0251b2291a4696 2048w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=2880&amp;h=1082&amp;fx=3553&amp;fy=2475&amp;c=173ee32bd540e2586b76311bbc41a4642eda70831452e0587ef1d42103206d6c 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=369&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=d3e122f81067dff47bceab0f301276b37843a0ae49f5844d5dccee6f32c39f61 1440w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1920&amp;h=492&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=61e2f13a2a88665e647a207f7553fa91d955516ea7a5f8f116014955bcb690a8 1920w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=2880&amp;h=738&amp;fx=3553&amp;fy=2475&amp;format=webp&amp;c=6cac102b72903a81e95640d0812874150cb1ee19fd3c4985d1a47df7a176d197 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1440&amp;h=369&amp;fx=3553&amp;fy=2475&amp;c=7bcbe918bb353f749166e2357374f25bf48c15e7788b2c53cd6675ff5892733c 1440w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=1920&amp;h=492&amp;fx=3553&amp;fy=2475&amp;c=eb5c286c695d1a24820074bd4c3bc28e3bea51c87aaa25b1fac47ebad36b830e 1920w,https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=2880&amp;h=738&amp;fx=3553&amp;fy=2475&amp;c=47a554da2c736b971bc9fe73cace64e9ebc5ec107bc87a833e53cb992d13b44a 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=633&amp;h=540&amp;fx=3553&amp;fy=2475&amp;c=b8675d052f92cf4ef8245fbf2205b5b56b2b7e858fa69dce48666405bcf9054f" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=65&amp;fx=3553&amp;fy=2475&amp;c=25b5c12b1033062765872515dd5eb4a853b87e2b7b12f9818fdc37230a2f5457" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=40&amp;fx=3553&amp;fy=2475&amp;c=15ec0bda264fa863c16eb189151aa35dc7f995b9f533d8c9718fdb2054c29e98" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=22&amp;fx=3553&amp;fy=2475&amp;c=bf348e61fe087c5dda427ff8bfb43cabaf511644ffec477b9c0589b99fe28670" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=15&amp;fx=3553&amp;fy=2475&amp;c=810e357593f3eb81c3ba37f822c5864d0df58486bb2710a9594a449535ebc9fa" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=43&amp;fx=3553&amp;fy=2475&amp;c=0c36e5b14c4cb85656c66a4e624bbec01fb3536c6b7b12b74975c4cd93d87932" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=26&amp;fx=3553&amp;fy=2475&amp;c=33c7c7e412e6bd8e5f3e76cf68df84f1a1cb60be7b201274f35ed25c87f669d4" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=15&amp;fx=3553&amp;fy=2475&amp;c=810e357593f3eb81c3ba37f822c5864d0df58486bb2710a9594a449535ebc9fa" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=10&amp;fx=3553&amp;fy=2475&amp;c=3bc431ceba4afe97e4498bfc54cba310dca97882949cce565e34761e41d5fc68" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=28&amp;fx=3553&amp;fy=2475&amp;c=8be85e69d09e51bc3f96a0cd93802d778645afbbdcbf54b3bb332120c161822a" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=17&amp;fx=3553&amp;fy=2475&amp;c=b02f5330d9cfadc34f68443acea6055d43d93b53c699280e2161f4814ff9c698" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=9&amp;fx=3553&amp;fy=2475&amp;c=4f607416e9825f236a394c02a2c4ae47ce8a9ea70baf36711f5aa75d545a0faa" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=6&amp;fx=3553&amp;fy=2475&amp;c=c32724957ef4058cd1ec21fdcbb0d14bde0018a7953c1bfcab3d9e091161d3c5" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=21&amp;fx=3553&amp;fy=2475&amp;c=dd3f463b147c96c33a66d742fc9070818ec4b10ad3596eddee3635e0626ac17d" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=13&amp;fx=3553&amp;fy=2475&amp;c=27a35892cb62488a622b441d757c73a10b2dd868befb7eced5b0f7933f63045a" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=7&amp;fx=3553&amp;fy=2475&amp;c=e404bed449b30c27da97265903bd57adfe0d46ab61780a54578749087f20d282" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=5&amp;fx=3553&amp;fy=2475&amp;c=2ea937e476517018c4c8a912287f4d565c8a7140c883bc31191db76746b41a81" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=20&amp;h=11&amp;fx=3553&amp;fy=2475&amp;c=cbbc6cebf6ee864e7c649fbac52843721b8307dd62524c8ab2e54cc0bfd16cb9" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Ellsworth Kelly
        </span>
      </h3>

        <p class="block-content-subtitle">
          t/m 24 oktober
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/zwart-goud" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=211&amp;h=694&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=e2289ead26ddbbff0e4f471e1aa379427ccb986c99b763f6554fea0c3e15163b 211w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=250&amp;h=823&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=ac54ce775d6251adb7717a56751be2fe98ee5baba42532b2836720d3349b240d 250w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=273&amp;h=899&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=2c972c18fe5ddb6588f52893170361040153a29b4a04de99705b598daa16deb0 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=211&amp;h=694&amp;fx=2133&amp;fy=956&amp;c=fe66957bd503b9c4d55ad163ee262ff5445f431835f4997ff9036dfef7d6712c 211w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=250&amp;h=823&amp;fx=2133&amp;fy=956&amp;c=5df4e3e8e134eed735b317f8831272a30547d3c59ec2c6eb61c6cf7791f540d0 250w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=273&amp;h=899&amp;fx=2133&amp;fy=956&amp;c=8dee19ac3105b05bc4c7d069c4bf82a9591e9ef5d5a37ead1b2e19eb2e95b218 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=254&amp;h=513&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=2f2a714784122f6686b8c8849a44815acf6fc7f88084279d4e5a27fd93f651de 254w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=475&amp;h=959&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=3e973faed3ccae3c09a75ae2525078141318cee9b7f2f387b7117287648e3bb7 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=254&amp;h=513&amp;fx=2133&amp;fy=956&amp;c=daa41e4813b6a696f22500177b0cf8dfe6beaf1bd8f928c415bec7a3e276a3ad 254w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=475&amp;h=959&amp;fx=2133&amp;fy=956&amp;c=bf5e0a26aa43d9cd8ff6b840122e85a28eeb461da5b962cf44a6245ad3c4911c 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=337&amp;h=383&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=f4f65a5b79ac3fa651e435fca2925a8c3ef4576301297aa3478fb1ab5fdf042b 337w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=475&amp;h=541&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=649305e11d2d36b87386e078744d60c4489e7b8889130fc0783c6d80765afacd 475w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=675&amp;h=768&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=5519acfeb600926051fdeee025003bc0a8ccd6535849b1b9d3aa6a3598cb53b7 675w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=950&amp;h=1082&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=a7277d93a4bfca917e154381b0730840a8011bffa6186a1c618c87e63bb4431f 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=337&amp;h=383&amp;fx=2133&amp;fy=956&amp;c=8a3442fb7312e07a957dad08fe9dc9f2977a91223eab60184e254234dc806c16 337w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=475&amp;h=541&amp;fx=2133&amp;fy=956&amp;c=87aac9cdb7c169d607d6817179fd3aa0e99d43b645bdb0fdc2403a73631245f5 475w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=675&amp;h=768&amp;fx=2133&amp;fy=956&amp;c=5e477080c3bb47957fe1358bf7ab8c68ee8a8831030edf35d7fe06c55e321f18 675w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=950&amp;h=1082&amp;fx=2133&amp;fy=956&amp;c=5a605e17773e1134e534f9f8d5361d5193b1b59468794449855c6f3707093d4f 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=475&amp;h=369&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=ab9b85b30c41a8395a6a09318d1cc563939ea5f84b789c14b70f9c600889d61b 475w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=633&amp;h=491&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=d46f91ca54936b3a52beec7f3eb8dcae409ea8cd39fd717624315d3e35e54064 633w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=950&amp;h=738&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=b0532c6ad4840b1be1e6aaa21e3a441919ed7dfd81d5fd7b87d2825dcf364360 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=475&amp;h=369&amp;fx=2133&amp;fy=956&amp;c=208f9ef37fb3bf054f8104b6ea90a6ca2d51e80746f0e3a3ebd494d0a0775fc2 475w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=633&amp;h=491&amp;fx=2133&amp;fy=956&amp;c=34a89a1f83d82213d4b69a370a504b77ff3abe104fb69b518fd957576a887e6e 633w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=950&amp;h=738&amp;fx=2133&amp;fy=956&amp;c=77d63019ee847af8a2b476aea0ff29c5ef139b267ce23536be4df561f2a529be 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=320&amp;h=695&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=e6bbbca6e5da8cba5b8a50fbc811e4d28bed516fa97a23beb52062dec90c8550 320w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=380&amp;h=826&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=e61371efaee810d4d5cbdc4d44e09c2543b4f752036c5326356774f772816df2 380w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=415&amp;h=902&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=be0aec79617a3e975b7afbe4ffceee105109045b60d346da5c5cb78e82949609 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=320&amp;h=695&amp;fx=2133&amp;fy=956&amp;c=c0ddb3aa13f556ff46c9bdc2cfdcac4bccce65e7de41f72b3cef2a8303c6340a 320w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=380&amp;h=826&amp;fx=2133&amp;fy=956&amp;c=cd6fc6a328658200af8587999b1ad36b60769b3eb5c3b6608d337c904d120466 380w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=415&amp;h=902&amp;fx=2133&amp;fy=956&amp;c=cc63febb5d5a459eafb20d833ad1d8103d9eaf0a3e423578836633066090e782 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=385&amp;h=513&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=1b0c7bd42b047641f0bb4ca3d0a0c3719b337d23ed7ff024515a485d37cca069 385w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=960&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=dcdf618096cbd46bf697bd3402fcc64cf82ec1d498a3d69dd3069a3d16ed60f8 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=385&amp;h=513&amp;fx=2133&amp;fy=956&amp;c=2c4061026e880b736b0aa8faf95cdc499c448de4fa230992b6dba9967d72edc1 385w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=960&amp;fx=2133&amp;fy=956&amp;c=1aec35de1246a6eddacf448cb7d8b68973e2a96a2675ca4352cb4d014d29e1c3 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=512&amp;h=384&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=25f9edc20b559d1106c522d7ce8ddcf6ab09176591fd9748db47792cc3d8983e 512w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=541&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=b2b261f4d8c31fb2353240b6b0d04beeadf2dff1737bad8f6c3ed8c528503174 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1024&amp;h=769&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=27caf52625ec2424491ecc7eb66f74c39a70268e5bffb298cf67fe5dcc9e1d9f 1024w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=1082&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=756c7b53d5718f31553ceeb4a4ca03779cfb5c7c2febf3ef853a6dd0285addfa 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=512&amp;h=384&amp;fx=2133&amp;fy=956&amp;c=de209517a523a081d73c501c402607f44e261b74cc67ca314aa7c909b4424e94 512w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=541&amp;fx=2133&amp;fy=956&amp;c=bb9ed56e0cddc6ad9b80dfab160f7856462dda2c7f91bfcd39d9b9c847bb935d 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1024&amp;h=769&amp;fx=2133&amp;fy=956&amp;c=bd9908e17dfca6fd3c9dc7e1b3221a7f09f1d4306a38abd0a5e6a6b9ff7c03c4 1024w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=1082&amp;fx=2133&amp;fy=956&amp;c=8f1488c434e579d255c238f96d855551f34aaceba9cb120a95e6b4451b91d865 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=369&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=49f9797f457a788da31d922d912b450bebdc5b566d1fba525273e9def3d6b3a7 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=960&amp;h=492&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=de15ba24313a95f9345695cc561497d7ac9749c4a121b76b0ff24f863ce7119f 960w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=738&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=3e6cf180f2d709b4a4a22a0fd706ff2b834a047d2c2cf9b22f52e4ffad2b5ce3 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=369&amp;fx=2133&amp;fy=956&amp;c=df753a1b0f20032c3195a0b8a30c59992d5252b52b9cd9b93636c0dac0b5c0bf 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=960&amp;h=492&amp;fx=2133&amp;fy=956&amp;c=66076a5062bdaabcbec7336cc3a8923f96b2958096e0b2e53e4cda1613d64575 960w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=738&amp;fx=2133&amp;fy=956&amp;c=be1ba7b2f15cec3d8f3bc38660f0f8ad1baf64554d4073be8ace7cd096f47a42 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=320&amp;h=459&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=58e82104db425f76e58825d5fbc3b3e376ec5c06dab6930d89ad3061158edf86 320w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=380&amp;h=545&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=701ae70a1bfdbcb1dfbd53e8f6a058ddd6d3ff7ccbf7c308fa34e7939fd6688b 380w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=415&amp;h=595&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=9e5f6b073270e6698b439b12f1bf84c7a78452e204531ba6dc25d73cfba6b397 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=320&amp;h=459&amp;fx=2133&amp;fy=956&amp;c=087145af05ba1f10d0177d0018411b3b2390a78f31c56520ee10dc3cbe7d2977 320w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=380&amp;h=545&amp;fx=2133&amp;fy=956&amp;c=6419613f185c51871989d64ee01fb26bb5457d7622dd32d38828ee9df2ceb431 380w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=415&amp;h=595&amp;fx=2133&amp;fy=956&amp;c=a02c69c4a23298544d20483925c568a8cb9320a806a269d7369abac3d445b73f 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=385&amp;h=338&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=4f5bbd2d84222115b9289bad7bba202851b94ec5d4ef7a5d6e5b907db87d40f9 385w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=633&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=9668271a46040d3679cb7da6d60256864fc63e79a11c63835f59c65ae1ed467e 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=385&amp;h=338&amp;fx=2133&amp;fy=956&amp;c=fbe171146d445d8fd95fa38fcd21b9b927e484b192336896bf1287b96d326d13 385w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=633&amp;fx=2133&amp;fy=956&amp;c=10ce64c2249810978fc7e63c6a817446fc785604c53ba0082e829bdcd4b1e5f8 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=512&amp;h=254&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=e7c66501da8d799432345a5542de8ab721102e92da64a197c4e969a9f112390d 512w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=357&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=8a055d63af9c6597ea2d7cacb1d1fb18759f8219cb2b45ae33128769b1b420a3 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1024&amp;h=508&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=94cb5217a38005f814cad2554c9dfd1719f6284f5000ec7c610753a9c05b6e3f 1024w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=714&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=0945005e141abe622e518f0f15e1fbd6890e1c0b735e78268f3accaaf6dd2ff4 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=512&amp;h=254&amp;fx=2133&amp;fy=956&amp;c=296438b6a339047a699938e3bcf4f4a6bd12323ce5f5cadda538f3a044b099d7 512w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=357&amp;fx=2133&amp;fy=956&amp;c=685eb19efc417b608e79e2353db800a1878917374ca1679a90311f86e6da816b 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1024&amp;h=508&amp;fx=2133&amp;fy=956&amp;c=0dae229a67f11ac38e3b4251f96336c39e850195ab7c5c64faf33725ea1b3cbb 1024w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=714&amp;fx=2133&amp;fy=956&amp;c=69b4def86fd2d2f9c5f38b9544eb4d2440f6c54d593c651f3ca280da7ad39e63 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=243&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=ef1c8c11118c4220ee467233e579a3046047537e4b75391c90531bdc335f6e00 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=960&amp;h=324&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=290cb2154d8bc753f33ec6204e0c02ef2a47da0f933c5a36e9fd1ad277a7f9b8 960w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=487&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=d32a5011f1951797cdd1b84dc56098173b22878d36a9671ee260e25aa858b3e9 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=720&amp;h=243&amp;fx=2133&amp;fy=956&amp;c=efe3cd41b89d7b0b2a448024a7dd33e6fb8e646c904ba2464c9d985b361ba10e 720w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=960&amp;h=324&amp;fx=2133&amp;fy=956&amp;c=a720f5a81ca45ac5698d5864eb503ed8fe3a2d20e82ef6934fd1b9366f4c5dce 960w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=487&amp;fx=2133&amp;fy=956&amp;c=8b70103e31f56da4ed13a6ff993ea81bf5f2146c12ba05587b8494ad8947a695 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=640&amp;h=695&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=4954dadd3f86c885410a564c56b4f3da20f4dda89230c2d35b4ea620002d7e76 640w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=760&amp;h=826&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=d78249eec5b7f97963e655bd7e3c841e39c62947cb746bca3ab236867dbb8913 760w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=830&amp;h=902&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=13d7227abcd7420f7782ba36d21276fb69ecc5661d43e4a98fb9e84865237357 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=640&amp;h=695&amp;fx=2133&amp;fy=956&amp;c=ad6282ab7351eba851aff29f307b8f7923c6fc46c959b0edc697470d71ef8866 640w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=760&amp;h=826&amp;fx=2133&amp;fy=956&amp;c=a6ead44bb8f297b9483c136bc74addd260b626e197911e01fff08f677100caf5 760w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=830&amp;h=902&amp;fx=2133&amp;fy=956&amp;c=f3f808b80b00ff14333bb7dddc1c6cb0e09f0c952f98076a143fddda6668c115 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=770&amp;h=513&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=59bb110df320173c73afd368826511a5f2c1d734ab048aa569ea04f54aa493a0 770w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=960&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=9899be599e42ba2c6cc6fbcd3b3046d577ab8f70ecdcab929ec3efbcbf54ae69 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=770&amp;h=513&amp;fx=2133&amp;fy=956&amp;c=a6438a888e027807017fe3419e8cb913d55fdac161c1f4303c1ee97d3c4af03b 770w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=960&amp;fx=2133&amp;fy=956&amp;c=aa023f748b3491b8895904c7854ad9fb5da6f69b0ae51b980c95fbbe566a364f 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1024&amp;h=384&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=38f0f16e694996bda482f290d46542bcd2ba6216e2fd2fdb325eaf341afa6963 1024w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=541&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=133a32de2a56be605bf7fe313ee7c587afca0c581ec3a6e7d760b08c1606a3ad 1440w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=2048&amp;h=769&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=123280e5fd7e0ca0520e7db5216d5471b74b312f4e8ad64dd93cbf0ef23631a1 2048w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=2880&amp;h=1082&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=641df2257ef073011bc4790a90784e50ea8aa6736e2f8a28081dd4dc04f96bf8 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1024&amp;h=384&amp;fx=2133&amp;fy=956&amp;c=4c5495b7186e441de28b4f09c5ac42313ffbf27c27ac156c27f9db2a15af5af2 1024w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=541&amp;fx=2133&amp;fy=956&amp;c=a4771607a0f3ca11d728095e807090b5175ed45f7fc0f6b7ef72bdfbf18d1368 1440w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=2048&amp;h=769&amp;fx=2133&amp;fy=956&amp;c=2244aebbe907783ca292bd8e38e4b9de05553b0c32740442e0e0509b7618db16 2048w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=2880&amp;h=1082&amp;fx=2133&amp;fy=956&amp;c=e68ebd528747441f6d069af1eee1e9a7691cad0163cfcc2b0db91f1e9bbedcbc 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=369&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=268e5fa11022d978e5e4203733ad6c02a5e736d6ac6cc2e5c1c751bd49833506 1440w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1920&amp;h=492&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=4782cf12c6436cd6230f702be90b52386907a522ce5dfbbb417f12cb9aa71b38 1920w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=2880&amp;h=738&amp;fx=2133&amp;fy=956&amp;format=webp&amp;c=575216d696104b2a9a3be8e5c0e12716cd85fb4158403795dcd595f8233f7dd2 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1440&amp;h=369&amp;fx=2133&amp;fy=956&amp;c=57cc5e90541cbb8cb163c14834c8b1e731b2cafab2df3b7e17b8174020c40dcf 1440w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=1920&amp;h=492&amp;fx=2133&amp;fy=956&amp;c=133d0cf687bb35a9569affabb23f2e2f25024db3448e49f1147fb54a45c422fe 1920w,https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=2880&amp;h=738&amp;fx=2133&amp;fy=956&amp;c=e2a49bd9899bf2a85de78690f6bf923987da0a9190ba9c989af596a263a58378 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=633&amp;h=540&amp;fx=2133&amp;fy=956&amp;c=5ddc03f7b4bef6aa7a75627f8f2bf55871fd773f1d0d0fd717dfb9676b13903a" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=65&amp;fx=2133&amp;fy=956&amp;c=6c0499f708df4a5ec2eca820ac205dfc8afa758f6d8efc96facecd34f0bab0d0" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=40&amp;fx=2133&amp;fy=956&amp;c=feb5d522f903af26e2f0d0eb438c1fef86e55aef83ee8886c3bcd5af7306b411" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=22&amp;fx=2133&amp;fy=956&amp;c=779f48ba1e9deb6746c456dfc91725a774283bd4d79c265f0781eb90b4d39a21" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=15&amp;fx=2133&amp;fy=956&amp;c=88132842764e101b120ec2ffe81aad1d61a66ca8dfc404fae7fd44af2a4e974f" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=43&amp;fx=2133&amp;fy=956&amp;c=fc178b360bf60ac5091642456f29f3ef55eaea750bb007611b5c3bff57a21511" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=26&amp;fx=2133&amp;fy=956&amp;c=063fc16e795064d65bb9bff95328a04c8e9e37f1a4bf2b3750d1d18b801a0ed3" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=15&amp;fx=2133&amp;fy=956&amp;c=88132842764e101b120ec2ffe81aad1d61a66ca8dfc404fae7fd44af2a4e974f" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=10&amp;fx=2133&amp;fy=956&amp;c=8ded06f10836aa57a64e80000af04fc02f1383e244815dd737558e626f67423a" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=28&amp;fx=2133&amp;fy=956&amp;c=80e44bbcb3a82e389274ba33e9d4ab0ab6dc1208a643597c2f061d0a14a81dd5" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=17&amp;fx=2133&amp;fy=956&amp;c=214bf6ee4374af92bfeb64398ffd14cfa44fb8487e8d14e023254d89ad2ea178" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=9&amp;fx=2133&amp;fy=956&amp;c=bb0a0999afd26628e60c54c8dd95f3c8d3d0e861cedcfbd7156b869b1ce2d139" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=6&amp;fx=2133&amp;fy=956&amp;c=5fa1a194394757dcb19ff2df925d813c8cae4f9c575cbb50eaf22d21cb7b52c1" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=21&amp;fx=2133&amp;fy=956&amp;c=ec001aa4a2e898001e833d25cf39368630ed5d3ed2d13815b207b025b3e9a43e" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=13&amp;fx=2133&amp;fy=956&amp;c=04f3dbe3455e1cbbbe3b99c318d4f62f3b362ce9df8c4b2697c4d340a7084914" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=7&amp;fx=2133&amp;fy=956&amp;c=826e45a3882bf6fc6ba3edec71bbaf2d2cb546d7012bcf00db02e9fa905bb201" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=5&amp;fx=2133&amp;fy=956&amp;c=b308583e909f9115aabda76f93ed0b2317a591a4e93ed699b1ca4b83d6bc9ef3" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=20&amp;h=11&amp;fx=2133&amp;fy=956&amp;c=1904cacf850c7e7ab63a17d63c716530a555a4189d6e62b806b66348b156408d" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Zwart Goud
        </span>
      </h3>

        <p class="block-content-subtitle">
          t/m 31 december
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/operatie-nachtwacht" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center top"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=211&amp;h=694&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=46cdbc8502da137de63cc9f9353dc650a8db4014927b5e82a0f9e5a5b951cf99 211w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=250&amp;h=823&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=4b7c6df2f882e29d09db11089ca1696b4b32a1b580867d0c3df909a05a7cf564 250w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=273&amp;h=899&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=014e6f341c8c0ce8c7c06dd77bf2e0631088fe4c57a8077b95f65b7cef94ea84 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=211&amp;h=694&amp;fx=3091&amp;fy=1333&amp;c=7ce27a3c9476626fa21d886d5a9871a62209f3a70984385c5d7a3ecb314fa707 211w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=250&amp;h=823&amp;fx=3091&amp;fy=1333&amp;c=650b4d39ecb3e4952eaa444d8bbd7f8e80563ea88122900d9566f261bacab55c 250w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=273&amp;h=899&amp;fx=3091&amp;fy=1333&amp;c=1ae081ec8c30e4eb8eabcb75dd98f9e3ff0b543f4530c843bd65edf8c78ab751 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=254&amp;h=513&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=a3af4c14edf938dddf3c1403f7f719dcd2039b8788135ec7ac3ed787936b7897 254w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=475&amp;h=959&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=39431eecb755d7bc0678bf153145f5ef8d36c20cd26d0a833f55f9db05d6c2e5 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=254&amp;h=513&amp;fx=3091&amp;fy=1333&amp;c=513bed4f608e6af2570dc68989affe202d798a9be2c30eb7f7daeeb5055fb604 254w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=475&amp;h=959&amp;fx=3091&amp;fy=1333&amp;c=9afebfc562291c9db0ba407ed7f3cb22288a5ee0edd8a52ec0ad9d00a3a7f154 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=337&amp;h=383&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=625e48e064ab99d245df009e5d040816d05f95b022994d504fbf2d1725930333 337w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=475&amp;h=541&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=2da1ad7ce16ac6500c4af8ac05aec14cde46272d681cf63173f649784a5672f0 475w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=675&amp;h=768&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=e98ff030927f98e825ce73ede351ed5ee8766a80b7dca3ad823250eda004e0e0 675w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=950&amp;h=1082&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=2eb7f9107b451ae0af45bfa01c7f9019043e9c15a9c0cd7924595e2915b53f7d 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=337&amp;h=383&amp;fx=3091&amp;fy=1333&amp;c=4aa65e5bd295e504b121a8c65fb66b88d6a530c1dc24679400673f2dd6067f55 337w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=475&amp;h=541&amp;fx=3091&amp;fy=1333&amp;c=7f4a66431e68cb2befc5d244f182c0de9a2c6d9bbc79940f949166360fb73b37 475w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=675&amp;h=768&amp;fx=3091&amp;fy=1333&amp;c=ff9609a33dec6d74d0f29a46c65c08d1202f3535cc038006433f498a8076d15f 675w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=950&amp;h=1082&amp;fx=3091&amp;fy=1333&amp;c=62417eb02a18b9454eafd2685ee4ebe4380a66ed4c3c151548e83d445b632456 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=475&amp;h=369&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=377752be677b3e24221057ad29bedb10badc1459c4c10e27733573285085a186 475w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=633&amp;h=491&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=60399cfef98a2086a5fb06e743c880049c32cb889c0620fab0017c67a898f8b0 633w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=950&amp;h=738&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=a30b188a76fb46ad0c55d9eb01c08778f9765aecbdd7fc2bd3e93d01d44e044d 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=475&amp;h=369&amp;fx=3091&amp;fy=1333&amp;c=2f68213197f6f0291ef071c4ad5a9edfb264d6111089d2f54a5e3c8ad1a0b48d 475w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=633&amp;h=491&amp;fx=3091&amp;fy=1333&amp;c=2c65caaf6ccd57d8f819991e5b7a122f870635074943eb2545aab29944d6eed1 633w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=950&amp;h=738&amp;fx=3091&amp;fy=1333&amp;c=22b23c12092587d5452d035468c3c698fdc2b023a9dc974b2f5b715a061728e0 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=320&amp;h=695&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=1b2133602bd804355b481c1bd2f1c6ac0f46130ddbb5f22fc22d205aebad37da 320w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=380&amp;h=826&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=40bc5813290d563e284181bb34768fbdfff3a70ce99a384f2cd76156bc1f3dd3 380w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=415&amp;h=902&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=2d1ac58ad34870f15fb7bcaad2e81541602ee9d1d04b5f34ae5dd882a5ffbe2e 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=320&amp;h=695&amp;fx=3091&amp;fy=1333&amp;c=bfd306e183fcbe7dcbccccd81b9ceadbbb93f2f3b919e461180d7d5b46cc908c 320w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=380&amp;h=826&amp;fx=3091&amp;fy=1333&amp;c=9fa2588204e70c2f6b8eace9db13efb88d9a2db77f84f9e29c373bffdc7bd650 380w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=415&amp;h=902&amp;fx=3091&amp;fy=1333&amp;c=c799aafcfc9d2b737e24307df1674a83c8eae888c2c12d99076a6ae61b11f9ab 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=385&amp;h=513&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=3195789c58037946e0171ba29a9838631967c1a6263df2ee12e98e7140c1f153 385w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=960&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=0750782cbb24a263521125eeb3738f1a431375124b48fb78d9190fdc4c9c74c8 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=385&amp;h=513&amp;fx=3091&amp;fy=1333&amp;c=142f3b31e1e406664f210d307037304bc2b11d3b804348c9a0095c38c814dfaa 385w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=960&amp;fx=3091&amp;fy=1333&amp;c=c5d66f502c0938ec32fa1a349189dc6f2eabd91f77893edc212544bf4e274cb4 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=512&amp;h=384&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=72e0552ce2df8e7791731bf5efbbe5828c66ea5c92f0fcc11ebef52cf7e85f94 512w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=541&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=3c56e075f72cca2687198a283d267d0c703c69c89d368817e1bd868e4c857ef9 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1024&amp;h=769&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=93b18b2302dd0f75c28338c8d6cd583438e856f6dae88de295cf1c9d7e13779c 1024w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=1082&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=8aa62cf7c071eff22b853d1ff5a18222f33517c85c57055841fa85303f8229c1 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=512&amp;h=384&amp;fx=3091&amp;fy=1333&amp;c=3c15af0b563571815ae54947576694765addd27c3ab98c02c60e0675d14055fc 512w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=541&amp;fx=3091&amp;fy=1333&amp;c=e87f7139aaa33dcb784948483f7048e4d75f89ecb4cebff9ef3583a9ff3eb4a0 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1024&amp;h=769&amp;fx=3091&amp;fy=1333&amp;c=922af6cd0265c3b66e6868a2900fc0b71d136bd2a6ed34e765a76763fdae2754 1024w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=1082&amp;fx=3091&amp;fy=1333&amp;c=2df743f001273b8af510c3b63be6b54005b9a3eb96e1d96a304d8d17602c9ea2 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=369&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=d8ee966d66a47a193f45f81d3f780beadeb17d51870f6503d920e1106a0b6c75 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=960&amp;h=492&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=87c11c36cfe47fcdbe9efaa9a16d417c210db9c912a5d76ac35da3fcc6b2d6f8 960w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=738&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=4bafb96a5b715524d217ad7ed623960ac791369d6e839a55c2b58790e29381af 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=369&amp;fx=3091&amp;fy=1333&amp;c=a75f6c93b9d270a107b28106e91788e42b1cea226482bcaa102330574150f450 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=960&amp;h=492&amp;fx=3091&amp;fy=1333&amp;c=4d937321c3273d9ab2c265a3a7f371e3b33321754744d4c7d0e8a9a92df7be63 960w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=738&amp;fx=3091&amp;fy=1333&amp;c=c63b85b0835a12c48a43c9892762541a15f23907eda8be2db89529fc4aedd511 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=320&amp;h=459&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=818766ae3c88e06a671cc3c42acb2ec51fc70f0d6e4b5d1f80e307e28ec19bc9 320w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=380&amp;h=545&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=95bca1dfdf5502927f65990881336cf6d8573e08670507804c5b8499e861462d 380w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=415&amp;h=595&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=a750a0eff73b72786ff538acaefd45765f772a92ddac4a7ff4a3ae91072862eb 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=320&amp;h=459&amp;fx=3091&amp;fy=1333&amp;c=76eae1b4623e4d190e9e17d28e4dab81afaa6c1787fd7541b01b51aee13b37f4 320w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=380&amp;h=545&amp;fx=3091&amp;fy=1333&amp;c=31e7b7c02894c9e4055fc8c4e04fb8fb6f0546ecaea1c98a3c831c1705e78d1c 380w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=415&amp;h=595&amp;fx=3091&amp;fy=1333&amp;c=64a07a226ebc2e592181e0d518dd6139a72f5afe7d6690b5675748839042aad5 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=385&amp;h=338&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=c657f024614a5c1190338e629a7451c46aaa822d35d2da6a4597254b348caf01 385w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=633&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=11215286566296fca23efa11d4fc2485845b6e3ef0a1d86763a8ca562d3fbbf3 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=385&amp;h=338&amp;fx=3091&amp;fy=1333&amp;c=178fbe7388f277225b65eba6d3e5872dc458810c45f62ab254f9b4ac184bd041 385w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=633&amp;fx=3091&amp;fy=1333&amp;c=437ff296ef19b6349488379305e54d44eae30a1d21bd11c1c9dc132947726234 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=512&amp;h=254&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=b99eb7402b979a2bb59a4bbad8733849e62cbaa6fb7ef5ce71ccc63a5b1c0338 512w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=357&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=e9cc7123b10e0a2d8050397a0ac7558ef65195f4fcc06bd34eea9407ce82f388 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1024&amp;h=508&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=eff05e45444035a51de320979cb121ad47001c52cd0bdfdaf690c4d02feb5cbc 1024w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=714&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=61b99d200a61180ac50b67be37e49e31a6031ad8d8550bde354fdaa22357e95d 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=512&amp;h=254&amp;fx=3091&amp;fy=1333&amp;c=550cb4a6f4793e80b7518506b59f329906020f6a6bf6e6dedced51c25901ac99 512w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=357&amp;fx=3091&amp;fy=1333&amp;c=fbddd80078cbb3c965d6a986ce5467031f3e241818a6e8764de2959cc5dfffbf 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1024&amp;h=508&amp;fx=3091&amp;fy=1333&amp;c=984327b5d0c470f8037a52f48dedf0cc5e64fd21608935e29df1c1f308cf6e83 1024w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=714&amp;fx=3091&amp;fy=1333&amp;c=6adc2fb5d2b14647bc37ebaeb4d7aaed13aa57bd64676bd4aff1ab290456bd16 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=243&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=3f451729d85a29fc75d8b03049d36b76229688b1961d266cb60583882bcb9460 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=960&amp;h=324&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=5586b7699abd57b29327c77cc25c6c7125c7b2eb5e64f398d32ec38dcbf90b17 960w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=487&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=34dfe71d5836e1a8f066f58bb53c8d3ace11c0b70941251b7cb2e712c3a950d6 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=720&amp;h=243&amp;fx=3091&amp;fy=1333&amp;c=b95c02d1c2afae06b5d23bca8c9063974f619b9e08e7f3b785947738477deea1 720w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=960&amp;h=324&amp;fx=3091&amp;fy=1333&amp;c=82a82c7662b43fbe72aad1fa9287b5b0ec3edd4bd611bfbbc3c9413589155b7c 960w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=487&amp;fx=3091&amp;fy=1333&amp;c=36a8ee642b0a30a25ae198f3f4d1df30453c6fd81683dbd1e6e2335e6158ea67 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=640&amp;h=695&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=f4b65978e43a0202e9ef4f43a4f649196ce8cf1a50bacb69ddb33d0dce6f7131 640w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=760&amp;h=826&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=ae9c04c074051b267e9260ae466da09c813a15d9bb8cfe3dcf56cb3d3e8ec23f 760w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=830&amp;h=902&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=f3211bda9be22db62c0e05be1d725799dc0125d6e330db295069e3f0f17ffa39 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=640&amp;h=695&amp;fx=3091&amp;fy=1333&amp;c=4ef424957a1071e08263fd1a020f3625ea3df30f2a52669963fa5e8290e5bf44 640w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=760&amp;h=826&amp;fx=3091&amp;fy=1333&amp;c=68fdfb9b04e02f686f75c66ae4ffe89b3a60a46f291121cadedae48084cd0b46 760w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=830&amp;h=902&amp;fx=3091&amp;fy=1333&amp;c=e9a474e51414be15a1ad977f0c90843fc7c61715f13f61321788ed2eaae00b1e 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=770&amp;h=513&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=4706b4e596aed4f44fc4ed28fc19a91687f21ec7c10a954bce5d2ecca917399c 770w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=960&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=3994d6db84684227d6a4586869e010fc78d0a51ee1a838a8c4df2198b0c42004 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=770&amp;h=513&amp;fx=3091&amp;fy=1333&amp;c=a30b940e417fee76dc7264b7f00ec7abd77873eb98f2e3124d2ca27aadaab13c 770w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=960&amp;fx=3091&amp;fy=1333&amp;c=0c2a4288440a6ee9c76a09777745efb405fec7e26438f046b79396e4990cc5ea 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1024&amp;h=384&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=aa2468416ef826fa8ffb761c478962cad3e3948ba9b7f47a0b2eb9a991ec3eae 1024w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=541&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=e63cfc0f6a0844640659f71f118e457f9564652c9083bc01280b835f23fc3f91 1440w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=2048&amp;h=769&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=286cbd2df14a472408814c760aef6a23f65eb0a0946e4f828a72bf7a1b05c6d4 2048w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=2880&amp;h=1082&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=8131d670da1ae6756f1b8673f61f14ff940cd46dfbb3fb6be25c8232a862c9ec 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1024&amp;h=384&amp;fx=3091&amp;fy=1333&amp;c=b8db0661e4814336a74d40107881543531713de81e586a2103c96964ba9b4c8f 1024w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=541&amp;fx=3091&amp;fy=1333&amp;c=e66f6d1edaee99b7f8818f46cdfe3b254fb98034313b8b2267d0857c65600ff6 1440w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=2048&amp;h=769&amp;fx=3091&amp;fy=1333&amp;c=42487caf9b94011c2cf1ca6ec8b2841d87e5ef382989da5ed89649d6cab16560 2048w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=2880&amp;h=1082&amp;fx=3091&amp;fy=1333&amp;c=c8fc0b883af61f58cb0942d9851ea7e83df914372453d8db971bcd8b0e6062eb 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=369&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=f9b87377a331d33f4d232274f9770134c95330e06d8eaa01d2852d7c7ede57ce 1440w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1920&amp;h=492&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=5cb96eb4fba02f283abec3a89692a060dcb4748554ba6905dc649647db39ed4d 1920w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=2880&amp;h=738&amp;fx=3091&amp;fy=1333&amp;format=webp&amp;c=f02b0215c32d1d6dd40aefd48d00e8d5162a117c3bf8a25fd9de8b19fd0a126e 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1440&amp;h=369&amp;fx=3091&amp;fy=1333&amp;c=dd75358c3920db637ed9d05f91f5b109af185910b1501bc46de4eb0ec99bf1b2 1440w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=1920&amp;h=492&amp;fx=3091&amp;fy=1333&amp;c=1cfcb87349358eb3798eddc9be07bb8999c45f3b0ed3a14192a7400f69769081 1920w,https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=2880&amp;h=738&amp;fx=3091&amp;fy=1333&amp;c=dee896ab39db5faef8e5b891292298871672f5c5880b67f79c37b75dfecc4d18 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="Een meisje dat naar de Nachtwacht kijkt" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=633&amp;h=540&amp;fx=3091&amp;fy=1333&amp;c=995a4b8e35dc0d597f4651c1b242e4427bdcf99f71bf10f909d347312827c9ba" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=65&amp;fx=3091&amp;fy=1333&amp;c=f03ef449682ff9743cf7500ad999ca16a25512cbd9b6dfb74c2e228d1845e424" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=40&amp;fx=3091&amp;fy=1333&amp;c=79dc9f06c1f6757f0c72b905c7fe90456827be90363de97eebbebdafce816a42" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=22&amp;fx=3091&amp;fy=1333&amp;c=9d75d0aa6fdbbf3f2271bbbf5a64b75960d4995ed9739de8be3c237693908142" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=15&amp;fx=3091&amp;fy=1333&amp;c=e86183700781bd5e5a919ae565b387cadcf84e047e95be28779e1f8b61d95230" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=43&amp;fx=3091&amp;fy=1333&amp;c=cc681f18b77c34e644a77e445a78050202e90c4855c6485a0bd2d0548416a716" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=26&amp;fx=3091&amp;fy=1333&amp;c=5dda37130bc825a1ed842271f534618246fb3c5f759a2e29d6b499baf5f2cc30" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=15&amp;fx=3091&amp;fy=1333&amp;c=e86183700781bd5e5a919ae565b387cadcf84e047e95be28779e1f8b61d95230" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=10&amp;fx=3091&amp;fy=1333&amp;c=53dd2e8f83a9ea555655f140070ff99bb36c949a7111cc619cc1100a9f36db11" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=28&amp;fx=3091&amp;fy=1333&amp;c=1c2ef6848b29b55a248468acb7753abc83e10b04fa47f7f2d5b35e14279daf08" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=17&amp;fx=3091&amp;fy=1333&amp;c=cd01903f2c2b226d1ef7f61eb792cff4d58f042b2812d19a1fc71a229ff8aeca" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=9&amp;fx=3091&amp;fy=1333&amp;c=3de7b2ad077031cc0c6e6d6293158de08e5209a0026e38fd22354e57c168b350" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=6&amp;fx=3091&amp;fy=1333&amp;c=a418722fe96c50086080d1f0f08247d36e7a94943a537cccac5f18820825acf7" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=21&amp;fx=3091&amp;fy=1333&amp;c=c309f76600b1d45d2bb004729833f0d28b84e67d864ec1d1c586ab9749f48a02" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=13&amp;fx=3091&amp;fy=1333&amp;c=adf7fbcff5892d509f42c2712e10efc837606791e57b9a690162e50eaf507741" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=7&amp;fx=3091&amp;fy=1333&amp;c=2aa4f91f9a7ed86af706be0c73f6af936394054500a771d669a9b3c86e7de943" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=5&amp;fx=3091&amp;fy=1333&amp;c=981559d3bda993040db9c889c591f22c09aa743fafbf05df1014fa0155e22cf8" /><img :style="objectPositionStyle" alt="Een meisje dat naar de Nachtwacht kijkt" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/bff532fd-0cdb-4d1d-ae21-15fb49bc72d3?w=20&amp;h=11&amp;fx=3091&amp;fy=1333&amp;c=43ca3d125d3bf316c2b721ea3f1668efba757174283856d7689992c94f12c000" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Operatie Nachtwacht
        </span>
      </h3>

        <p class="block-content-subtitle">
          Kijk je mee?
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/reizende-tentoonstelling" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1482,0,849,2794/211,694/0/default.webp 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1482,0,848,2794/250,823/0/default.webp 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1482,0,848,2794/273,899/0/default.webp 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1482,0,849,2794/211,694/0/default.jpg 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1482,0,848,2794/250,823/0/default.jpg 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1482,0,848,2794/273,899/0/default.jpg 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1215,0,1383,2794/254,513/0/default.webp 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1215,0,1383,2794/475,959/0/default.webp 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1215,0,1383,2794/254,513/0/default.jpg 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1215,0,1383,2794/475,959/0/default.jpg 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/677,0,2458,2794/337,383/0/default.webp 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/680,0,2453,2794/475,541/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/679,0,2455,2794/675,768/0/default.webp 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/680,0,2453,2794/950,1082/0/default.webp 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/677,0,2458,2794/337,383/0/default.jpg 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/680,0,2453,2794/475,541/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/679,0,2455,2794/675,768/0/default.jpg 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/680,0,2453,2794/950,1082/0/default.jpg 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/108,0,3596,2794/475,369/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/105,0,3602,2794/633,491/0/default.webp 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/108,0,3596,2794/950,738/0/default.webp 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/108,0,3596,2794/475,369/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/105,0,3602,2794/633,491/0/default.jpg 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/108,0,3596,2794/950,738/0/default.jpg 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1263,0,1286,2794/320,695/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1264,0,1285,2794/380,826/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1264,0,1285,2794/415,902/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1263,0,1286,2794/320,695/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1264,0,1285,2794/380,826/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1264,0,1285,2794/415,902/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/858,0,2096,2794/385,513/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/859,0,2095,2794/720,960/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/858,0,2096,2794/385,513/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/859,0,2095,2794/720,960/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/44,0,3725,2794/512,384/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/47,0,3718,2794/720,541/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/46,0,3720,2794/1024,769/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/47,0,3718,2794/1440,1082/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/44,0,3725,2794/512,384/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/47,0,3718,2794/720,541/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/46,0,3720,2794/1024,769/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/47,0,3718,2794/1440,1082/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,421,3812,1953/720,369/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,421,3812,1953/960,492/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,421,3812,1953/1440,738/0/default.webp 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,421,3812,1953/720,369/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,421,3812,1953/960,492/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,421,3812,1953/1440,738/0/default.jpg 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/933,0,1947,2794/320,459/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/932,0,1948,2794/380,545/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/932,0,1948,2794/415,595/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/933,0,1947,2794/320,459/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/932,0,1948,2794/380,545/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/932,0,1948,2794/415,595/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/315,0,3182,2794/385,338/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/317,0,3178,2794/720,633/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/315,0,3182,2794/385,338/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/317,0,3178,2794/720,633/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1891/512,254/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1890/720,357/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1891/1024,508/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1890/1440,714/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1891/512,254/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1890/720,357/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1891/1024,508/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,452,3812,1890/1440,714/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,754,3812,1286/720,243/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,754,3812,1286/960,324/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,753,3812,1289/1440,487/0/default.webp 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,754,3812,1286/720,243/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,754,3812,1286/960,324/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,753,3812,1289/1440,487/0/default.jpg 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/620,0,2572,2794/640,695/0/default.webp 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/621,0,2570,2794/760,826/0/default.webp 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/621,0,2570,2794/830,902/0/default.webp 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/620,0,2572,2794/640,695/0/default.jpg 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/621,0,2570,2794/760,826/0/default.jpg 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/621,0,2570,2794/830,902/0/default.jpg 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,128,3812,2539/770,513/0/default.webp 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,127,3812,2541/1440,960/0/default.webp 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,128,3812,2539/770,513/0/default.jpg 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,127,3812,2541/1440,960/0/default.jpg 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,683,3812,1429/1024,384/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,681,3812,1432/1440,541/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,682,3812,1431/2048,769/0/default.webp 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,681,3812,1432/2880,1082/0/default.webp 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,683,3812,1429/1024,384/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,681,3812,1432/1440,541/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,682,3812,1431/2048,769/0/default.jpg 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,681,3812,1432/2880,1082/0/default.jpg 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,909,3812,976/1440,369/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,909,3812,976/1920,492/0/default.webp 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,909,3812,976/2880,738/0/default.webp 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,909,3812,976/1440,369/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,909,3812,976/1920,492/0/default.jpg 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,909,3812,976/2880,738/0/default.jpg 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="Vissersschepen op het strand met vissers en vrouwen die de vangst sorteren" class="lazy-image not-loaded " data-src="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/269,0,3275,2794/633,540/0/default.jpg" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1477,0,859,2794/20,65/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1208,0,1397,2794/20,40/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/636,0,2540,2794/20,22/0/default.jpg" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/44,0,3725,2794/20,15/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/1257,0,1299,2794/20,43/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/832,0,2149,2794/20,26/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/44,0,3725,2794/20,15/0/default.jpg" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,444,3812,1906/20,10/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/909,0,1995,2794/20,28/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/263,0,3287,2794/20,17/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,540,3812,1715/20,9/0/default.jpg" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,826,3812,1143/20,6/0/default.jpg" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/576,0,2660,2794/20,21/0/default.jpg" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,159,3812,2477/20,13/0/default.jpg" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,730,3812,1334/20,7/0/default.jpg" /><source sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,921,3812,953/20,5/0/default.jpg" /><img :style="objectPositionStyle" alt="Vissersschepen op het strand met vissers en vrouwen die de vangst sorteren" class="lazy-image-placeholder" src="https://rijks-api-iiif-server.azurewebsites.net/iiif/MzkiV/0,349,3812,2096/20,11/0/default.jpg" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Koele wateren
        </span>
      </h3>

        <p class="block-content-subtitle">
          Reizende tentoonstelling
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/schiphol" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=211&amp;h=694&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=6e72df638275ccbbf48aa573cb8559698d5eb0d9b431c1e92872bcdf971c440b 211w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=250&amp;h=823&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=0e1fe0216636ca314325e23ffc3cc693dad8d9176cf2c8aebef54b28e86641e1 250w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=273&amp;h=899&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=b6989c744a8f2dd1b196b6b504482744ff78f36db3d30cea7c2ca51fee6b3973 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=211&amp;h=694&amp;fx=3732&amp;fy=2603&amp;c=46da2c98f062fda97c18ac8bc1645c912278474a2fe289d2ae52a415e2c96448 211w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=250&amp;h=823&amp;fx=3732&amp;fy=2603&amp;c=7dfa1ca2942b7521ee28b41612e328e6e6f41494226912c8d11328794fdafce9 250w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=273&amp;h=899&amp;fx=3732&amp;fy=2603&amp;c=7f0e846b998d9551cd2f36dafa6659022441502c4f83b0c4aed3dbbd5c90c4ec 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=254&amp;h=513&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=e6c911ab6199e5daab9896390e35a487891ccd15bb690da0eb8b50898a2bd6a4 254w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=475&amp;h=959&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=7b24c9d51976cb3115f2662d5eeed706db21e728490e78a5365e1b5e200317c2 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=254&amp;h=513&amp;fx=3732&amp;fy=2603&amp;c=f97fa64b0cf9ede3873221b4447a6ac218024d731c96993ef3efaea1ebd59351 254w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=475&amp;h=959&amp;fx=3732&amp;fy=2603&amp;c=42abdca08883bc72118e97e9bebeec413c68a8dafc868926b9cf82501df0008e 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=337&amp;h=383&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=879e712469896a002ee9b3f328f7de06cfcb94f168bfc9d31bed42a9d922140f 337w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=475&amp;h=541&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=a1a1925fdbf6d74e3c2d161fec595bbff4e13b7a8855640132ab828bc48ff7cc 475w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=675&amp;h=768&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=c65f98829ad9d743e365776fccbd53a19074e83c171ccc257db7c6ef10a5347b 675w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=950&amp;h=1082&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=3a863050933c61e25cd2a28c355e1681c51220219d1efa661a101a10d6a7548d 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=337&amp;h=383&amp;fx=3732&amp;fy=2603&amp;c=bf52d5199a816cff4547d8131a71f480f031a1319211d31bba49349dc447eabc 337w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=475&amp;h=541&amp;fx=3732&amp;fy=2603&amp;c=c1048cb7671df7cec390d8ee5580b5243cf711b83ed5e21a01245cb91b32353b 475w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=675&amp;h=768&amp;fx=3732&amp;fy=2603&amp;c=d0d4157c88f2b975ea2b1c6b2c751e54620193a04a36301da5665dee5f538528 675w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=950&amp;h=1082&amp;fx=3732&amp;fy=2603&amp;c=627e050a61e9a18f8521688b27769bf0219e9cc9d9cb6caed38281206f00f130 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=475&amp;h=369&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=14443984a8e823976a333bdd4b55c89ad073806a0560278495944067abe66d1e 475w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=633&amp;h=491&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=caa01693f2f4f90f7c0a177fe7b6ea9cf43c3a60d0eb32b4ca5af1f0842e04c1 633w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=950&amp;h=738&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=a1103dafda80e048789222b2b10ae22de4fe053ad5ab4786e29c873ad9364994 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=475&amp;h=369&amp;fx=3732&amp;fy=2603&amp;c=c26a1256533c99a0a80eac27f3add9009c385f64507964d147ee6316d78d8f6b 475w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=633&amp;h=491&amp;fx=3732&amp;fy=2603&amp;c=4ed60491dc591daaa7fcf3aed36a59712fed7160e6c947a74fc7a8863af86107 633w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=950&amp;h=738&amp;fx=3732&amp;fy=2603&amp;c=f4c96eb01d17c629d5bd3989302a4f2f074da94814cd28df2a2cd7e4ab342848 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=320&amp;h=695&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=7530959d1f958b40078601007d6a8d4c26aeedebb99be35982b3aba8d501d849 320w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=380&amp;h=826&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=8dc2a6cfe26c35e653a9ecd1d66f3fece0efecbf1189a66014f6e126db8c9667 380w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=415&amp;h=902&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=c0417ffc1f269185ca71edbe114d20a0e66cef120d92194a999b81ce53c21161 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=320&amp;h=695&amp;fx=3732&amp;fy=2603&amp;c=a80e113c606842a93e3986cb5ff5a326219bcf0b03f0c16549cc62277a2c903f 320w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=380&amp;h=826&amp;fx=3732&amp;fy=2603&amp;c=3d57014f217afae8f4026fdcac6195e694b48daa47400fd12099bfd594e7ead3 380w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=415&amp;h=902&amp;fx=3732&amp;fy=2603&amp;c=c2c0df0d1c59b4f36ebcd5067d1059ebd85d3b0f80fda092e82975c7a0cdc314 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=385&amp;h=513&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=39a4f3498ea6658abf819d29d20c89c21913544db083d895d99d531bbe9f6584 385w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=960&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=06936760d5ef3ca0e22f57124649e1b03da5dde45c5eaceaebf57527f5d1c9d2 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=385&amp;h=513&amp;fx=3732&amp;fy=2603&amp;c=745025bec77d4c4d2d4935bd0c82a5531b21b40198bd8b7358edbae19a0530e8 385w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=960&amp;fx=3732&amp;fy=2603&amp;c=8e508e7ed782c4d439e9d43608297cc72fe0d75a08d1fb12182beafb8b9aae36 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=512&amp;h=384&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=eaddf78e7a7bef85b6965be1d99c8653ece4ba54c27b4714b806d55dd77170e3 512w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=541&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=01150563cd6b3145c58766b493f2b8a36cbd6cde77ade0f5c5605d38d3d9d5db 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1024&amp;h=769&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=65d25d999fa3e8b68444dfa1c900913ae9f6285880b242b54fcb44f93f8ce6ca 1024w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=1082&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=d34055914ae892f2cdcd91de042687307c49ceb6b520b37c9b1df6e7865ec6b1 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=512&amp;h=384&amp;fx=3732&amp;fy=2603&amp;c=6b9ba38b38110eae94bf44314905c8052287a17a0822652ebd0701a6afd26c85 512w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=541&amp;fx=3732&amp;fy=2603&amp;c=15871db78582daa3fae92d13c3c242303865393ebef10527e8a44f68bea3bf68 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1024&amp;h=769&amp;fx=3732&amp;fy=2603&amp;c=056a98bcd4ae29f8239aac33268f2a8996169cd27eb046e45fa85ac47e495b6d 1024w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=1082&amp;fx=3732&amp;fy=2603&amp;c=dd3c6b164e3bd6b1c35e364725e49c88ff68f740388e1118dc2e4291b190a6cf 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=369&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=eb98ddac0385c8a8100923d7da884508734ba4b73124130c36f9bd2e4b488f2e 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=960&amp;h=492&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=8cbfa78e3c2702c2bbca5628b89592e2056530606bf42488e60a499e2450e17a 960w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=738&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=8e908e9a1870cfac79fa2c8cc016b9c93487396d383d4050d7ae22c2d1e92142 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=369&amp;fx=3732&amp;fy=2603&amp;c=b640cf75a92012e93c2e14e6795c21bf847aa2ee0c6ceeeb41bb6eb7136c6e6d 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=960&amp;h=492&amp;fx=3732&amp;fy=2603&amp;c=dd8895846699db5df1c6fea316197bf22e8baa7c9d93b719ee1b74f6781a6be2 960w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=738&amp;fx=3732&amp;fy=2603&amp;c=41c415bf4f02431de913e44f818bb3be9c6bd4f18b2a8acf8a3e642bb600d452 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=320&amp;h=459&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=a0fd4634587b336e7ea2c65113edae5b7330bdfb96071996f396c108939d9356 320w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=380&amp;h=545&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=3ed3a091a826d2272f7c63845f8e7d88b4ac0d9b0968ea901c6114656034a902 380w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=415&amp;h=595&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=e60a94fa902acf736500f8694ef093ad74f947ffee0b095b975b42848e5dfc6a 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=320&amp;h=459&amp;fx=3732&amp;fy=2603&amp;c=738e07b199b0dd2dac1f0620c24944030f0574a14283439fe7ca846ccbd378ff 320w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=380&amp;h=545&amp;fx=3732&amp;fy=2603&amp;c=a2211993043414c93008402d10d12c1cf4ea2d75ca406465a8726b17910c9d1c 380w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=415&amp;h=595&amp;fx=3732&amp;fy=2603&amp;c=659b94c20274d4231a447613161efad9af0c908b825dc356c58409c7eb40d3c5 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=385&amp;h=338&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=a361b42c65645e9066448be9cf3bad5ea22e45746dc1d792b1f85de474e25b9b 385w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=633&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=ad34b71543975f3124f954b54bedfb09d293d15b209e715d14c615df9d39ef84 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=385&amp;h=338&amp;fx=3732&amp;fy=2603&amp;c=2c8b071e58ca36393433102b1254c8a975e9cba58314c0c07c11457379c63e4a 385w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=633&amp;fx=3732&amp;fy=2603&amp;c=b2b02283b724a0249b9646b7336708bc7fbe55b0ac199ac67d19fbd39b76538f 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=512&amp;h=254&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=7c4d8703361310fb0fde846c6ac6fe09cb3d22a07fbec620743a20795706a534 512w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=357&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=19dd72ef3b73dc4e0d9b66fb2b052b1619f771f22249473ef784cd075ceeadad 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1024&amp;h=508&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=5049c06d05c02d60ac1c24426f8cf2ca676dce489f56f3653a78d2e5ec8bf516 1024w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=714&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=539cac9b20f453a8ab1f1958fcc95b70881e17b187e519965729eb1cfae1dd40 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=512&amp;h=254&amp;fx=3732&amp;fy=2603&amp;c=ca41232dbfdc3f36bdc29cdbf5887206d6321167b2f013cb5d9db470af15d07f 512w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=357&amp;fx=3732&amp;fy=2603&amp;c=598735dd51c7928ab752fe4a15ab523cadbd29c84910ca59e3976602773d01e2 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1024&amp;h=508&amp;fx=3732&amp;fy=2603&amp;c=5cd476dbd3c8365a335aeb5ec8867520aa6bc6ce3a22f453c9d7b474e5756194 1024w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=714&amp;fx=3732&amp;fy=2603&amp;c=85435ff79f3e691b9ee7fde4e3ed204fe273a45b25caa4276423f80ff48a16d4 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=243&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=5533f331f5da5ef27aeb7e30bbffe0c979b4660002a203eaccf1670d0476983a 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=960&amp;h=324&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=6f1c5c7d8decf64df1b11cf5a4eeb6b90503486249b31d640b4ca39c9d21a1d8 960w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=487&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=ffc0dbd8d80ac83a63140bfe6464934ce523dc683acf42f3dc75bf43476b0028 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=720&amp;h=243&amp;fx=3732&amp;fy=2603&amp;c=a1cc28c8e5baf383a7b778ad322300f888bb5d7efd3aa1f04c6392fb4be98472 720w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=960&amp;h=324&amp;fx=3732&amp;fy=2603&amp;c=3a1b06067d5a00e8acf255be88abe00fc971b68b01f2b85d4ddc298508896f33 960w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=487&amp;fx=3732&amp;fy=2603&amp;c=2c7e7d4f46b876a0c5213879089321570655653b9e98e57845cd271dc8139d29 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=640&amp;h=695&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=6aa7fab7c0d75435974aab4596ee539f4c645f7052eca7edb00bcff82e131955 640w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=760&amp;h=826&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=3f1f8b5789109e8343d87aaa8488be6aced21d1f97d8b4b417f4d5a0cfb79f19 760w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=830&amp;h=902&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=de69bcec24035c81dd39d9aad19b17bcbf8c058a55e9fbebddd986b012cc5e53 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=640&amp;h=695&amp;fx=3732&amp;fy=2603&amp;c=ce7c771e7075047f4aedc0819253d45a7888543e5b2271ae3ae8eab300373c59 640w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=760&amp;h=826&amp;fx=3732&amp;fy=2603&amp;c=932caad0ad4838eea8f10c54125d192dcb5e850c79b245aec4722f59e7b3b039 760w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=830&amp;h=902&amp;fx=3732&amp;fy=2603&amp;c=fc090cbd942bd33ebfbcb5ee54917b731ad1868bc3185508959f86e8b614108c 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=770&amp;h=513&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=aa59e9c0918032ef18b8fc2a643b1c425cd6861a5584941b4481122f144ed9d7 770w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=960&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=ee58687e170b17af91febfe053f5a8f4f4bdfbb5d3b9016ab74ed5a874481229 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=770&amp;h=513&amp;fx=3732&amp;fy=2603&amp;c=79c16651f1139decf4cc2f2cb3a3eac620e8e74c52df3298fd33133be5d56caf 770w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=960&amp;fx=3732&amp;fy=2603&amp;c=d1a15aedc716de2d2817577a3aa2e32a19f41974d7a1c438f9677ea8f35c3aad 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1024&amp;h=384&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=f8cd2263e40d1762520aacfa9582d5dd31e53273656ca1958455743706fb0dd4 1024w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=541&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=30a1fc19e0368c2d4652f475e90175df5f4557c7a02941ccc1e288052d8b1215 1440w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=2048&amp;h=769&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=882b5961779d6a747ece5f80d878aaf2925faae3bdd7ce670d8a019573f7491d 2048w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=2880&amp;h=1082&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=4b800689b604d8d1f6d200af0b2e47bdaa7c9cf3d757de3653689be1ae292386 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1024&amp;h=384&amp;fx=3732&amp;fy=2603&amp;c=22b8ccdb80ee32d7c606b5436520302ffcdca38971596323c2bc69fb0fd58c75 1024w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=541&amp;fx=3732&amp;fy=2603&amp;c=35c00029787301ecb29b2724de282ab6ee098295dde2d92e27f97d58b925de08 1440w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=2048&amp;h=769&amp;fx=3732&amp;fy=2603&amp;c=82a5f8c27a1926f71079627111dad4387265f8965b1b6bf37e08079257808c9f 2048w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=2880&amp;h=1082&amp;fx=3732&amp;fy=2603&amp;c=6d1d58de65e41d27f80a81d380d62567dbf4f65b8472c13b5f2c0a052786a477 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=369&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=695fe1863644115ec1699d0f1b74e2aa0a8c0779603425e6ab40560ea26e01dd 1440w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1920&amp;h=492&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=57177be84ef79d257e34a5ddbcd77d94f3e3bd4e98b6c60743c4abeeac9a283e 1920w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=2880&amp;h=738&amp;fx=3732&amp;fy=2603&amp;format=webp&amp;c=e91febbfd93f4b46b7f8e3ee37b91efdfee6b002d097e0aedc41fef11773c528 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1440&amp;h=369&amp;fx=3732&amp;fy=2603&amp;c=f8625ef7c1ff745bc6ee9f121e12baa689b3d45634e7d92298edf2125e794b22 1440w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=1920&amp;h=492&amp;fx=3732&amp;fy=2603&amp;c=7e9efcba6689be129414349f4ba87de441aa0575937bfa4148927a0f19d7b660 1920w,https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=2880&amp;h=738&amp;fx=3732&amp;fy=2603&amp;c=b8563eafc4d590e7db8949f9ca1fd86dcc5f3cc8f9042d7c92567cbaeb15ffd8 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=633&amp;h=540&amp;fx=3732&amp;fy=2603&amp;c=34597be7a913678affb626a4b22e248d398a8120538b03318084cd39b166a220" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=65&amp;fx=3732&amp;fy=2603&amp;c=3f2036560eac898f4d0de332d01b7265aef10757ac19c058d83912337af90eb3" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=40&amp;fx=3732&amp;fy=2603&amp;c=7c75ae79fe5093277fad4ef90318e06a09ab1e6e292bce4c48b06e6bf226d8bf" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=22&amp;fx=3732&amp;fy=2603&amp;c=0a8fbf9f3c03cd4595242e556102a063f6b0d32200b503890802d2fa87ff41b5" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=15&amp;fx=3732&amp;fy=2603&amp;c=5cabad92424f3e96cf222dc327d0528063c690e8226758e1f1721c2e284eb60e" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=43&amp;fx=3732&amp;fy=2603&amp;c=d36bbd26553ddec10a84d186502978aa67bf66ffbbf203668f83165b2d1790e5" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=26&amp;fx=3732&amp;fy=2603&amp;c=fbeb99cdda517fe41b63767045fe70dff4cab1c8c1c2affce76f4cb028ac54ab" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=15&amp;fx=3732&amp;fy=2603&amp;c=5cabad92424f3e96cf222dc327d0528063c690e8226758e1f1721c2e284eb60e" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=10&amp;fx=3732&amp;fy=2603&amp;c=2a3f6d8a4539203ac1ed2fb3c88d261d770e16cca24d02f3e8b037961728cb11" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=28&amp;fx=3732&amp;fy=2603&amp;c=69eab55d6196b540eeb8736f1fcde21e24c7c542c5201c619361abfbbde3c3c6" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=17&amp;fx=3732&amp;fy=2603&amp;c=f0532936cf9e3b92e4530198b261a5ecaeaf714b4b5c23c06677f58587cd6d7b" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=9&amp;fx=3732&amp;fy=2603&amp;c=c09beadabb841043fd0dbd22bdd9eac07d17082dfa04f2868d024f6312354520" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=6&amp;fx=3732&amp;fy=2603&amp;c=67c1f681a0bedb84556b73644ea5d77c8306e85a4fdeb76e0ae8871890d599b4" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=21&amp;fx=3732&amp;fy=2603&amp;c=4f06b3f571f52c70157eab7604dfd0acb2f9554e8d76d5028ec0566fb0ddc591" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=13&amp;fx=3732&amp;fy=2603&amp;c=9850c186119f081c2d11cc728b03496339dde88625239578e863120ed947f90d" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=7&amp;fx=3732&amp;fy=2603&amp;c=d6f61a5607fe75fdb0e813cb6eb0f3b0b44bc5dbaacfe8cb0401e49d13c45a6f" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=5&amp;fx=3732&amp;fy=2603&amp;c=37cc69e041fb4609bfd53ede3d0c9b0a9094a943e591dd36ae666d43bef1fa1f" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/2383c8d5-2d84-4f1c-bf9e-b045fb34ade2?w=20&amp;h=11&amp;fx=3732&amp;fy=2603&amp;c=678e98f5139ed5c084ed138ce636f24ddc93d7b456d127916e229d1822196df8" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Rijksmuseum Schiphol
        </span>
      </h3>

        <p class="block-content-subtitle">
          Meesterwerken op Schiphol
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/muziekparade" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=211&amp;h=694&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=84a3d3e6938cee45de265cb1da0237c8f2fe3d80dde5fca2064f7aa748cf999f 211w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=250&amp;h=823&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=df29fc0601a38af95deccd66c22769ae99d18311c3751660b0d51fc2bad1fe60 250w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=273&amp;h=899&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=b93d99f6f771eed1b92e58bcd590ebd289cf044091f8c3359782814cbd4716f6 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=211&amp;h=694&amp;fx=1999&amp;fy=3312&amp;c=31615d88f96d043371874a133fef684001886c67377e22e446e7d1407f1ff07d 211w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=250&amp;h=823&amp;fx=1999&amp;fy=3312&amp;c=b7137295c123b8516ef9a85ca0b2012e2fd672ce795bf156ed53fd1ddedf71a5 250w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=273&amp;h=899&amp;fx=1999&amp;fy=3312&amp;c=6dc3a2058541260ebbb014a7a690b3b4bb963c435287bd2e8d9e9c26226d76dd 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=254&amp;h=513&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=68ba70cb383013fcbb71e007b9f1a6df2cf2eb995a282b1886dc0a331df2f1b5 254w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=475&amp;h=959&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=db23254ccdb9ee3fd0043367521c9184a398f8c741365946757051849c4fd2f7 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=254&amp;h=513&amp;fx=1999&amp;fy=3312&amp;c=84af2e155cc54d38d819f9a10f0645d4011192feb7dff84c944d429b99296cfa 254w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=475&amp;h=959&amp;fx=1999&amp;fy=3312&amp;c=6b2c65cd2216395da7ce3b0e5348a6473e1ba0537d83f55a35582f059601a980 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=337&amp;h=383&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=a38189f8d8ba76696f817bd26bbc48cfb23a07e7566316a2197f65abdc7da533 337w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=475&amp;h=541&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=8560e06d0fed43eb74c838ef96b228ce679c15318ed143d3125b987f94f03ac3 475w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=675&amp;h=768&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=95a31a884733db067d0f605c262f050ad56c5e1b7a69c1ffbc5c4861e906a7f1 675w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=950&amp;h=1082&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=03309bf48536be8c293bfbf66c79b4dbaed06292e26bec597bc717ce20306f6b 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=337&amp;h=383&amp;fx=1999&amp;fy=3312&amp;c=a16cc3ef06085ee42f5bb4eea0c887bc32e50d27e3650a6c31a42aa2e8a5ddd6 337w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=475&amp;h=541&amp;fx=1999&amp;fy=3312&amp;c=b4fc5efb35d1a9af0433297e8571d639f0061c93cccdee7db31c2013900752b8 475w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=675&amp;h=768&amp;fx=1999&amp;fy=3312&amp;c=468cc0e7ec6c9b33359fa157d0840cbe0239b4f71302f92e34973bc3444ace4e 675w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=950&amp;h=1082&amp;fx=1999&amp;fy=3312&amp;c=7173cedb738e09e0d4f8e203f5dcabb88afe5742ee82c7cdee9850766b4137fa 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=475&amp;h=369&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=fb9707af4072d019839c74827817edd4ee420c9d6a0597daae61b920569c3ca4 475w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=633&amp;h=491&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=3feb0a751bcf73717404e4fae36f4e5aa7d85c6119aa1cb7a8a2031d0c6aea46 633w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=950&amp;h=738&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=81155a8f91b722be43746a003538315b81bfa8d1612d95a0a47c406e58ab7b36 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=475&amp;h=369&amp;fx=1999&amp;fy=3312&amp;c=48715e8d879dc4c806c73e6ea5246581d5f21bbef94d8be40c14e80efd5273c6 475w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=633&amp;h=491&amp;fx=1999&amp;fy=3312&amp;c=5c32e6a8ebdc1e3c670603b4077ea3e82c35f128845c20363de6cf704278cc23 633w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=950&amp;h=738&amp;fx=1999&amp;fy=3312&amp;c=1921ace8f549af7e147fddbe36b1a804cff86c9052b67df9336947fcc6e64cf9 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=320&amp;h=695&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=98afdda536287e4138b4ba51576bb64bc2b436d3250dbac85c4641e211d737f0 320w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=380&amp;h=826&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=dbca051f93e193a7841ecb0512b8b2b2a2e793f9080e462bcc447205f3873832 380w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=415&amp;h=902&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=52f6a0cf519ad5a4a0c3e82b8d1b3c26fb74dd5b196dc8e07e49b6446b8954af 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=320&amp;h=695&amp;fx=1999&amp;fy=3312&amp;c=47eb14ecb6415bc947ad6aa71a4d00abe1c37a461c1db140e4759f5a18994304 320w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=380&amp;h=826&amp;fx=1999&amp;fy=3312&amp;c=cf64575f35f8c8a5a2fbb957cd5c2ee048a8e4399388d846ea51f0cd7745ef43 380w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=415&amp;h=902&amp;fx=1999&amp;fy=3312&amp;c=56dd1e0ba7fc5aab8bb5b98222c141b2c734779202ba4d78a2fd7da02c8af575 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=385&amp;h=513&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=adb931e58992d5ce4c49403bfd6bcf862332d292f3e77e14140336a6fcf978f5 385w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=960&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=081973246169c26ed5d8d8962ed4f376d2f4aeb90b5b12357f11e40007563830 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=385&amp;h=513&amp;fx=1999&amp;fy=3312&amp;c=890668d4cbd685d15bf1ae8ede14edafc3b5d55f5fb310a8f7fd153ffa5b053e 385w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=960&amp;fx=1999&amp;fy=3312&amp;c=fee7769556ad9de42eec0acf3db6d92fabb947a0b158c75718a3e4ea8901ab2e 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=512&amp;h=384&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=400517840c5f8151f2d0234856b18a02a05956d7402816fd67f9ff702576ffea 512w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=541&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=7ff7e5798c7e007467d885b95e3ccc070562c50338d50647a8feaec3cc1fc8ab 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1024&amp;h=769&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=067e01dbaf8fc54202159265390c773cb0fd869a1770028a0734bbc94a4592b0 1024w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=1082&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=23d7c722947d585e60c7e2880bdb69160df73be02c249af99c61f78c629f6446 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=512&amp;h=384&amp;fx=1999&amp;fy=3312&amp;c=109fd86a85779edbbf9a3f138ca5f379efcf2f0841eea66c5484f348e2311cb2 512w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=541&amp;fx=1999&amp;fy=3312&amp;c=b9b9ab748a96a090b879ddf46e584518afa3b9b25ff2d03ef4bb7457be6f436b 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1024&amp;h=769&amp;fx=1999&amp;fy=3312&amp;c=a33215ee90f70f0ede0c13308e6618cb642071a57a97097848d4d284d9432196 1024w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=1082&amp;fx=1999&amp;fy=3312&amp;c=b6b73acd753e696d9f795f5c7700c13643a9c84d67cff7b1b4123212457401d3 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=369&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=d2e1325ba27304b9686c5f088f400286ed52405a5511c72b6847e525c8ab2717 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=960&amp;h=492&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=872f2391a2c519bee9b30b7a22c724ec4a504fc288676011277f665cefd44d53 960w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=738&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=ff65496dfc69c29879fcfc219353f3ccad1d92dfb16645e118fc36cbe78c7330 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=369&amp;fx=1999&amp;fy=3312&amp;c=b3215e604745a9e472d924e81a11c9f392d68f18928a36e93879ed4eeaf03893 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=960&amp;h=492&amp;fx=1999&amp;fy=3312&amp;c=4fb5f0ebe6ef3ea84b30a2b683f6a58d7d2bf4537f08deca465ab7829a25c7e1 960w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=738&amp;fx=1999&amp;fy=3312&amp;c=e82dc3b5471f4ba3039cfdb49b8514173d349e0a79ce55c2f87db26e263356cb 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=320&amp;h=459&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=1efc31d2667ce1a4e1e1365a2272cdcb458adc29d95ae7722669197818364555 320w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=380&amp;h=545&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=7018b2a61aced65e201dcc8fa542ef6b3b2562854792e7393a4ce504b991452d 380w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=415&amp;h=595&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=a475b7855a3cf880a45fe396bc1a902982684cd254a8738761515d0ca77d7ef8 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=320&amp;h=459&amp;fx=1999&amp;fy=3312&amp;c=80d3cf0a173213346e7739c0ae6c08d25f95b98a7e7ec275da2aefcc3f7863cd 320w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=380&amp;h=545&amp;fx=1999&amp;fy=3312&amp;c=9deb1bd863842e7cbadb2e7dda74a3f3ab3a485e3244a706077d55db58dc1889 380w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=415&amp;h=595&amp;fx=1999&amp;fy=3312&amp;c=a7b71ea43073a0a79710d334323e0d7bd224115315951061608593b8926112c5 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=385&amp;h=338&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=9c1f5ab0eadbaa682ddf09116900e6528a985dc928defe8bc4b4dc025dcd3582 385w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=633&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=5b0a4c1a85a57c218e7cb9f22766269995e8fee8326500a7d3e01fd850b10ab0 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=385&amp;h=338&amp;fx=1999&amp;fy=3312&amp;c=804c05ad5758a6a14a4b9a65b4391b008cefb9c94a225d355b33e670511d7651 385w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=633&amp;fx=1999&amp;fy=3312&amp;c=cee59dc45c25f2db14afa18447130d93b90212049fc49f3ff5ac2115accedf34 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=512&amp;h=254&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=9897f9504b5e39ffe5088f5c9487538b9b98b2e136c0a92f46a3afad3623d9af 512w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=357&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=c4381bcfb63b190894230c7cf80de6ece95687155bf2c6cebdff712682538eeb 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1024&amp;h=508&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=50cdeb9bedd84695d02978723685dfd20e294ce99d116dca0b384f9d430c127d 1024w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=714&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=9124d2ce8566fbf2505ad3c690d7c629abe164c20ae703f08de4e4e8a8d52ae6 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=512&amp;h=254&amp;fx=1999&amp;fy=3312&amp;c=67df9e852dea851f1f70758e9e6b5ba406c9a08845a9341c9c10daea2c6071bb 512w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=357&amp;fx=1999&amp;fy=3312&amp;c=12a7a271b008a7538f34aa75ae4f4734c2adc4dcf9d78f344181e79aacf02784 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1024&amp;h=508&amp;fx=1999&amp;fy=3312&amp;c=2979e3088c5b60ebff8c1eec8420118116cab1f7fd992b8d95ff15c55aeaa9fc 1024w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=714&amp;fx=1999&amp;fy=3312&amp;c=e0c6dc2009923c9d680775e4c1794477aeda3676b3759dd4371a87b237e75a2c 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=243&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=358fdf16316567be8ff7850f9198756f1dc3ddc83f8d5a58223c7db813441f93 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=960&amp;h=324&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=079ef948386221c3d8e6e36f2520da2c913afd0657564970a5008c74df599fb4 960w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=487&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=b03cdaa3d1fdbc0e3aa8e2582e24ef56f04257c3d59e94835e45c0e9e9b4350c 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=720&amp;h=243&amp;fx=1999&amp;fy=3312&amp;c=87ca177738e6b7fbb6a7f4d4c0d686e7540e8afdb3e3bb813349552ff3a12f28 720w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=960&amp;h=324&amp;fx=1999&amp;fy=3312&amp;c=eef946d7469f3061b92de4072b21cf5b6c20702b28da3ddb82a45548f29d0857 960w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=487&amp;fx=1999&amp;fy=3312&amp;c=0a79c91e8b05057da9a9581797e7ce3b96d0374afc397cc6ecfcc656f1614373 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=640&amp;h=695&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=5ee976a7d66423b6c5a42f920357000da672d451b095c5ac53f5f6fbcf5d73ae 640w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=760&amp;h=826&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=e1c293511c38bc5ffe9539cf8e5db0acdabaa1550d105709a76ebe4fad44728f 760w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=830&amp;h=902&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=c3de44c849f502afc91d08cf16a1a05da4de319e880b9dc67352bfab32597747 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=640&amp;h=695&amp;fx=1999&amp;fy=3312&amp;c=d513736fe63ff78d2595e2d90e297ccd499b1e0c69d76bdf0cb12d49fdb88a21 640w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=760&amp;h=826&amp;fx=1999&amp;fy=3312&amp;c=232370c62e6e244a751daefa8763ac0b20e85bbacd5e3184456123ebe497f4bd 760w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=830&amp;h=902&amp;fx=1999&amp;fy=3312&amp;c=587bb54e6258e9c72ee3a017ca0ce17abbb1a78fbf471dff06805612727e28b8 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=770&amp;h=513&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=6d8ec34fc424a39df10807382fc87f9372883fe70205a731d3824e8059ccd9cc 770w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=960&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=edf04fd0b104d6f750323b80d7bdb0b1cfa8fba7e7cfe5f7df90095a02668abc 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=770&amp;h=513&amp;fx=1999&amp;fy=3312&amp;c=cbb32e4c8f60761d55853cdaed84049c401efb0524ef005dfd66840d972a0dfe 770w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=960&amp;fx=1999&amp;fy=3312&amp;c=32051bec8aa5b3a9d997cf7c2571d0358924b982a6644e68d8e2a2f36f78bec6 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1024&amp;h=384&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=758f8aa40b49256233411c5f251211cb9eaf5aeafe0e80d59a4971ac46638976 1024w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=541&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=4b963bffb76f4a4886d2e67c514f9453a0f9978e47f1128a5700f8177a8656b0 1440w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=2048&amp;h=769&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=8e9d004c92270c6a14076403b301cd146c69ece096460b232343e47e655866ad 2048w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=2880&amp;h=1082&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=795f887bbd5cd0bb6812f8326e4fc910e07628a6418850c407871d04a0e14d1e 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1024&amp;h=384&amp;fx=1999&amp;fy=3312&amp;c=02f7aca4cff289e2c4b23488abbe817fcf7250f2b81461a5da69c2b7e27c288a 1024w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=541&amp;fx=1999&amp;fy=3312&amp;c=325e5b93b6c3df2d86ea75155d0675eef2e61e4a93106ac810ab757932ee1593 1440w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=2048&amp;h=769&amp;fx=1999&amp;fy=3312&amp;c=604ae7477c16248694f0cf676f51e6973c7641527946ebd2a7835a34b4f227e8 2048w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=2880&amp;h=1082&amp;fx=1999&amp;fy=3312&amp;c=a18e7d4fbe870f1e07d5f8e4b25108816eb5bcff2825af6a4ce0ce927c7c9641 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=369&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=5b00759c31492aece5213082a98cc7255d3f03d5f17c6bd425600e6046380679 1440w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1920&amp;h=492&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=f6dd6890e50ad9c27784271871d3e6486f66217b4965eb63a7d4b0c27702f031 1920w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=2880&amp;h=738&amp;fx=1999&amp;fy=3312&amp;format=webp&amp;c=041e97c945c477b5c78dcc346b1a83e9263c281079e7a3dac1de4116e70ba80d 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1440&amp;h=369&amp;fx=1999&amp;fy=3312&amp;c=d8e2114c5c9e41cf3ed9b8b78f865e4a709f8a12d2ea93a3ede43aeb09ecc982 1440w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=1920&amp;h=492&amp;fx=1999&amp;fy=3312&amp;c=7193bf4ce2c0a5881a3b4688d3df078daf2479a08989639ba413c727ee15a3b6 1920w,https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=2880&amp;h=738&amp;fx=1999&amp;fy=3312&amp;c=ec383d45dc710efff7c364c955e29ebd378720af1f44b16738bee7922d983e25 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="Een vitrine met trommels" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=633&amp;h=540&amp;fx=1999&amp;fy=3312&amp;c=e48b42364df3f9e35d757ddf01801cface7e7e8928a39c2fee3f1fd1a4bb8457" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=65&amp;fx=1999&amp;fy=3312&amp;c=7f420f2e4799b2f137f8e86b5911d47de003efcc5ac03f6c168e299115dd76c6" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=40&amp;fx=1999&amp;fy=3312&amp;c=c1b977384c3ceabfac98cd9127955d5726e67deff6554bd4eada1c45e34b3829" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=22&amp;fx=1999&amp;fy=3312&amp;c=9213fe0aa56b8a3a632c631cacd908736bb0cf2de9660285f7573fa22b2338aa" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=15&amp;fx=1999&amp;fy=3312&amp;c=d070e191672f4f07f10bc381341aee6a6c21274b13c5ea148f4d8051124a2177" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=43&amp;fx=1999&amp;fy=3312&amp;c=98527268e50735dcb4678ea503f0104d8ce3a7dc982e3cdc0120151518d4a8c4" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=26&amp;fx=1999&amp;fy=3312&amp;c=87fe0818389928daf3cdbb3c1d6e801aa9b31e38b0689bdd27788206c729966a" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=15&amp;fx=1999&amp;fy=3312&amp;c=d070e191672f4f07f10bc381341aee6a6c21274b13c5ea148f4d8051124a2177" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=10&amp;fx=1999&amp;fy=3312&amp;c=5d1c974e93fdf2295ea6fe9162f4330c70307dcf51c852ba06a38d7abe47466d" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=28&amp;fx=1999&amp;fy=3312&amp;c=d49fe9d7d70e6316bf3a8b8c993d66fd5bdbe4f9152295d784a3730640271b0c" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=17&amp;fx=1999&amp;fy=3312&amp;c=3c414786e831810d78b0b73f3cc8772f8aef9d23ce8d081654f3b120f3e54674" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=9&amp;fx=1999&amp;fy=3312&amp;c=1972567d1ccc3cdd681156f6009c3146e3838fb46c7ed1360c5dbd1603ab8452" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=6&amp;fx=1999&amp;fy=3312&amp;c=06ae2193e82ff4726bb027824b4dbb02d75df2f4bdc4aeb84fd6937eaabe394b" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=21&amp;fx=1999&amp;fy=3312&amp;c=01a592a90b22a886e62b1a1614fd4579e6f3b7f42cf9f861c219ed2e0682fc8d" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=13&amp;fx=1999&amp;fy=3312&amp;c=c6472f492774291d0309274236f509260ab7b8f8f8a71de5953f3bc376bb15a8" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=7&amp;fx=1999&amp;fy=3312&amp;c=362d4689544fe47703969048d15b74dd39caea1b01136c2ec5868fe2f3c8d2ab" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=5&amp;fx=1999&amp;fy=3312&amp;c=005b6f492ef006bfd278c997738397ab4aa2fe3c2210df828a3d77f67bd9ffaf" /><img :style="objectPositionStyle" alt="Een vitrine met trommels" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=20&amp;h=11&amp;fx=1999&amp;fy=3312&amp;c=c2d447f2c7c90bc203985b009b4af244fdda66fdd3e345e09805df7ecd73cb11" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Muziekparade
        </span>
      </h3>

        <p class="block-content-subtitle">
          T/m 4 december
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/historisch-amsterdam" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=211&amp;h=694&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=5f11da865ad435e1e4161c648fe4b046e5722b214a3c757e6914aabf84e26064 211w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=250&amp;h=823&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=73f39614dc572e9aeb4f24eba13a3c9f25ddd51518d5df855217e9c4aecb035d 250w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=273&amp;h=899&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=e5388b15526d40ad627abc14178793085efbb6959fdb38ddd742fd64f649472d 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=211&amp;h=694&amp;fx=1150&amp;fy=1132&amp;c=bdd9f5eac2da33bdd73aa31de381f1aa0a354b04daaf14d21b37e1a98d2f3e5d 211w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=250&amp;h=823&amp;fx=1150&amp;fy=1132&amp;c=cb111f82cf634cef09c769b26bea0eb40346a73351d34bb6c11420bae39e40d9 250w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=273&amp;h=899&amp;fx=1150&amp;fy=1132&amp;c=b47d19ceaa8dbff85ad9029a5e8d3c427dcd1837ca2bcee6d8d94f692fefaedf 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=254&amp;h=513&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=1d6736ffe648a789377ba23fc0692ecc0806d5fa85f9830c9c099f1b4b498abc 254w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=475&amp;h=959&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=432afc3145cbb06c753b8c141de3649e89ca9e44a85a7c394ac7668468a661f2 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=254&amp;h=513&amp;fx=1150&amp;fy=1132&amp;c=6aebfb6cb0c52ced6720c230d083923f49953cf5476f4937ca69389a89e2c654 254w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=475&amp;h=959&amp;fx=1150&amp;fy=1132&amp;c=d4e08329fdffb07770f6b8c229eaf4acd290133bb816946aba9bfeafef46cf94 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=337&amp;h=383&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=d937997e4ff57901055ed8fd29b655627d61c0a33e4fd8a832e6ba67c385ea2a 337w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=475&amp;h=541&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=5decf2c913dd98a04917c6d5443c2cefbbca95f0d820db9d6c07f8e614cc1d22 475w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=675&amp;h=768&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=7a955af2897f2bfcc91d662a0715450425bfe7a6f34f4f1944034271423526fc 675w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=950&amp;h=1082&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=59d37ec85c9e9a1fbb64432d5fee3828618ec089cf7c0474a74b2e1c86ea615b 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=337&amp;h=383&amp;fx=1150&amp;fy=1132&amp;c=2fcf89527b5b8986c89ecf709d3d12e4c849453beb362272a61d8015c7b23392 337w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=475&amp;h=541&amp;fx=1150&amp;fy=1132&amp;c=a9a0c92e0e4efc9775a2b58943d5105954ac70c78d25d9092f0b70d606c72214 475w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=675&amp;h=768&amp;fx=1150&amp;fy=1132&amp;c=105f7f87d40ff11fc932cff5849216079401e36bc607c56c8abbf0a7b670dc38 675w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=950&amp;h=1082&amp;fx=1150&amp;fy=1132&amp;c=bdd27470bddadc0c7e9072496d2a21a0272ebef35ef5c3f86d0b1a55f0ca32e8 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=475&amp;h=369&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=04e3bd410352a04c5ea0d5cee7016d2bc5eb061c25c9910324644679c9abc3d1 475w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=633&amp;h=491&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=683c071b32651c97ee14cad3d8c5460a5e53a954fa010489820c58a6af8bbb45 633w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=950&amp;h=738&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=af1a296c648ff2e4b525bdd5f85752f99cc30e98c8076ffa41358f5667d7aeb3 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=475&amp;h=369&amp;fx=1150&amp;fy=1132&amp;c=02ae77b641cc75b90be39d1779d06cfaacc7b7a277c9f676d3f85d4a9e0aaa40 475w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=633&amp;h=491&amp;fx=1150&amp;fy=1132&amp;c=fbb1b4cce6a33b5bb2987f5a97d7a3b6ee7524ada9e16b6423c50c47eff6361a 633w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=950&amp;h=738&amp;fx=1150&amp;fy=1132&amp;c=1b41c52b55a5e2f6189833c7887741f7c5fb992aabfaacf16ac288d281a5fec3 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=320&amp;h=695&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=76e11beade1fb7c03531b964c1e268eaaa57c55c3303f044156cb06cfe2e0cb7 320w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=380&amp;h=826&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=e88efae6510382cde0494e32a6922f92ec20f5eedc57052886321969b8e822bf 380w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=415&amp;h=902&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=a1586a397c395963bc4099ffe64db25f3add9f2436332882f885c7c806644c21 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=320&amp;h=695&amp;fx=1150&amp;fy=1132&amp;c=cec7bb647b1ec97950b52120ef62325d05c44e3ec13aa72a44c4c76bf967b7a5 320w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=380&amp;h=826&amp;fx=1150&amp;fy=1132&amp;c=e7ef63e01be3e0c34651036626c36556fc0cf4e2921666d196fd969d4d9a7090 380w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=415&amp;h=902&amp;fx=1150&amp;fy=1132&amp;c=8f7e9495a0dde48b437722ec449646ece7fb88a9470879fc2cebc3649e7083ee 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=385&amp;h=513&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=6980fdd464f814a8acbb597e8bafb76911675aab105329a9f8ae92fe81d4cd8a 385w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=960&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=d6c5c177227ed18346379417a3b49b6cbac53aab9ad773a4afe05dfa0c1a0a72 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=385&amp;h=513&amp;fx=1150&amp;fy=1132&amp;c=0e827f84e2fbcec579ffdae6e4f9f96e4a254537ca45e9face620e7d6350a6ea 385w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=960&amp;fx=1150&amp;fy=1132&amp;c=d4a46c59616e49347c15bfe8113e84d941beadacca7dc95d575500d8f627ce74 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=512&amp;h=384&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=cb2b2b26714449d229beebd1c4a8cc0affaab8fd2aafd0b165b93e32d2b3c20f 512w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=541&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=3169a0343216e51868d52c8064d290ac79b1d5d27fa83380226e71a3c5c4328e 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1024&amp;h=769&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=47fc79499ff67c1c4479435189c78317f68abee03d76cc510c6cac94e40a4707 1024w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=1082&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=33785d5427cfde67708e1fc561630bb7d23cdf8baf082a13e4e34c55b168525c 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=512&amp;h=384&amp;fx=1150&amp;fy=1132&amp;c=85289183623ea6385f7fc59d16a0274a54a2824d38985c069c0199bfb1c1e01f 512w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=541&amp;fx=1150&amp;fy=1132&amp;c=cf138fec849b0d88befa08665fc2197fb6f0a6bd4a693912844c717a98405774 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1024&amp;h=769&amp;fx=1150&amp;fy=1132&amp;c=b6151b32a130efedb731ac20e957002cd1bcd87676a3efcff8d76a8e39714d67 1024w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=1082&amp;fx=1150&amp;fy=1132&amp;c=0e993d562b8746b8bdfb15daac7a47fabf3220d056daa6df03abf4f4a9302a3e 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=369&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=b6dcdafbabc3fb171c5ac8298d7a9a58b104f3f917f2df6355b3ed7aab33a6ee 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=960&amp;h=492&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=044497ffe6ba0424031d57fc4b9bee5da704a07230a8742eefefd38283c8615c 960w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=738&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=c0037934971c421b1ac082da0d8151cac18f95fc9d822222b77582912ad0b4c4 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=369&amp;fx=1150&amp;fy=1132&amp;c=2f13c136511823abe56b968084cec345742d824e2c7594a6686511ca7e0d1913 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=960&amp;h=492&amp;fx=1150&amp;fy=1132&amp;c=1a8aafdf657fdc613f2087ae11e891040377d20573c5b5df3d448e2d6403ed86 960w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=738&amp;fx=1150&amp;fy=1132&amp;c=f51c418d258178907bb1216943511bccbdfb4a9fc2fd06d35f178c69114cf9a9 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=320&amp;h=459&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=512aef142a88d9109ce1944e26db48b1dab78c07f7675a11a0d640bbc6f45c07 320w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=380&amp;h=545&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=766ac9ec6e82b8dd40f48d9220847174cba86e079ab6d7d20f37a4876c9d5778 380w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=415&amp;h=595&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=286adc248c654085aa0fc119e115361ebc889fe8a5aedb699213978abbfbfad9 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=320&amp;h=459&amp;fx=1150&amp;fy=1132&amp;c=82eff1fb85ffb9ed6207f1a9acc2e3fc09f5526c4b5633b9012b9060ed3b73a4 320w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=380&amp;h=545&amp;fx=1150&amp;fy=1132&amp;c=266ddd166d9e0279626495f6e59420c2c1e4754d8162d858514784ba1070e2f9 380w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=415&amp;h=595&amp;fx=1150&amp;fy=1132&amp;c=861fd7e1d802f086bba374a5e511aadee07ed3993b3cbd9a237230d957f25349 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=385&amp;h=338&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=8636c47ca7f968520654d8d8fb46a8b1df0f99b0737d2ef96f4cbe20de46c1e7 385w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=633&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=d667e01abb556115b09387767f7fb0c893e88a0a16ae822e5bf3d7998d6800e6 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=385&amp;h=338&amp;fx=1150&amp;fy=1132&amp;c=fe5dc158f706ad2e776ae7292180b6d6c9628113e728d66982ec518c51b6246c 385w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=633&amp;fx=1150&amp;fy=1132&amp;c=a281ab4d7b325034d3943dfa13151432ff24e60ce229aa00d5209558b9eae030 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=512&amp;h=254&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=b2cd98802cb7899275e6fe43d89a93787c50ebfb77b6aa777b846a1409faa5a4 512w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=357&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=483082c7bc7d0a8f00c1bd70d07b3aa15e62f2aa60938cf7096bb5c989ff41ba 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1024&amp;h=508&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=b60c81853dad5e0fbd2e88a0265aebe37d731c4ffa3ed10bb3fc65fd8a5737c8 1024w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=714&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=e54bebe208b6461296393dc7ff6f1fd28c1472aa8283819872079db5a7ba9c4f 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=512&amp;h=254&amp;fx=1150&amp;fy=1132&amp;c=06d910c8da17ff32c8441bbd8d2b5c248d4a1d192f1a93abb0bf316a4c3a71ac 512w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=357&amp;fx=1150&amp;fy=1132&amp;c=83e36f0d4b7ef3b29b36f5379fd8dba99eb6c9a8e1bff7b45db693a4513dc5d5 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1024&amp;h=508&amp;fx=1150&amp;fy=1132&amp;c=e445fde0d690c63581b6dda48bed0817864b27b5cbf444ac5ddb26ad4e5e1fe9 1024w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=714&amp;fx=1150&amp;fy=1132&amp;c=48758f13ccd158c58c87724e25a20eb094039c260483427bad079011772375e0 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=243&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=d73bf6774383ba6e7affcc78063b379d979bd70d0a2cd806b8058a109ed2c391 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=960&amp;h=324&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=d004c67312d2ae7a1c4bc5b493e7ded6dad30248d04db95239712e7bfcdacca7 960w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=487&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=047360b4afee433cb5557fe4e375e9bc20f200377a22bd1a7ef3ede8cd22e6ea 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=720&amp;h=243&amp;fx=1150&amp;fy=1132&amp;c=d9e29e405528b0764532bfce2af2d2b3d7a451b2b45d7bedbdac532f7910828d 720w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=960&amp;h=324&amp;fx=1150&amp;fy=1132&amp;c=f2fa89ab99bcfc7a71e92a1ab2e7bfad9873144092243d29a81e073f608a2e5e 960w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=487&amp;fx=1150&amp;fy=1132&amp;c=aa69c55610844c76cbbf9b5146bd2498b8fd2feffac0150af0dcd77532f2b837 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=640&amp;h=695&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=51ca6666014fa7e08f3f933c922b7fd203026e47135b1d0e1a0a9aded2358fdf 640w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=760&amp;h=826&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=3f62875cae18796e9e7407fe74c7177d96618d3d33b7db434647f0106669e8a5 760w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=830&amp;h=902&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=7e615ce89ea8ba4177602faea6087f5fba41bdf1e83290eb3893c860c49ff924 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=640&amp;h=695&amp;fx=1150&amp;fy=1132&amp;c=a921d519ce52caa4eedf18645a68eb16178233dd39d24edd36112ca158316d00 640w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=760&amp;h=826&amp;fx=1150&amp;fy=1132&amp;c=576b68a01ff70c88855f668250133d010e050641599b1c7d7afd7c6adc160bcd 760w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=830&amp;h=902&amp;fx=1150&amp;fy=1132&amp;c=4683c5b7df364ef3edde63306858999c91567e1308bf865b1c2e04ce1af1113a 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=770&amp;h=513&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=3723f8640d4ea44d45c070c158c919ff80a4895bbcf87002f8045636407174af 770w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=960&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=43534e6284abe6283001692ff68d035bb79a096c21041729483c8ef8d0f854d0 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=770&amp;h=513&amp;fx=1150&amp;fy=1132&amp;c=7256e72d4cbf126fa2eee4ce7b9c7be0171ba82eab07eef8fb4a9701b58a3c86 770w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=960&amp;fx=1150&amp;fy=1132&amp;c=2dbb16f389a6eb473f32cef32291e9c12b72d5383c2cacaadd49292ef19887e8 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1024&amp;h=384&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=00a33adf530f683c86871fa21ef0d63eb010e40172b63122cf69afb390abf265 1024w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=541&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=d2dcf33856be25098265448c8fbe20ad59c42d435af680bd74b53dd5bf2e2e65 1440w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=2048&amp;h=769&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=24d2fec6e422500440cde777c433c8b54fdf731b6d990d3d49375f29e47f3444 2048w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=2880&amp;h=1082&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=64b79022353fd4279eeaf2dfd84e3a9aa2cef4fe9ca7a1e9715c40b15ba77714 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1024&amp;h=384&amp;fx=1150&amp;fy=1132&amp;c=e46fb0e65f31e2a1c74b57d5d0e89754a21ee3bfe10553512cce015b406d93a9 1024w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=541&amp;fx=1150&amp;fy=1132&amp;c=eac5efcee0a793867955368186155b40b11fddb0507d254ccf6c83aeec91ca8c 1440w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=2048&amp;h=769&amp;fx=1150&amp;fy=1132&amp;c=e6c64ffebcf1fded8a3198eecb66e5bfa665e7422e0eab26d3d392486a46da34 2048w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=2880&amp;h=1082&amp;fx=1150&amp;fy=1132&amp;c=2fd6284f8f58dbb98223df7160b66dd6075b3b41a5f40d8c752cd31f20482b04 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=369&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=5193901e33a90bfda620c60f1fea0a972dcdf603ca65799394a972dc26ead452 1440w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1920&amp;h=492&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=aa36a5de532c8f1def9be542977d13865bd9912b19f6e213ca34588adc5c0614 1920w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=2880&amp;h=738&amp;fx=1150&amp;fy=1132&amp;format=webp&amp;c=7da417f8743d9cb14da3923789f4eebb8651400de8883a9aecd4fbfe20448d3b 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1440&amp;h=369&amp;fx=1150&amp;fy=1132&amp;c=1705d5729cda9b0104b7e639622d782010974a9c139ce2622c12181683230917 1440w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=1920&amp;h=492&amp;fx=1150&amp;fy=1132&amp;c=22b8a13e44cbcc2e473eab82a0965fb72fa21d0e5c436fcfd37bcedb6d38edb1 1920w,https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=2880&amp;h=738&amp;fx=1150&amp;fy=1132&amp;c=0bf98a6b316ccb2b8408fbe38a4b031e9a4cfaa09a1b715a9cd43aa95ce07686 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=633&amp;h=540&amp;fx=1150&amp;fy=1132&amp;c=7d14aed39cb60f49a436ca106b9f2b1318316d58d56d826b14e509b300341e4b" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=65&amp;fx=1150&amp;fy=1132&amp;c=f23e670639122556ddb92cbab69bcc20ca0b09907d4522e37973ec1cb69d2193" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=40&amp;fx=1150&amp;fy=1132&amp;c=37da05c34c069a9c9163f52af625572bdf55d59cd690c1c60ee2772323f21132" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=22&amp;fx=1150&amp;fy=1132&amp;c=ed01212827f9ae0bbef984a75155ef3d9e61b4fcc6bf6d14515600bdb849f9ec" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=15&amp;fx=1150&amp;fy=1132&amp;c=a73cde2ca30c402775d6b2020dcfddc624752f16f3a5784cfce7cbd0f12d8d0d" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=43&amp;fx=1150&amp;fy=1132&amp;c=1e1e785879d1ab4d87ddb13838d5f053bd5c4e21b1090b49b8b51c405ef88490" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=26&amp;fx=1150&amp;fy=1132&amp;c=dff77df3a360ef62bb6e81712535f035fbe91431d38cad555d883440b01cd10b" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=15&amp;fx=1150&amp;fy=1132&amp;c=a73cde2ca30c402775d6b2020dcfddc624752f16f3a5784cfce7cbd0f12d8d0d" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=10&amp;fx=1150&amp;fy=1132&amp;c=c9313ccb0368fde5a992c4d9998b6c8960e1001e960eeaba5d0e1acd78216ec8" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=28&amp;fx=1150&amp;fy=1132&amp;c=3329d5f9accfcfc3bc5ec2e4a0e36341ed55af45465ae1a4747f9c909aab5ca2" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=17&amp;fx=1150&amp;fy=1132&amp;c=16d212775a1265a5162ecd98e09f8a7379ef6e0d31b70a9116ff31d6875bc9ee" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=9&amp;fx=1150&amp;fy=1132&amp;c=aef09ce3856a83f8529018fbecbead3caaf216d8060e5548857a56b67b850d06" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=6&amp;fx=1150&amp;fy=1132&amp;c=5054574c04d7165216eac26871e12d475150990eeeb6d3c29ebf62f68f801107" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=21&amp;fx=1150&amp;fy=1132&amp;c=5ca03196cc97a6c54e57195b9caffa9ea8450c9e4f36f98de3c8c1760cc74785" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=13&amp;fx=1150&amp;fy=1132&amp;c=6c47627dfb3f2921b1059ecb42ddc3e6fdc8db36296c3728ec96dfdc238c19a3" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=7&amp;fx=1150&amp;fy=1132&amp;c=a8b9c7e24f989c77ca547788df20a5ebf43f9a208f6cc9d46c4149aef34e69b3" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=5&amp;fx=1150&amp;fy=1132&amp;c=31ac59be4031cd83bca04d4bba21ee878a3fc0009369f4311b3ced33bbd41b04" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=20&amp;h=11&amp;fx=1150&amp;fy=1132&amp;c=a367c62734230a029e5e9b2e0c6c490720886c204bdc118ba371789955503c79" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Historisch Amsterdam
        </span>
      </h3>

        <p class="block-content-subtitle">
          T/m 14 november
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/vincent-mentzel" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1890,225,885,2913/211,694/0/default.webp 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1890,225,884,2913/250,823/0/default.webp 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1890,225,884,2913/273,899/0/default.webp 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1890,225,885,2913/211,694/0/default.jpg 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1890,225,884,2913/250,823/0/default.jpg 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1890,225,884,2913/273,899/0/default.jpg 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1611,225,1442,2913/254,513/0/default.webp 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1611,225,1442,2913/475,959/0/default.webp 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1611,225,1442,2913/254,513/0/default.jpg 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1611,225,1442,2913/475,959/0/default.jpg 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1051,225,2563,2913/337,383/0/default.webp 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1054,225,2557,2913/475,541/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1052,225,2560,2913/675,768/0/default.webp 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1054,225,2557,2913/950,1082/0/default.webp 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1051,225,2563,2913/337,383/0/default.jpg 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1054,225,2557,2913/475,541/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1052,225,2560,2913/675,768/0/default.jpg 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1054,225,2557,2913/950,1082/0/default.jpg 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/458,225,3749,2913/475,369/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/455,225,3755,2913/633,491/0/default.webp 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/458,225,3749,2913/950,738/0/default.webp 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/458,225,3749,2913/475,369/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/455,225,3755,2913/633,491/0/default.jpg 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/458,225,3749,2913/950,738/0/default.jpg 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1662,225,1341,2913/320,695/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1662,225,1340,2913/380,826/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1662,225,1340,2913/415,902/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1662,225,1341,2913/320,695/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1662,225,1340,2913/380,826/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1662,225,1340,2913/415,902/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1239,225,2186,2913/385,513/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1240,225,2184,2913/720,960/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1239,225,2186,2913/385,513/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1240,225,2184,2913/720,960/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/390,225,3884,2913/512,384/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/394,225,3876,2913/720,541/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/393,225,3878,2913/1024,769/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/394,225,3876,2913/1440,1082/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/390,225,3884,2913/512,384/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/394,225,3876,2913/720,541/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/393,225,3878,2913/1024,769/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/394,225,3876,2913/1440,1082/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,560,4376,2242/720,369/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,560,4376,2242/960,492/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,560,4376,2242/1440,738/0/default.webp 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,560,4376,2242/720,369/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,560,4376,2242/960,492/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,560,4376,2242/1440,738/0/default.jpg 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1317,225,2030,2913/320,459/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1317,225,2031,2913/380,545/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1317,225,2031,2913/415,595/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1317,225,2030,2913/320,459/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1317,225,2031,2913/380,545/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1317,225,2031,2913/415,595/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/673,225,3318,2913/385,338/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/676,225,3313,2913/720,633/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/673,225,3318,2913/385,338/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/676,225,3313,2913/720,633/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,596,4376,2170/512,254/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,597,4376,2169/720,357/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,596,4376,2170/1024,508/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,597,4376,2169/1440,714/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,596,4376,2170/512,254/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,597,4376,2169/720,357/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,596,4376,2170/1024,508/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,597,4376,2169/1440,714/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,943,4376,1476/720,243/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,943,4376,1476/960,324/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,942,4376,1479/1440,487/0/default.webp 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,943,4376,1476/720,243/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,943,4376,1476/960,324/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,942,4376,1479/1440,487/0/default.jpg 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/991,225,2682,2913/640,695/0/default.webp 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/992,225,2680,2913/760,826/0/default.webp 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/992,225,2680,2913/830,902/0/default.webp 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/991,225,2682,2913/640,695/0/default.jpg 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/992,225,2680,2913/760,826/0/default.jpg 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/992,225,2680,2913/830,902/0/default.jpg 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,225,4372,2913/770,513/0/default.webp 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/148,225,4369,2913/1440,960/0/default.webp 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,225,4372,2913/770,513/0/default.jpg 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/148,225,4369,2913/1440,960/0/default.jpg 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,861,4376,1641/1024,384/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,859,4376,1644/1440,541/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,860,4376,1643/2048,769/0/default.webp 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,859,4376,1644/2880,1082/0/default.webp 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,861,4376,1641/1024,384/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,859,4376,1644/1440,541/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,860,4376,1643/2048,769/0/default.jpg 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,859,4376,1644/2880,1082/0/default.jpg 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1121,4376,1121/1440,369/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1121,4376,1121/1920,492/0/default.webp 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1121,4376,1121/2880,738/0/default.webp 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1121,4376,1121/1440,369/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1121,4376,1121/1920,492/0/default.jpg 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1121,4376,1121/2880,738/0/default.jpg 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="Toeschouwers tijdens een voetbalwedstrijd tussen Ajax en Feyenoord in de Kuip te Rotterdam" class="lazy-image not-loaded " data-src="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/625,225,3414,2913/633,540/0/default.jpg" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1884,225,896,2913/20,65/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1604,225,1456,2913/20,40/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1008,225,2648,2913/20,22/0/default.jpg" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/390,225,3884,2913/20,15/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1655,225,1354,2913/20,43/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1212,225,2240,2913/20,26/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/390,225,3884,2913/20,15/0/default.jpg" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,587,4376,2188/20,10/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/1292,225,2080,2913/20,28/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/619,225,3427,2913/20,17/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,697,4376,1969/20,9/0/default.jpg" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1025,4376,1312/20,6/0/default.jpg" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/945,225,2774,2913/20,21/0/default.jpg" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,259,4376,2844/20,13/0/default.jpg" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,916,4376,1531/20,7/0/default.jpg" /><source sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,1134,4376,1094/20,5/0/default.jpg" /><img :style="objectPositionStyle" alt="Toeschouwers tijdens een voetbalwedstrijd tussen Ajax en Feyenoord in de Kuip te Rotterdam" class="lazy-image-placeholder" src="https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/147,478,4376,2406/20,11/0/default.jpg" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Vincent Mentzel
        </span>
      </h3>

        <p class="block-content-subtitle">
          28 januari t/m 6 juni 2022
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/revolusi" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=211&amp;h=694&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=d9f94c272e64f77f66ac2c0027e487da4507f7a202437d355c2a0db78b3dd2bc 211w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=250&amp;h=823&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=297725f0252ebc22b1bfa58c180de8b9568de73be20aea2b71b9d32404ab31ab 250w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=273&amp;h=899&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=79226ab00230f17309896149b0fcf37979570407f2873ce58f1d04d83873ad75 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=211&amp;h=694&amp;fx=825&amp;fy=600&amp;c=5ebef049b711958326ef1d8e86e88429718a2091cd9ac972dba4ecfd8d59ad52 211w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=250&amp;h=823&amp;fx=825&amp;fy=600&amp;c=3b03ff34fe26491163cfc5af92dfed3b3faae8abb846f6b6d37bd3d59e05175e 250w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=273&amp;h=899&amp;fx=825&amp;fy=600&amp;c=2c8d498374766242c3b27fe0083b08c8330ceb5ce71393fee017418b39071db6 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=254&amp;h=513&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=c76e63103550fc6963e49b6befc620a7fb472d59019ebe17314bad258fc4888f 254w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=475&amp;h=959&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=c9b35f6b58e941ae2af6e11cc2a1580a33a5bf85178638f7f32e24422786e1fe 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=254&amp;h=513&amp;fx=825&amp;fy=600&amp;c=891379a36a2dedc8dad495e3f787489057e8093417392980f6cfbf165b479395 254w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=475&amp;h=959&amp;fx=825&amp;fy=600&amp;c=9ec7e750744a414c909a69f08f0a4253d6761cda222dbd34e46e1a83fbab7a4e 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=337&amp;h=383&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=35bd8bb2780048bc09de5bd115374dcc5f71c79bed87f7998262fadef0702602 337w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=475&amp;h=541&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=770b27e3199a00d1172668b0bef23f8f330ba0daf889712edd9fa027ccaca8c4 475w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=675&amp;h=768&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=ce55bcffe082d5355d8455e159867e7755034dc75adcc1048e2f6bcdbb4e357b 675w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=950&amp;h=1082&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=aeb629ff536b1c3890e4e827034370f90d66a89539924b4f1c3d64fe56fa3639 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=337&amp;h=383&amp;fx=825&amp;fy=600&amp;c=5568921b3f4acbb8a1e954ba931806867b4caf84c1f9eeb564f5bf9c60896662 337w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=475&amp;h=541&amp;fx=825&amp;fy=600&amp;c=a50692c725872756145b8481b45bc91c8ae8cb20e6d6480dca9c9dcb7295da52 475w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=675&amp;h=768&amp;fx=825&amp;fy=600&amp;c=ea0f813103d8f7d840e777f7689191cc0fdf5610653d7e7b623dbc2abf43e983 675w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=950&amp;h=1082&amp;fx=825&amp;fy=600&amp;c=23b95499771efd7f75faff711c75ee18de0c450dbd1a7717a2010fb96cc7264c 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=475&amp;h=369&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=138eaa74012d28e9485b9af41f0bc672695979584474029b24d2e622b31667a6 475w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=633&amp;h=491&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=cd6a216ef237e8da1b4afa3ce70a33c7eab1de1e673716b73fd2b07abb173c68 633w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=950&amp;h=738&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=a6fe7d52945eeec16e332154e6ba31579990fc597291777846a5fb79a5e325c5 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=475&amp;h=369&amp;fx=825&amp;fy=600&amp;c=ddc844a5b0bd999b389c350f6a4c392d43a268eb115ddf91b2851281c1576ff7 475w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=633&amp;h=491&amp;fx=825&amp;fy=600&amp;c=6f78dd9ae5f468ead66dc6ea2a2ac45f2d13960fc7a6df3c1962397c90390520 633w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=950&amp;h=738&amp;fx=825&amp;fy=600&amp;c=6e4d486d88043a93e8bc0e83c60b220568940924ae95977aec64c9c3f166b018 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=320&amp;h=695&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=bb443ebba5cd0666e38b4c4717a648958b8d2437d8b3f3d1a32bdec33ee98bf7 320w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=380&amp;h=826&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=e351d22dc1898753fc7e173aaf6d3acb575544bb967886e496cd366566e74f18 380w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=415&amp;h=902&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=0ef61d1f28620ebe0e74923624313ce9aa54c28e33ac62d7191b962a1723cd58 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=320&amp;h=695&amp;fx=825&amp;fy=600&amp;c=f07895c63d0078a3f5ac52cb1b47fad62f5aef18341e60ff6da25782b18c1cc0 320w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=380&amp;h=826&amp;fx=825&amp;fy=600&amp;c=81497e53be914e83c74ef829b57ec9c09cc20351e2cd9faec046ce3f1b5d77d0 380w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=415&amp;h=902&amp;fx=825&amp;fy=600&amp;c=0afc3153d46d7c73e8f81429c540d3aadbc0210a53b3e614be749b6484c4c223 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=385&amp;h=513&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=7d0be13dd3ff827732883cf4340d745aa96a98e1211b638f57d1bc4eab6cba96 385w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=960&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=6e60aea28ea1c6c114c05b418c2c0132401d5d50f90efb47576295e271154466 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=385&amp;h=513&amp;fx=825&amp;fy=600&amp;c=0a107a289f2c5cc80abb3abf197d892a64e687885f543cff971f65fb78fac13f 385w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=960&amp;fx=825&amp;fy=600&amp;c=bb3c53ed25a462654aca4dcf9765910519b69a83ab5d9f81758b02426130aa40 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=512&amp;h=384&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=3ad0172b50fbe62b5dad4a6d2d8d717da79093ed2af9e7ca8ae9727de26a1614 512w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=541&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=b1ec72f945abf7d4fb0103ead8d9d1ddd60df25fcb8c16e8738b44bd0993a857 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1024&amp;h=769&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=3224613c9f4c5dc0c6bbf401fa30725a33379dd7b127e71f63dc9a3bd74c2cd3 1024w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=1082&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=d9eab57daa170634e5a362a1b03add062476b6b2727c5aea380dd43e053a7b70 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=512&amp;h=384&amp;fx=825&amp;fy=600&amp;c=6ebfb1ad80b11d0f45d58cc0de81edc2a6ded5a937e4e648ab191b4df8e4a217 512w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=541&amp;fx=825&amp;fy=600&amp;c=024d111a7decefe576ebb876e135231792583b8c7850a01c22f241c2f37ede59 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1024&amp;h=769&amp;fx=825&amp;fy=600&amp;c=434f93815af5982f519e4d5181a6b3dfc35b06dfb2aeb9b651411cb55b023e3c 1024w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=1082&amp;fx=825&amp;fy=600&amp;c=79a7d468c35d330b1d32f3953eae11c036ce8f94ba7f81965a6454078e30f3f1 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=369&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=e956a01c53e285dc4b1861f3530e1055f83d3ac5da04b6e5e152e07408465f53 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=960&amp;h=492&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=3e3fb7f6a7ba6753de3104dbfdda2bd37572143a22249047d68d4aa872f2e359 960w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=738&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=723d864d8952cf3fccb44469dbcc562d23006f8f99136217e25d8bc0ef6b3df2 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=369&amp;fx=825&amp;fy=600&amp;c=f822136a8d85302131f1bd4f0b9eb12d5a46b4959f0e18224032b1fb5ccf43ba 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=960&amp;h=492&amp;fx=825&amp;fy=600&amp;c=b575330f1c172a7a74275fb15192b1b63a15385e6cfb9e7d854c40ac25fb0415 960w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=738&amp;fx=825&amp;fy=600&amp;c=b8767ffb889fbb9a12527016c32d9f0c665ce4cd3fe46185bfba76cbb6c48b2f 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=320&amp;h=459&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=402e720ad963c106c3613110d85dab86703ed49f01479c8ffed91db36a24b205 320w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=380&amp;h=545&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=2c9c3b20d490ad7e7f55a9d81611916de28b7929d51820a382222b1e3a8ce798 380w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=415&amp;h=595&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=58a542543230b163bfb9a9034e5b49c95eeaa055da0c0ec94434c048eee65578 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=320&amp;h=459&amp;fx=825&amp;fy=600&amp;c=266ce1af94813a676bdf35196d9d64bcb7fef3414c6b1160c3f0de4c6b027bba 320w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=380&amp;h=545&amp;fx=825&amp;fy=600&amp;c=a67b6a2f9d8da85125b928a2bbecb46b54d54bbf771fbb355db37c3ebd1ba5ba 380w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=415&amp;h=595&amp;fx=825&amp;fy=600&amp;c=6489f3ff14acce84a925f81638e470253a681d0f90df3647b5a3524ba0d3f7d4 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=385&amp;h=338&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=88018995620d468ee8541ad59fab7bf6a693b3ba330c6b19bcd6c64eaa747b4d 385w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=633&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=0da3962c10233729827dc6c3f01f51754b89c76865d111b0a2c13f4b9fe9b0bf 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=385&amp;h=338&amp;fx=825&amp;fy=600&amp;c=dbc96f2a9c91f0373760fa38891b375f3caa807328f22530c21e39e9ed42ef9c 385w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=633&amp;fx=825&amp;fy=600&amp;c=45706990b969ed00b7ee8177ea0388bb1702dbf4c4c7ea43410f7ec7c2f996b7 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=512&amp;h=254&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=3148bb8d0138323f02c8b5cb14d9886fe0d18acf2b9b9061e7ebe0353f08e348 512w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=357&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=0396324de74d1043c2ac282a7802591afdab81376eeabff5d171d8880706b5a7 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1024&amp;h=508&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=86196f99e1703323437e80067e4d375465ef82aae85383d43a377237ce624247 1024w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=714&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=53e91a08888a4ea8099f78c40488cc08eaeb2df2b87d5140ca6115ae803126ff 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=512&amp;h=254&amp;fx=825&amp;fy=600&amp;c=0df0fadcef0b9de1c1a575f7aab7fb023d9452dc2319697e95f992a8641c214b 512w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=357&amp;fx=825&amp;fy=600&amp;c=a239baaa4716dd6f0d3858ce44642a075a7279474e0fc13457f54d06d2ad241a 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1024&amp;h=508&amp;fx=825&amp;fy=600&amp;c=e3568532f6d4c35eb61e0acdab433a2d5c007741dc221a41dce977b1eea68b9c 1024w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=714&amp;fx=825&amp;fy=600&amp;c=a09b53eaee3ad9fc96c541be39f27144acbd73301271666f00a60ad01c2034ed 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=243&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=1959f9f5bdcbb227689fd14122c83cbc1e2b83fe2f1d24a3d9147f45120c5a19 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=960&amp;h=324&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=928ab3c2110ea3ebfc0e043c6a086d9c13a402ecd3e01862ed5c1a7378b52ae0 960w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=487&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=9a9967a5f1247d84478799f7817f4cc0dcce98d201a66ec78669abc7911990bc 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=720&amp;h=243&amp;fx=825&amp;fy=600&amp;c=031757376299f446a32d8dcaadf4c6aeb523fa8a3962ac63aacbdf7ed773f04f 720w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=960&amp;h=324&amp;fx=825&amp;fy=600&amp;c=ea5b8ac24bf14c938d463720ba83ee44daf1d86dd97ccdf5086c917d425781f9 960w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=487&amp;fx=825&amp;fy=600&amp;c=fe5dc31ab99d439d5f3fb9912a43adf64106ba05f656dd8e16bc1c1ee3650280 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=640&amp;h=695&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=75deaf8310d394a75f9ae5c22128bb47e08b2bf99fb9368045a6f1b65329a69f 640w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=760&amp;h=826&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=cd2ef3f8c26d97fa838172738799a3818aca1c50ace31dcf0c178bd261a31b8b 760w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=830&amp;h=902&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=b538a9686c0cfb6aee31955d191bc2b5131808f82911b5e922d05192c18de079 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=640&amp;h=695&amp;fx=825&amp;fy=600&amp;c=d7bdbba3510195c893316104c376cbf3c8415a2a32cb722bb886691124422930 640w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=760&amp;h=826&amp;fx=825&amp;fy=600&amp;c=2f4c0a048c6a7dfcaf9b8df9ac399412536497569aaabfd7703f272e56ff31ee 760w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=830&amp;h=902&amp;fx=825&amp;fy=600&amp;c=0166d5d53d4617486def0151a9f0172b6d3b2a2842b73f6c87037e12a0471db6 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=770&amp;h=513&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=a5224f074a6609c25a6d8142c10f02dfae7fd93e4bb6eba99a9fc67d70b7631b 770w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=960&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=f66d0eafc33f66c8011096e2349fa07373f6d2f4bd61cd11f373ab74100589c8 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=770&amp;h=513&amp;fx=825&amp;fy=600&amp;c=9f8181bc13459ffc3dd3e0b4302ee62cb0774394403b090a1b8ca38860c13caf 770w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=960&amp;fx=825&amp;fy=600&amp;c=9403e4510b7b8363c324bfd21a9b6c8bf52c32e1b85b17fa439a0b6ed5527ccd 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1024&amp;h=384&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=35f4a1c60166f26a23a567718ba052cb8147199d4f6c34186527e4196af5c501 1024w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=541&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=76854a465658b31f06da895a85e201f7955a04b4dd4b2df80aff1a48f4d2fa39 1440w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=2048&amp;h=769&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=352150279b531b93bf0de4c13008227f4f78d5ef706900f5266f2699197efda7 2048w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=2880&amp;h=1082&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=7b64d90627c8885084935e1ea016bffdfc26189b1f6f358f7922811e532aff6c 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1024&amp;h=384&amp;fx=825&amp;fy=600&amp;c=3fa6eb533f435aa763c39a1d437b87605c8dcb3b705b5ee473e218b810d21580 1024w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=541&amp;fx=825&amp;fy=600&amp;c=8d74bab1fdb9ee8f478b490630389ba0fdc912cc64a05b3480511e471085b585 1440w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=2048&amp;h=769&amp;fx=825&amp;fy=600&amp;c=46f838ba5fc4d25cfe16a2844b5fe90b1f470194e1b0bcee5d35ae32e1c25753 2048w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=2880&amp;h=1082&amp;fx=825&amp;fy=600&amp;c=56b542fb53671182938db252d75c38cc2d9a02fe809c786cf0a69e8bfa69b423 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=369&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=081501d6d3bf8d035db5f406ab7efd7b6e03df11e2205f996dd86939ca0a0f52 1440w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1920&amp;h=492&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=02910db04c44858a92556a1851460b781d022f212cec16761867ded51d5a9e62 1920w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=2880&amp;h=738&amp;fx=825&amp;fy=600&amp;format=webp&amp;c=4daea0d1519263e28fddf2968b9501f3aa8f9575fd417b590a909cf422aaa038 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1440&amp;h=369&amp;fx=825&amp;fy=600&amp;c=7a22853b5d12f31c5673432e542c321e5eb335c382805b641644d9bc5d5e2144 1440w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=1920&amp;h=492&amp;fx=825&amp;fy=600&amp;c=2d9935b321fa27471ec1687f843e456bfd851e3527d72256f67b4525c6a306e1 1920w,https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=2880&amp;h=738&amp;fx=825&amp;fy=600&amp;c=b3966964e4a131fdfaec38f3938b44ce589728f9ec86e3e0ab29f18007f2a1a4 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=633&amp;h=540&amp;fx=825&amp;fy=600&amp;c=95507c0b15198143a7b00d73c27f2d77b376275f7b11de846cfd284066c9d3d1" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=65&amp;fx=825&amp;fy=600&amp;c=238e348a9a189933e9072a471cb89e335dcfc509dc2b98226559e2bf6c487622" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=40&amp;fx=825&amp;fy=600&amp;c=d8cf503bc981b08f59b6ad2826cd85b63afc1b96935e57bb15d15fb19a93b649" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=22&amp;fx=825&amp;fy=600&amp;c=62cab9329309b80ac93c094c2edd5b96c286848052ce395bf14e84b8901a316d" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=15&amp;fx=825&amp;fy=600&amp;c=97815aabebc30a8d738fa1c21232edd9c1f9e7cc7f8b78bbc881f75a7d888180" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=43&amp;fx=825&amp;fy=600&amp;c=c659e764b3945c673f8b41aa98b1c3b8747ba654b1d3dcfad0cb59d890d9f6bd" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=26&amp;fx=825&amp;fy=600&amp;c=1419f41a315a5d92fb2d6909fa32a2f55fca9dfd756d91073589f92c48affe2e" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=15&amp;fx=825&amp;fy=600&amp;c=97815aabebc30a8d738fa1c21232edd9c1f9e7cc7f8b78bbc881f75a7d888180" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=10&amp;fx=825&amp;fy=600&amp;c=1992263c86a603b188be74c9fe55951b33bb343d33b20667f6a6ec466d5be87d" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=28&amp;fx=825&amp;fy=600&amp;c=8c7bd9551eced61bbba697158422ac7f4a962f53b87824c879681cd2268ccd66" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=17&amp;fx=825&amp;fy=600&amp;c=87d671ff521224c288cb2c5d2178d9811d0f63d028225330b4f931deed8170d6" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=9&amp;fx=825&amp;fy=600&amp;c=5386a0f6c53c356f607c3ff3bcac0815fc421c7fd558ddd20f53d371a66131a7" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=6&amp;fx=825&amp;fy=600&amp;c=82301aabbde7d364c78d6dbdc1547d64a5a81bc79007d4e7b73ba145c3d47a08" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=21&amp;fx=825&amp;fy=600&amp;c=b8c28e2c6d51a5ad654bf49e5ac876341fe4516d3f7c080c7b2e32d2d4f4275c" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=13&amp;fx=825&amp;fy=600&amp;c=a86abb59e7de87801801c5daba97411255cb5aff1d0bd53e37ad276db7bcd1d8" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=7&amp;fx=825&amp;fy=600&amp;c=06c5129b3671d5c4d014792c23261ce23c055be41280a2c6a617b7b02db4c873" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=5&amp;fx=825&amp;fy=600&amp;c=d54b1aa213aceb7891fcba21d990588171edc0f5a3719b52f68622278087ab28" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=20&amp;h=11&amp;fx=825&amp;fy=600&amp;c=e27e2c546a7ce4960094c075496639079ea14fbfa1f78dec36c3df18c503bbec" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          REVOLUSI!
        </span>
      </h3>

        <p class="block-content-subtitle">
          11 februari t/m 6 juni 2022
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/kikkers-en-kaaskoppen" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2808,412,1297,4269/211,694/0/default.webp 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2808,412,1296,4269/250,823/0/default.webp 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2808,412,1296,4269/273,899/0/default.webp 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2808,412,1297,4269/211,694/0/default.jpg 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2808,412,1296,4269/250,823/0/default.jpg 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2808,412,1296,4269/273,899/0/default.jpg 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2400,412,2113,4269/254,513/0/default.webp 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2399,412,2114,4269/475,959/0/default.webp 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2400,412,2113,4269/254,513/0/default.jpg 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2399,412,2114,4269/475,959/0/default.jpg 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1578,412,3756,4269/337,383/0/default.webp 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1582,412,3748,4269/475,541/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1580,412,3752,4269/675,768/0/default.webp 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1582,412,3748,4269/950,1082/0/default.webp 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1578,412,3756,4269/337,383/0/default.jpg 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1582,412,3748,4269/475,541/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1580,412,3752,4269/675,768/0/default.jpg 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1582,412,3748,4269/950,1082/0/default.jpg 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/709,412,5495,4269/475,369/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/705,412,5503,4269/633,491/0/default.webp 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/709,412,5495,4269/950,738/0/default.webp 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/709,412,5495,4269/475,369/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/705,412,5503,4269/633,491/0/default.jpg 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/709,412,5495,4269/950,738/0/default.jpg 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2474,412,1965,4269/320,695/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2475,412,1963,4269/380,826/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2474,412,1964,4269/415,902/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2474,412,1965,4269/320,695/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2475,412,1963,4269/380,826/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2474,412,1964,4269/415,902/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1855,412,3203,4269/385,513/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1856,412,3201,4269/720,960/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1855,412,3203,4269/385,513/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1856,412,3201,4269/720,960/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/610,412,5692,4269/512,384/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/616,412,5681,4269/720,541/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/614,412,5684,4269/1024,769/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/616,412,5681,4269/1440,1082/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/610,412,5692,4269/512,384/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/616,412,5681,4269/720,541/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/614,412,5684,4269/1024,769/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/616,412,5681,4269/1440,1082/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3294/720,369/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3294/960,492/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3294/1440,738/0/default.webp 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3294/720,369/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3294/960,492/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3294/1440,738/0/default.jpg 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1968,412,2976,4269/320,459/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1968,412,2976,4269/380,545/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1968,412,2977,4269/415,595/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1968,412,2976,4269/320,459/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1968,412,2976,4269/380,545/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1968,412,2977,4269/415,595/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1025,412,4862,4269/385,338/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1029,412,4855,4269/720,633/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1025,412,4862,4269/385,338/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1029,412,4855,4269/720,633/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3189/512,254/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3187/720,357/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3189/1024,508/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3187/1440,714/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3189/512,254/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3187/720,357/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3189/1024,508/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3187/1440,714/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,832,6429,2169/720,243/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,832,6429,2169/960,324/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,829,6429,2174/1440,487/0/default.webp 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,832,6429,2169/720,243/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,832,6429,2169/960,324/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,829,6429,2174/1440,487/0/default.jpg 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1491,412,3931,4269/640,695/0/default.webp 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1493,412,3927,4269/760,826/0/default.webp 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1492,412,3928,4269/830,902/0/default.webp 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1491,412,3931,4269/640,695/0/default.jpg 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1493,412,3927,4269/760,826/0/default.jpg 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1492,412,3928,4269/830,902/0/default.jpg 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6407,4269/770,513/0/default.webp 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6403,4269/1440,960/0/default.webp 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6407,4269/770,513/0/default.jpg 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6403,4269/1440,960/0/default.jpg 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,711,6429,2410/1024,384/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,709,6429,2415/1440,541/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,709,6429,2414/2048,769/0/default.webp 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,709,6429,2415/2880,1082/0/default.webp 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,711,6429,2410/1024,384/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,709,6429,2415/1440,541/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,709,6429,2414/2048,769/0/default.jpg 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,709,6429,2415/2880,1082/0/default.jpg 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1093,6429,1647/1440,369/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1093,6429,1647/1920,492/0/default.webp 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1093,6429,1647/2880,738/0/default.webp 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1093,6429,1647/1440,369/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1093,6429,1647/1920,492/0/default.jpg 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1093,6429,1647/2880,738/0/default.jpg 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="Hollandse stomers, 1829" class="lazy-image not-loaded " data-src="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/954,412,5004,4269/633,540/0/default.jpg" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2800,412,1313,4269/20,65/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2389,412,2134,4269/20,40/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1516,412,3880,4269/20,22/0/default.jpg" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/610,412,5692,4269/20,15/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/2464,412,1985,4269/20,43/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1815,412,3283,4269/20,26/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/610,412,5692,4269/20,15/0/default.jpg" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3214/20,10/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1932,412,3049,4269/20,28/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/945,412,5022,4269/20,17/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,470,6429,2893/20,9/0/default.jpg" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,952,6429,1928/20,6/0/default.jpg" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/1424,412,4065,4269/20,21/0/default.jpg" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,4178/20,13/0/default.jpg" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,791,6429,2250/20,7/0/default.jpg" /><source sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,1113,6429,1607/20,5/0/default.jpg" /><img :style="objectPositionStyle" alt="Hollandse stomers, 1829" class="lazy-image-placeholder" src="https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/422,412,6429,3535/20,11/0/default.jpg" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Kikkers en kaaskoppen
        </span>
      </h3>

        <p class="block-content-subtitle">
          18 november t/m 16 mei 2022
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/xxl-papier" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1378,113,1068,3516/211,694/0/default.webp 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1378,113,1068,3516/250,823/0/default.webp 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1379,113,1067,3516/273,899/0/default.webp 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1378,113,1068,3516/211,694/0/default.jpg 211w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1378,113,1068,3516/250,823/0/default.jpg 250w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1379,113,1067,3516/273,899/0/default.jpg 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1042,113,1740,3516/254,513/0/default.webp 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1042,113,1741,3516/475,959/0/default.webp 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1042,113,1740,3516/254,513/0/default.jpg 254w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1042,113,1741,3516/475,959/0/default.jpg 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/366,113,3093,3516/337,383/0/default.webp 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/369,113,3087,3516/475,541/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/367,113,3090,3516/675,768/0/default.webp 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/369,113,3087,3516/950,1082/0/default.webp 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/366,113,3093,3516/337,383/0/default.jpg 337w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/369,113,3087,3516/475,541/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/367,113,3090,3516/675,768/0/default.jpg 675w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/369,113,3087,3516/950,1082/0/default.jpg 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,467,3628,2818/475,369/0/default.webp 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,469,3628,2814/633,491/0/default.webp 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,467,3628,2818/950,738/0/default.webp 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,467,3628,2818/475,369/0/default.jpg 475w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,469,3628,2814/633,491/0/default.jpg 633w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,467,3628,2818/950,738/0/default.jpg 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1103,113,1618,3516/320,695/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1104,113,1617,3516/380,826/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1104,113,1617,3516/415,902/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1103,113,1618,3516/320,695/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1104,113,1617,3516/380,826/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1104,113,1617,3516/415,902/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/593,113,2638,3516/385,513/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/594,113,2637,3516/720,960/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/593,113,2638,3516/385,513/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/594,113,2637,3516/720,960/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,516,3628,2721/512,384/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,513,3628,2726/720,541/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,514,3628,2724/1024,769/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,513,3628,2726/1440,1082/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,516,3628,2721/512,384/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,513,3628,2726/720,541/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,514,3628,2724/1024,769/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,513,3628,2726/1440,1082/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,947,3628,1859/720,369/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,947,3628,1859/960,492/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,947,3628,1859/1440,738/0/default.webp 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,947,3628,1859/720,369/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,947,3628,1859/960,492/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,947,3628,1859/1440,738/0/default.jpg 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/687,113,2451,3516/320,459/0/default.webp 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/687,113,2451,3516/380,545/0/default.webp 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/686,113,2452,3516/415,595/0/default.webp 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/687,113,2451,3516/320,459/0/default.jpg 320w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/687,113,2451,3516/380,545/0/default.jpg 380w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/686,113,2452,3516/415,595/0/default.jpg 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,284,3628,3185/385,338/0/default.webp 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,282,3628,3189/720,633/0/default.webp 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,284,3628,3185/385,338/0/default.jpg 385w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,282,3628,3189/720,633/0/default.jpg 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1799/512,254/0/default.webp 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1798/720,357/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1799/1024,508/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1798/1440,714/0/default.webp 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1799/512,254/0/default.jpg 512w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1798/720,357/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1799/1024,508/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,977,3628,1798/1440,714/0/default.jpg 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1264,3628,1224/720,243/0/default.webp 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1264,3628,1224/960,324/0/default.webp 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1263,3628,1226/1440,487/0/default.webp 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1264,3628,1224/720,243/0/default.jpg 720w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1264,3628,1224/960,324/0/default.jpg 960w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1263,3628,1226/1440,487/0/default.jpg 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/294,113,3237,3516/640,695/0/default.webp 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/295,113,3235,3516/760,826/0/default.webp 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/295,113,3235,3516/830,902/0/default.webp 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/294,113,3237,3516/640,695/0/default.jpg 640w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/295,113,3235,3516/760,826/0/default.jpg 760w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/295,113,3235,3516/830,902/0/default.jpg 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,668,3628,2417/770,513/0/default.webp 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,667,3628,2418/1440,960/0/default.webp 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,668,3628,2417/770,513/0/default.jpg 770w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,667,3628,2418/1440,960/0/default.jpg 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1196,3628,1360/1024,384/0/default.webp 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1195,3628,1363/1440,541/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1195,3628,1362/2048,769/0/default.webp 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1195,3628,1363/2880,1082/0/default.webp 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1196,3628,1360/1024,384/0/default.jpg 1024w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1195,3628,1363/1440,541/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1195,3628,1362/2048,769/0/default.jpg 2048w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1195,3628,1363/2880,1082/0/default.jpg 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1412,3628,929/1440,369/0/default.webp 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1412,3628,929/1920,492/0/default.webp 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1412,3628,929/2880,738/0/default.webp 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1412,3628,929/1440,369/0/default.jpg 1440w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1412,3628,929/1920,492/0/default.jpg 1920w,https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1412,3628,929/2880,738/0/default.jpg 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="Landing van Scipio Africanus bij Carthago" class="lazy-image not-loaded " data-src="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,329,3628,3094/633,540/0/default.jpg" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1372,113,1081,3516/20,65/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1033,113,1758,3516/20,40/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/314,113,3196,3516/20,22/0/default.jpg" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,516,3628,2721/20,15/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/1095,113,1635,3516/20,43/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/560,113,2704,3516/20,26/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,516,3628,2721/20,15/0/default.jpg" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,969,3628,1814/20,10/0/default.jpg" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/657,113,2511,3516/20,28/0/default.jpg" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,335,3628,3083/20,17/0/default.jpg" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1060,3628,1632/20,9/0/default.jpg" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1332,3628,1088/20,6/0/default.jpg" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/238,113,3348,3516/20,21/0/default.jpg" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,697,3628,2358/20,13/0/default.jpg" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1242,3628,1269/20,7/0/default.jpg" /><source sizes="" srcset="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,1423,3628,907/20,5/0/default.jpg" /><img :style="objectPositionStyle" alt="Landing van Scipio Africanus bij Carthago" class="lazy-image-placeholder" src="https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,879,3628,1995/20,11/0/default.jpg" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">

      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          XXL Papier
        </span>
      </h3>

        <p class="block-content-subtitle">
          1 juli t/m 4 september 2022
        </p>
    </div>
  </div>
</a>

    </div>
    <div class="whatson-filtered">

<a href="/nl/zien-en-doen/tentoonstellingen/modern-japans-lak" class="fit-parent object-fit-container cover block-link">


<focus-point-image :object-positions='[
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 80em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em) and (orientation: landscape)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20) and (min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(min-width: 41.6875em)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 3/4)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 4/3)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "(max-aspect-ratio: 39/20)",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  },
  {
    "mediaQuery": "",
    "objectPosition": "center center"
  }
]' inline-template>
  <div class="background-image fit-parent object-fit-container cover" :style="backgroundPositionStyle">
    <picture><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=211&amp;h=694&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=36ff68bbe2cbc88051d461cda731c144cc3aaa6c23bbf656546e280b5669159e 211w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=250&amp;h=823&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=9c240ae666d720a1df48b0f4be4b743e42bd9d2037f020efff5003facf11f670 250w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=273&amp;h=899&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=ecc60b59ae28698cc760c400260480ab1a116517492c8aa5074acc589b95cdce 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=211&amp;h=694&amp;fx=1050&amp;fy=792&amp;c=b66db8c2d4c2fa61bdcfba8f1b1ba4707e5d33c4bf9e3c5c89eb35ae6df101c4 211w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=250&amp;h=823&amp;fx=1050&amp;fy=792&amp;c=d6ff4fc0f18a4b64047a062bfd393bddea4c0505f5f79f90deb11e1938cd1e41 250w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=273&amp;h=899&amp;fx=1050&amp;fy=792&amp;c=e6f4475f6c78af5e9536d53454391f8385da51b120f6e3d490c8e056ae33ebb3 273w" media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=254&amp;h=513&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=5318294e8cc711faf48438af0cd7ef25addb54ca2373782a99a5239a0ff0e2ff 254w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=475&amp;h=959&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=0023cc3367953454d185680bb3a81c3b982acd28afce81d33745a6ff6cd8a2a0 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=254&amp;h=513&amp;fx=1050&amp;fy=792&amp;c=b4280126aed5bc7c8fe954a66bf6fb6676df8941df0fc1e4422a36adfa97788a 254w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=475&amp;h=959&amp;fx=1050&amp;fy=792&amp;c=ac22d269dbd85aac220b66ca233096b6edbd982c35f13da94d63592e2acc220a 475w" media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=337&amp;h=383&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=db8d199129f3f134e998d7a204b7cff3d6f764b75b079aa4b90449c25d7cbeaf 337w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=475&amp;h=541&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=8627bb2ad32db3ef8f0ef3c27968b3c5dfdbdff76df4da7f77bda4326a61fa8c 475w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=675&amp;h=768&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=55787b7e06f27e8533fd510cda1a457ad9a8f7f170509fd2ab8599d7f1b02c1f 675w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=950&amp;h=1082&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=27b4cb4e8843e4598a2f57e590790cbea49323b7ef2acbe24b2b8236f2eacef6 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=337&amp;h=383&amp;fx=1050&amp;fy=792&amp;c=a3eeff612ae667398c132c6c93d97763574b18a04341af8381aefbfad2f9e1e2 337w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=475&amp;h=541&amp;fx=1050&amp;fy=792&amp;c=b76da62ce88d40169806db1ea726f96591707a1c2a64ec8949e162c6633b0542 475w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=675&amp;h=768&amp;fx=1050&amp;fy=792&amp;c=5f5de997d00ea1c75e5f92ec43d0eb9fd15ddc000e7cc44f9edb1d493ba70805 675w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=950&amp;h=1082&amp;fx=1050&amp;fy=792&amp;c=3a9e33ef75262ab50f2932939f8480dd5b098e0f0569b23917e486cab6061b62 950w" media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=475&amp;h=369&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=b051b33eafa82ca4938f98b91e17607acb500aec583a82622ebbf0a8f79ce2c6 475w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=633&amp;h=491&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=53e5436b1b267b37c304af29a4710cc1fee0cb5fbb0a322039b48463d82e9ff9 633w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=950&amp;h=738&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=c518db13fb1139149fdce65821f7c73bb2721c33f00bbbc96a5f77d51a0ad72c 950w" media="(min-width: 80em)" sizes="33vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=475&amp;h=369&amp;fx=1050&amp;fy=792&amp;c=a192f0583700094a9109144b4bfc45d09b07731604ca35979bb29416a1860032 475w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=633&amp;h=491&amp;fx=1050&amp;fy=792&amp;c=6b73f13030efbe8e654d94e08ff3c90a2d1ceb8eaa152d0ac915b6ac18c18ed2 633w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=950&amp;h=738&amp;fx=1050&amp;fy=792&amp;c=5375566c75501886c2c2dc8f5365e2398a3a8c2eda5237c5651e1467356c3b6c 950w" media="(min-width: 80em)" sizes="33vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=320&amp;h=695&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=36c119179aa408f1906b120299c6b98a88cbb8f029e1fe8ad889586596becdaf 320w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=380&amp;h=826&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=a6add8965c6030dc60428cd0c95eb04dafc49ad87a35589b4dae962e78cd103b 380w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=415&amp;h=902&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=3334cb69a73296c7a71eace1279493b592809f9fdb08720614b320b8ba90d7e7 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=320&amp;h=695&amp;fx=1050&amp;fy=792&amp;c=055b3b99b135f8b4064269b686a973453a720da6345a75e660d2a81bef7c9164 320w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=380&amp;h=826&amp;fx=1050&amp;fy=792&amp;c=7df3d4b3ca29a9ae8745e70345e991b52f109342c21d8ed9bfa9886df2d5c420 380w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=415&amp;h=902&amp;fx=1050&amp;fy=792&amp;c=c6a5ffec409151297179b4371299725e8ad4f771e2801e371257aa35897a80b4 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=385&amp;h=513&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=22470212073b93a4001bee3d09227b0ec016f8e21611b6f71e86d82904621f43 385w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=960&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=2bfb2bf42d592a24f18c279dda8979cd728e98ebb98484bff81b7b78aca72614 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=385&amp;h=513&amp;fx=1050&amp;fy=792&amp;c=b0f39ee6607358b47ba785f56e247f13c2e104221ea1d91fa06d4b565b437b00 385w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=960&amp;fx=1050&amp;fy=792&amp;c=38e954a464b526030c33b50c39c0c4d1453a153b1014492b94dfbc6279594d38 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=512&amp;h=384&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=6e4ddb6778bbab11503783f27b9acba3a0035f0d299456e71336787624b307c4 512w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=541&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=acaf1ea92546b5ae98626a6d32e99485f53b6058dae8792b3ffb5beb1de5f22d 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1024&amp;h=769&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=ef757c29ba912b46678babfa5bf23211d551c93ecf3e09e0a380c05e00ec3aa6 1024w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=1082&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=f3ee22d1ceac8d7b279f82862283b176b33267de653255cc80a511207fce9f9b 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=512&amp;h=384&amp;fx=1050&amp;fy=792&amp;c=74b4f2d25194ef0b685dfa2f32dfb2c933a148bab4ec6bf4fc9e4122488b69d7 512w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=541&amp;fx=1050&amp;fy=792&amp;c=5d5e4c83cf73383fb471b7ba9da2195547bee6c6ccade4716237cd3722dd1445 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1024&amp;h=769&amp;fx=1050&amp;fy=792&amp;c=941bb9392d2071aa1b644d683168e4fe37fc3bf488a9e83d40b7216c89106f05 1024w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=1082&amp;fx=1050&amp;fy=792&amp;c=eeb9f2309d92dad2afdefa2d8b05fc9344676ec6ba8ad7c910b9faf7d4881883 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=369&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=8521335f3bea6660cd677b7917a2a9a5b8b0ba0526e662787948765ea3fb4e88 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=960&amp;h=492&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=8d83e0721fd8f1d76249d1257eba41f97ebb1ed61574b8552165fcebf95ef19f 960w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=738&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=2558a6572897f9433074f17a5cf619f3c12d615f2cf18455e1503d20a96005ee 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=369&amp;fx=1050&amp;fy=792&amp;c=6214158858dfa19f931a773b1c21776e8249bb6f4b4a0b12322256e89f7125dd 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=960&amp;h=492&amp;fx=1050&amp;fy=792&amp;c=d92ce5155007adb200eb3f503edabed7b84fb9dbb5342ac3f8dbffb059065b04 960w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=738&amp;fx=1050&amp;fy=792&amp;c=f80ad3315488d73215897739bf1e85b45c2149b7ba9fea81c77b8a4394be309f 1440w" media="(min-width: 41.6875em) and (orientation: landscape)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=320&amp;h=459&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=d0cecf4f6db893ad279b9bc914aed0347c979564a460daa3df27fa0572a95320 320w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=380&amp;h=545&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=2b58b24b3b349f95f861b97ff24ef5b03eea935d8ea80cfcd4cdd11cbec5b303 380w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=415&amp;h=595&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=595833278d863b17ece75c5544d3751facc2c817764642250929cefdc4ce9ff0 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=320&amp;h=459&amp;fx=1050&amp;fy=792&amp;c=63e8b49e8f5553d823bb1c31ebc70d974f0f20a31b5771226d9a8cd60fd4bd5d 320w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=380&amp;h=545&amp;fx=1050&amp;fy=792&amp;c=551ae63af8255e796bca025a9cc0ef3ef3b4707b9ba324084db6fb8aa2c9f846 380w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=415&amp;h=595&amp;fx=1050&amp;fy=792&amp;c=2860175a152ef3b6b9da12457543542854b1d21d096116747975731fea3b2fa0 415w" media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=385&amp;h=338&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=308a92a79a9bfbec87130db018024950fd0ee7e8257731149187daed454e9c99 385w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=633&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=31bfd34eb15499208b12949628a6aebcf257e5bdbe398294f61121d9a8233cac 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=385&amp;h=338&amp;fx=1050&amp;fy=792&amp;c=806dfe45bd58e5628cbdf2e6c9b09b0a7576e64155cd3b40fea5cbc8d41df0c3 385w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=633&amp;fx=1050&amp;fy=792&amp;c=68627dcfef23c1a11035efd39715b625f0e4868f528ec850a6cad314ecdeeace 720w" media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=512&amp;h=254&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=380a14a56c20aa0e5765b32c68e469b2cfc46509a27e1e9cc93b0fe6070375f2 512w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=357&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=549b708a2b4ccd353dae654aedf268dca8ba3affb5f42a96324514841d0ba3fc 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1024&amp;h=508&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=31fd42aa80c4fcba611a54ee46aae1c204faa5aae0e6cbdfda10804138637219 1024w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=714&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=06f3db8e78f088f9707ed7a21dab047fa089cc5fc4831774f3ccbc52917d4b11 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=512&amp;h=254&amp;fx=1050&amp;fy=792&amp;c=31fec8a41ac10816be051c3cc1556e79ef0eec53f650fed2dd15d963c56a5913 512w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=357&amp;fx=1050&amp;fy=792&amp;c=42bb91664bbe3b6d635a7e7c649c2845305b6f9febbba46ddc5d6e944e9be604 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1024&amp;h=508&amp;fx=1050&amp;fy=792&amp;c=c127d0dd85e99eb0646a0a20abb96b60283edb7619898a36c91059e5e96c465e 1024w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=714&amp;fx=1050&amp;fy=792&amp;c=19f69f3c7855c4deddeb3f0bc382ae72b80e2ddf722a3d2210098b0304477a9a 1440w" media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=243&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=ee69d20be79562ac969e25161efa551da586466b2d33e0943493bd0723ad7264 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=960&amp;h=324&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=62ef1d1299d9ed2ce513c6cee7f60c68d189c9f935844f46aad516f4442d99d9 960w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=487&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=92420398d6f6c1de328e2a7568d055c6b11b5a13dcd16e10a5e941e619e7a610 1440w" media="(min-width: 41.6875em)" sizes="50vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=720&amp;h=243&amp;fx=1050&amp;fy=792&amp;c=aa84181cd020f75541ce09919afa43193dd2c535ce13ff1d7a927d0d62db716d 720w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=960&amp;h=324&amp;fx=1050&amp;fy=792&amp;c=04681af91cfa09f6d19cad97044cb200302a75d4bf144f03dfa15d61f1161ff6 960w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=487&amp;fx=1050&amp;fy=792&amp;c=b0e4f169f10a0877680dd08d227f97e8e8488e0e9ffb2bbe09ca581cedb1c222 1440w" media="(min-width: 41.6875em)" sizes="50vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=640&amp;h=695&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=88f126ce72f2da8e23d8e1860501467e8de202460777e58f940c29937f5326eb 640w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=760&amp;h=826&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=dc3d406576eac86c92c364aeadaed3d13413d7b0197bbc5bd45e79bfa63e5e27 760w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=830&amp;h=902&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=ba5b534bc5c17046ea8184ae9d729c19181f47e23bb43fbea4e4f0e56a862e45 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=640&amp;h=695&amp;fx=1050&amp;fy=792&amp;c=95a4b09244eff929f1da23587005df73f7c4c045915f42dcb662872700edd1e2 640w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=760&amp;h=826&amp;fx=1050&amp;fy=792&amp;c=b0df2b9c41a929152e8d8165911f786feedd5093b4e4925b61d413283c15e070 760w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=830&amp;h=902&amp;fx=1050&amp;fy=792&amp;c=b7e5807330e49205aa0bc2afa146190d94f7e244fb1f8eb7a26d3c2e27b1c999 830w" media="(max-aspect-ratio: 3/4)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=770&amp;h=513&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=46dac97887e4f9bfbd33dcf0ba7dcb57747960d2d369d262480c581ab402c3af 770w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=960&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=2317882c554de739dbf2107b4d77dc11b0282f776d49f4a27115b1b41f9edb93 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=770&amp;h=513&amp;fx=1050&amp;fy=792&amp;c=12462b6d24bc0d049971323db514a0cdd962603094570c131bf0377c180a4ad1 770w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=960&amp;fx=1050&amp;fy=792&amp;c=3c0ced13e3b9fb25be1f040359be5503101f5321e882ef2a377cc6e7f99f935e 1440w" media="(max-aspect-ratio: 4/3)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1024&amp;h=384&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=1a2a8753ef2c15c80e2ad854fe274efda94041708396abd3da32d7771dc295fc 1024w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=541&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=a577d899ae1f8a31d4f1da41ccf0c5a5ed14c4558c2fa2b4558d6ba87f136790 1440w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=2048&amp;h=769&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=bbdfbd906974dfecf1a20cf13ce9a3115fece774db7cc4dec43e590887b07dac 2048w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=2880&amp;h=1082&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=7e4bbc807f05a7aa44db96e3d6e2d13e193cc202002ceb0320ea303e179cfe22 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1024&amp;h=384&amp;fx=1050&amp;fy=792&amp;c=3c5d26f14c2204100b99a81c65ed59fced2adea3b93ce141fbd925aaad1ea487 1024w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=541&amp;fx=1050&amp;fy=792&amp;c=286e43ebfb40b15aded074761f70ceb1850a4ef4c7481a49d344feeea7be41bb 1440w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=2048&amp;h=769&amp;fx=1050&amp;fy=792&amp;c=c50455f2ab22f54435f953dcb94d17813bcd00a52f1482ac9be0f418cd4d4795 2048w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=2880&amp;h=1082&amp;fx=1050&amp;fy=792&amp;c=04e1e6d89aef6501abff4f135e88db82db8bf1e89892441d4f3d799f6292316c 2880w" media="(max-aspect-ratio: 39/20)" sizes="100vw" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=369&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=aff47428ab1a54c454b7b16ecc8fef21e69a6ceaf9aee66cf61387264f602e51 1440w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1920&amp;h=492&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=bec32a5d10c6bc9c6953955eb258fbee327ddc32f4d052e2d0b10d36b183de91 1920w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=2880&amp;h=738&amp;fx=1050&amp;fy=792&amp;format=webp&amp;c=da90259754f29983078e00bfd6a37532cf2fea7b006bae707367d428ddc9ed9c 2880w" sizes="100vw" type="image/webp" /><source data-srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1440&amp;h=369&amp;fx=1050&amp;fy=792&amp;c=044e1d91bd9dad313fdd4a5ed0f18e85e4d38b7ca79c8dab4dd0f2f9facfa794 1440w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=1920&amp;h=492&amp;fx=1050&amp;fy=792&amp;c=84007c613895c3d31e68713a1f601ff7a241a91cbc722b46c8ff713f498feb7e 1920w,https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=2880&amp;h=738&amp;fx=1050&amp;fy=792&amp;c=15a0f3def25425262816f8c0d7b2a9e665e9aa980c735c612da7d41ac70c301d 2880w" sizes="100vw" /><img :style="objectPositionStyle" alt="" class="lazy-image not-loaded " data-src="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=633&amp;h=540&amp;fx=1050&amp;fy=792&amp;c=0e32f5e53b999aca80eff83e57adb96bd44752efe1718900dd6d4cf5c38b0498" /></picture>
      <picture><source media="(max-aspect-ratio: 3/4) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=65&amp;fx=1050&amp;fy=792&amp;c=4338720e80604d7e1aa24e311367b615d86b216e42f0db186b62a70c3cf815c6" /><source media="(max-aspect-ratio: 4/3) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=40&amp;fx=1050&amp;fy=792&amp;c=214dd4ac832107b11b9072bce2edcd18e14edbdef83a54c12069188cc16bbdcc" /><source media="(max-aspect-ratio: 39/20) and (min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=22&amp;fx=1050&amp;fy=792&amp;c=d05c682714107475863cc8cee554f32ca6abd828b7bd0fbb63e1db8cf0603a0d" /><source media="(min-width: 80em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=15&amp;fx=1050&amp;fy=792&amp;c=e921fa689badbd6a963bb97a16e057ba02426f15400683f09bf598b7c58357f0" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=43&amp;fx=1050&amp;fy=792&amp;c=5ce8945aab84262eaea007e785659ac85ed62ad3e9a0185ef912499c90c33863" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=26&amp;fx=1050&amp;fy=792&amp;c=7818c46b9f80423285b12057e5419cd58dcd794a83e931d6aa053dbe00fa176e" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=15&amp;fx=1050&amp;fy=792&amp;c=e921fa689badbd6a963bb97a16e057ba02426f15400683f09bf598b7c58357f0" /><source media="(min-width: 41.6875em) and (orientation: landscape)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=10&amp;fx=1050&amp;fy=792&amp;c=7953acc123992fb53cdecbc697616a4ccf3e72b8c1049520efadb0ede9bdff10" /><source media="(max-aspect-ratio: 3/4) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=28&amp;fx=1050&amp;fy=792&amp;c=d0dbf3abfa51711bb24ef17b8176992e02a67ee5a96aa90709e1246bd7e9b8f4" /><source media="(max-aspect-ratio: 4/3) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=17&amp;fx=1050&amp;fy=792&amp;c=75df50650eb6709800bc569487bdcb19a26be0dd3a176398560ead5b57468229" /><source media="(max-aspect-ratio: 39/20) and (min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=9&amp;fx=1050&amp;fy=792&amp;c=ed133fa2cbf64ef958eb6688eeb043c55ac8369231495698cd31192650d3101a" /><source media="(min-width: 41.6875em)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=6&amp;fx=1050&amp;fy=792&amp;c=cf1dbafbf4f4381338ffe890f6f142e2543ea2aea563690d7fba73bb7aba3563" /><source media="(max-aspect-ratio: 3/4)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=21&amp;fx=1050&amp;fy=792&amp;c=8bac2d203ff0b7ce8013113dd13c9356845b5ffc8fae85b919f56648121f6812" /><source media="(max-aspect-ratio: 4/3)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=13&amp;fx=1050&amp;fy=792&amp;c=bbe57acf4924c2029274a5f2e4a44548e34251bbca3f0db2f1db42ae446c7d51" /><source media="(max-aspect-ratio: 39/20)" sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=7&amp;fx=1050&amp;fy=792&amp;c=1bb0375d13c3d34e53eb6ba3011c3943f4d93cde0dae1b51be96acf4cc0de282" /><source sizes="" srcset="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=5&amp;fx=1050&amp;fy=792&amp;c=71598446f191fd9ca7daa3d818b8e9f09e0ea65a2af0ba3d6c5284f4215de332" /><img :style="objectPositionStyle" alt="" class="lazy-image-placeholder" src="https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=20&amp;h=11&amp;fx=1050&amp;fy=792&amp;c=ee9fc307a093439d7770da74fd9a2ece0df82a3b0721052c46ea1501ade0da2a" /></picture>
  </div>
</focus-point-image>


  <div class="block-content grid-row">
    <div class="fit-width-content">
      <h3 class="heading-3 whatson-filtered-heading link link-inverse">
        <span>
          Modern Japans Lak
        </span>
      </h3>
        <p class="block-content-subtitle">
          1 juli t/m 4 september 2022
        </p>
    </div>
  </div>
</a>
    </div>
</div>
      </div>
    </transition>
  </div>
</whats-on>
    `;

    nockRijksmuseum
      .get(/zien-en-doen/)
      .reply(200, rawHTML);

    const events = await collect();

    expect(events).toMatchObject([{
      title: 'Modern Japans Lak',
      closeDate: moment('2022-09-04').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/modern-japans-lak',
      image: 'https://rijks-frontend.azureedge.net/assets/c1ef1f3c-e656-4821-9b0c-9153bfc26abb?w=633&h=540&fx=1050&fy=792&c=0e32f5e53b999aca80eff83e57adb96bd44752efe1718900dd6d4cf5c38b0498',
    }, {
      title: 'XXL Papier',
      closeDate: moment('2022-09-04').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/xxl-papier',
      image: 'https://rijks-api-iiif-server.azurewebsites.net/iiif/vJLoO/94,329,3628,3094/633,540/0/default.jpg',
    }, {
      title: 'Kikkers en kaaskoppen',
      closeDate: moment('2022-05-16').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/kikkers-en-kaaskoppen',
      image: 'https://rijks-api-iiif-server.azurewebsites.net/iiif/mlOps/954,412,5004,4269/633,540/0/default.jpg',
    }, {
      title: 'REVOLUSI!',
      closeDate: moment('2022-06-06').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/revolusi',
      image: 'https://rijks-frontend.azureedge.net/assets/3d0b9573-65cf-4baa-8332-1017ee1d3021?w=633&h=540&fx=825&fy=600&c=95507c0b15198143a7b00d73c27f2d77b376275f7b11de846cfd284066c9d3d1',
    }, {
      title: 'Vincent Mentzel',
      closeDate: moment('2022-06-06').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/vincent-mentzel',
      image: 'https://rijks-api-iiif-server.azurewebsites.net/iiif/NKLVg/625,225,3414,2913/633,540/0/default.jpg',
    }, {
      title: 'Historisch Amsterdam',
      closeDate: moment('2022-11-14').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/historisch-amsterdam',
      image: 'https://rijks-frontend.azureedge.net/assets/30bfd8ac-1bc0-46b1-8c1c-5b32db11d100?w=633&h=540&fx=1150&fy=1132&c=7d14aed39cb60f49a436ca106b9f2b1318316d58d56d826b14e509b300341e4b',
    }, {
      title: 'Muziekparade',
      closeDate: moment('2022-12-04').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/muziekparade',
      image: 'https://rijks-frontend.azureedge.net/assets/12087c61-29a6-45b4-a655-63913bed2ae8?w=633&h=540&fx=1999&fy=3312&c=e48b42364df3f9e35d757ddf01801cface7e7e8928a39c2fee3f1fd1a4bb8457',
    }, {
      title: 'Zwart Goud',
      closeDate: moment('2022-12-31').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/zwart-goud',
      image: 'https://rijks-frontend.azureedge.net/assets/68365e3c-56ca-45ac-bb3d-b04114dff82e?w=633&h=540&fx=2133&fy=956&c=5ddc03f7b4bef6aa7a75627f8f2bf55871fd773f1d0d0fd717dfb9676b13903a',
    }, {
      title: 'Ellsworth Kelly',
      closeDate: moment('2022-10-24').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/ellsworth-kelly',
      image: 'https://rijks-frontend.azureedge.net/assets/2d031a31-c782-4a43-ba7b-1cf6a54e215a?w=633&h=540&fx=3553&fy=2475&c=b8675d052f92cf4ef8245fbf2205b5b56b2b7e858fa69dce48666405bcf9054f',
    }, {
      title: 'Rijksmuseum & Slavernij',
      closeDate: moment('2023-02-28').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/rijksmuseum-en-slavernij',
      image: 'https://rijks-api-iiif-server.azurewebsites.net/iiif/lfBJf/506,0,4463,3808/633,540/0/default.jpg',
    }, {
      title: 'Document Nederland: Henk Wildschut',
      closeDate: moment('2023-01-16').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/henk-wildschut',
      image: 'https://rijks-frontend.azureedge.net/assets/7b0c33fa-d67a-494b-ab4f-e626fabaa8d2?w=633&h=540&fx=4492&fy=3366&c=7e081466bbef42957a375fcbd670898785790c0d65fec4a4436585662f714e23',
    }, {
      title: 'Vergeet me niet',
      closeDate: moment('2023-01-16').toDate(),
      gallery: {
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        website: 'https://www.rijksmuseum.nl/nl',
    },
      website: 'https://www.rijksmuseum.nl/nl/zien-en-doen/tentoonstellingen/vergeet-me-niet',
      image: 'https://rijks-frontend.azureedge.net/assets/65b66683-1534-45d7-8f99-de3699cdeed7?w=633&h=540&fx=1203&fy=1694&c=e2e69ef09cf3fa873ea46962a06c800cb844a176b46e6f3518becc15437d9691',
    }])
  });

  it('should fail gracefully when not OK', async () => {
    nockRijksmuseum
      .get(/zien-en-doen/)
      .reply(404);

    await expect(collect()).rejects.toThrow(/404/);
  });

  it('should fail gracefully when malformed', async () => {
    nockRijksmuseum
      .get(/zien-en-doen/)
      .reply(200, 'malformed response');

    const events = await collect();

    expect(events.length).toBe(0);
  });
});
