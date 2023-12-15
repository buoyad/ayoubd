.PHONY: init plan deploy destroy
.DEFAULT: plan

init:
	terraform init

plan: init
	terraform plan

_deploy: init
	terraform apply -auto-approve

destroy: init
	terraform destroy -auto-approve

../backend.conf: init deploy
	terraform output | sed -ne 's/\(.*\) = \(.*\)/\1=\2/p' > ../backend.conf

deploy: _deploy ../backend.conf