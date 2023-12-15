init:
	terraform init -backend-config=backend.conf

plan: init
	terraform plan -out=plan.tfplan

plan-destroy: init
	terraform plan -destroy -out=plan.tfplan

_apply: init
	terraform apply plan.tfplan

apply: init plan _apply

apply-destroy: init plan-destroy _apply

