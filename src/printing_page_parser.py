def parse_printing_page(input_page: str) -> list[int]:
    if not input_page:
        raise ValueError("引数が未指定です。")

    page_list = []
    for page in input_page.split(","):
        if "-" in page:
            start, end = map(int, page.split("-"))
            page_list.extend(range(start, end + 1))
        else:
            page_list.append(int(page))

    return sorted(list(set(page_list)))

import math

math.sqrt