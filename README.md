# some gallery thing

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tlwr/some-gallery-thing/deploy?label=build)](https://github.com/tlwr/some-gallery-thing/actions)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tlwr/some-gallery-thing/scrape?label=scrape)](https://github.com/tlwr/some-gallery-thing/actions)
[![License](https://img.shields.io/github/license/tlwr/some-gallery-thing?style=flat-square)](https://github.com/tlwr/some-gallery-thing/blob/main/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/tlwr/some-gallery-thing?style=flat-square)](https://github.com/tlwr/some-gallery-thing/graphs/contributors)
[![Last commit](https://img.shields.io/github/last-commit/tlwr/some-gallery-thing?style=flat-square)](https://github.com/tlwr/some-gallery-thing/commit/HEAD)

> As a person who looks at art, I want to see what is on in my local area, so I
> can go see art.

# workflow

1. GHA runs a CI pipeline which compiles TS to scrape gallery websites
1. GHA compiles TS code into JS bundle
1. GHA uses wrangler to upload events JSON to Cloudflare KV
1. GHA uses wrangler to deploy JS bundle to Cloudflare workers
1. Cloudflare worker hosts [some-gallery-thing.toby.codes](https://some-gallery-thing.toby.codes)

# development

1. install nodejs LTS
2. `npm install`
3. `npm run watch`
4. open `localhost:8080`

# deployment

1. Manually using `wrangler publish`

Or

1. Push to main via GitHub actions

Or

1. Every two hours via GitHub actions

# structure

`src` is where the rest of the source code goes. `src/public` is where assets
(CSS and images) live.

`src/controllers` is the directory where the visual components live.

This project uses `typescript`, `jest`, and `sass`.

Types are defined in `src/types`. Examples and static data goes in `src/data`.
