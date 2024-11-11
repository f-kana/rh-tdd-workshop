python-test:
	poetry run python -m unittest

python-lint:
	poetry run flake8

html-lint:
	npx htmlhint src/*.html