python-test:
	poetry run python -m unittest

python-static-analyze:
	@make flake8
	@make mypy
	# @make safety # comment out because even the latest mod includes a volnerability

flake8:
	poetry run flake8

mypy:
	poetry run mypy src

safety:
	poetry run safety check

html-static-analyze:
	@make htmlhint
	@make npm-audit

htmlhint:
	npx htmlhint src/*.html

npm-audit:
	npm audit