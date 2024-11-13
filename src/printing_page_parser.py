import re


def parse_printing_page(input_page: str) -> list[int]:
    _check_invalid_characters(input_page)
    if not input_page:
        raise ValueError("引数が未指定です。")

    pages = set()
    for part in input_page.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-")
            start, end = int(start), int(end)
            if start > end:
                raise ValueError("ハイフン繋ぎでFrom > To の場合、例外をスローします。")
            pages.update(range(start, end + 1))
        else:
            pages.add(int(part))

    retval = sorted(pages)
    if 0 in retval:
        raise ValueError("0は受け入れられません。")
    return retval


def _check_invalid_characters(input_page: str):
    """
    raise ValueError if input_page contains invalid characters.
    """
    if re.search(r"[^0-9,\- ]", input_page):
        raise ValueError(
            "受入可能文字（数値またはハイフンまたはカンマまたは半角スペース「0123456789,- 」）以外が含まれています。"
        )
    if re.match(r"^[, -]+$", input_page):
        raise ValueError("不正な数値や文字の並びです。")
