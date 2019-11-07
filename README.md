# some gallery thing

[![Build status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftlwr%2Fsome-gallery-thing%2Fbadge&style=flat-square)](https://github.com/tlwr/some-gallery-thing/actions)
[![License](https://img.shields.io/github/license/tlwr/some-gallery-thing?style=flat-square)](https://github.com/tlwr/some-gallery-thing/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/tlwr/some-gallery-thing?style=flat-square)](https://github.com/tlwr/some-gallery-thing/graphs/contributors)
[![Last commit](https://img.shields.io/github/last-commit/tlwr/some-gallery-thing?style=flat-square)](https://github.com/tlwr/some-gallery-thing/commit/HEAD)

> As a person who looks at art, I want to see what is on in my local area, so I
> can go see art.

# development

1. install nodejs LTS
2. `npm install`
3. `npm run watch`
4. open `localhost:8080`

# deployment

1. Manually using `wrangler publish`

Or

1. Push to master via GitHub actions

Or

1. Every two hours via GitHub actions

# structure

`src` is where the rest of the source code goes. `src/public` is where assets
(CSS and images) live.

`src/controllers` is the directory where the visual components live.

This project uses `typescript`, `jest`, and `sass`.

Types are defined in `src/types`. Examples and static data goes in `src/data`.
