provider "aws" {
  region = "us-east-1"
}

variable "s3_bucket" {
  default = "ayoubd.com.tfstate"
}

variable "s3_key" {
  default = "terraform.tfstate"
}

variable "dynamodb_table" {
  default = "app-state"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = var.s3_bucket

  tags = {
    terraform_managed = "true"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "terraform_state_lock" {
  name           = var.dynamodb_table
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    terraform_managed = "true"
  }

  lifecycle {
    prevent_destroy = true
  }
}

output "bucket" {
  value = var.s3_bucket
}

output "key" {
  value = var.s3_key
}

output "dynamodb_table" {
  value = var.dynamodb_table
}
