COVERAGE_THRESHOLD = 95

test:
	@make python-test

# Python
python-test:
	poetry run python -m unittest

python-test-with-coverage:
	rm -rf .coverage
	poetry run coverage run -m unittest
	poetry run coverage report --fail-under=$(COVERAGE_THRESHOLD)
    # poetry run coverage html

python-static-analyze:
	@make flake8
	@make pylint
	@make mypy
	@make bandit
	@make ruff-extend
	@make black-check
	@make isrot-check
	# @make safety # comment out because even the latest mod includes a volnerability

flake8:
	poetry run flake8

pylint:
	poetry run pylint src

mypy:
	poetry run mypy src

bandit:
	poetry run bandit -r src

ruff:
	poetry run ruff check src

ruff-extend:
	# Run ruff with default + extend-select options
	poetry run ruff check --extend-select A,B,C,I,N,Q,S,T src

black-check:
	poetry run black --check src

isrot-check:
	poetry run isort --check src

safety:
	# check command is deprected, scan is recommended. But scan needs a complex config thus using check here.
	poetry run safety check

# Node.JS: HTML, Markdown
nodejs-static-analyze:
	@make htmlhint
	@make markdownlint
	@make npm-audit


## HTML
htmlhint:
	npx htmlhint src/*.html

# Markdown
markdownlint:
	npx markdownlint *.md docs/*.md

# NPM
npm-audit:
	npm audit

