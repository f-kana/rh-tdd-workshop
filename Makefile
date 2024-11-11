COVERAGE_THRESHOLD = 95

# Python
python-test:
	poetry run python -m unittest

python-test-with-coverage:
	rm .coverage
	poetry run coverage run -m unittest
	poetry run coverage report --fail-under=$(COVERAGE_THRESHOLD)
    # poetry run coverage html

python-static-analyze:
	@make flake8
	@make pylint
	@make mypy
	@make bandit
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

black-check:
	poetry run black --check src

isrot-check:
	poetry run isort --check src

safety:
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

