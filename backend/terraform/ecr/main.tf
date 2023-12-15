// create ecr registry

variable "name" {
  type = string
}

resource "aws_ecr_repository" "ecr" {
  name                 = var.name
  image_tag_mutability = "IMMUTABLE"

  tags = {
    terraform_managed = "true"
  }
}

output "ecr_url" {
  value = aws_ecr_repository.ecr.repository_url
}
