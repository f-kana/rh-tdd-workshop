"""
ToDo:
"""


def parse_printing_page(input_page: str) -> list[int]:
    if input_page.isdigit():
        if len(input_page) == 5:
            raise ValueError("5桁の数値は入力できません。")
        return [int(input_page)]

    if "-" in input_page:
        from_page, to_page = map(int, input_page.split("-"))
        return list(range(from_page, to_page + 1))

    if "," in input_page:
        return list(map(int, input_page.split(",")))

    raise ValueError("入力が不正です。")
