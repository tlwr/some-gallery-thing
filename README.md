# some gallery thing

![](https://img.shields.io/github/license/tlwr/some-gallery-thing?style=flat-square)
![](https://img.shields.io/github/contributors/tlwr/some-gallery-thing?style=flat-square)
![](https://img.shields.io/github/last-commit/tlwr/some-gallery-thing?style=flat-square)

> As a person who looks at art, I want to see what is on in my local area, so I
> can go see art.

# development

1. install nodejs LTS
2. `npm install`
3. `npm run watch`
4. open `localhost:8080`

# structure

`views` is the directory where the `nunjucks` views go. `views/layout.njk` is
the template for the entire site.

`src` is where the rest of the source code goes. `src/public` is where assets
(CSS and images) live.

This project uses `typescript`, `jest`, and `sass`.

Types are defined in `src/types`. Examples and static data goes in `src/data`.
