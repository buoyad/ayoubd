## Personal website

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