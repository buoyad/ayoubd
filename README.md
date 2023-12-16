## Personal website

[![deployment status badge](https://github.com/buoyad/ayoubd/actions/workflows/deploy-site.yml/badge.svg)](https://github.com/buoyad/ayoubd/actions/workflows/deploy-site.yml)

I decided to rebuild my website after my trusty old Jekyll setup was getting a
little stale. After building [Tally](https://github.com/buoyad/tally) with
Next.js, I wanted to integrate some fun more dynamic stuff into my site.

This repo is structured as a monorepo:

- `site` - the next.js frontend
- `backend` - TBD / go service? rust(!) service? probably some DB stuff. maybe
  some terraform. we'll see.

### Commands

Under `/site`:

| command   | description      |
| --------- | ---------------- |
| `bun dev` | local dev server |

### Deploying

I currently host this on [Fly](fly.io). You can read about why [here](#TBD),
TL;DR I like hot air balloons.

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
# paste into FLY_API_TOKEN repository secret
```

### Out of date readme below

Instructions from when I was experimenting with deployment solutions mostly for
my benefit.

1. Install terraform:

[reference](https://developer.hashicorp.com/terraform/install)  
for macOS:
```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

optional: install direnv, populate .envrc with aws creds, and run `direnv allow .`

1. Install aws cli: [instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Create an aws IAM group for this project: `ayoubd.com`
3. Create an IAM user for the deployment side: `ayoubd.com.deploy`
4. Create an access key for the deployment role
5. Populate .envrc with the aws credentials
6. in `terraform/remote-state` run `make deploy` to create backend resources for main terraform project
7. commit and persist tfstate for this bootstrap project to the repo. should
   only need to provision this once ever, and CI/CD should never alter any
   resources provisioned by `remote-state`. also commit `backend.conf`
8. in `terraform` run `make init` to initialize s3 backend
9. in AWS Amplify console, go to "get started" and authenticate repo account with OAuth for access. This is to avoid having to create and store a personal access token
