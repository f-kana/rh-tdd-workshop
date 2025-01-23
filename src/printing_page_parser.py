"""
ToDo:
"""


def parse_printing_page(input_pages: str) -> list[int]:
    output_page = []
    for item in input_pages.split(","):
        if "-" in item:
            [start, end] = map(int, item.split("-"))
            output_page.extend(list(range(start, end + 1)))
        else:
            output_page.append(int(item))
    return output_page
