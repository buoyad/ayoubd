## Personal website

[![deployment status badge](https://github.com/buoyad/ayoubd/actions/workflows/deploy-site.yml/badge.svg)](https://github.com/buoyad/ayoubd/actions/workflows/deploy-site.yml)
[![Deploy api](https://github.com/buoyad/ayoubd/actions/workflows/deploy-api.yml/badge.svg)](https://github.com/buoyad/ayoubd/actions/workflows/deploy-api.yml)

I decided to rebuild my website after my trusty old Jekyll setup was getting a
little stale. After building [Tally](https://github.com/buoyad/tally) with
Next.js, I wanted to integrate some fun more dynamic stuff into my site.

This repo is structured as a monorepo:

- `site` - the next.js frontend
- `api` - node.js / websocket backend, currently majority concerned with
  handling chat connections

### Commands

| command    | description                             |
| ---------- | --------------------------------------- |
| `make dev` | start local api server and next.js site |

### Deploying

I currently host this on [Fly](fly.io).

Deployment cluster is configured by `/site/fly.toml` + a bit of manual work on
the fly console to set up certificate and domain hookup to `new.ayoubd.com`.
(update: learned I could have used `flyctl certs create <hostname>`). CD runs on
every commit to master via github action configured in
`/.github/workflows/fly.yml`.

```sh
brew install flyctl
fly auth login
cd site && fly launch

# CD
fly tokens create deploy -x 999999h | pbcopy
# paste into FLY_DEPLOY_SITE_TOKEN repository secret
# do the same under api and paste into FLY_DEPLOY_API_TOKEN
```
