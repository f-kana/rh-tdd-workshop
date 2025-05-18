def _parse_range(range_str: str) -> list[int]:
    """ハイフン区切りの文字列をページ番号のリストに変換する"""
    from_page, to_page = map(int, range_str.split("-"))
    return list(range(from_page, to_page + 1))


def parse_printing_page(input_page: str) -> list[int]:
    """
    引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。
    引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。
    引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。
    引数が-n形式の場合、1からnまでの数値を展開したリストを返す。

    Args:
        input_page (str): 入力文字列
    Raises:
        ValueError: 入力が None または空文字列の場合
    Returns:
        list[int]: ページ番号のリスト
    """
    if input_page is None or input_page == "":
        raise ValueError("入力値が未指定です")

    # 8.-n形式の場合、1からnまでの数値を展開
    if input_page.startswith("-") and input_page[1:].isdigit():
        return _finalize(list(range(1, int(input_page[1:]) + 1)))

    # 1.引数が単独の正の数(文字列型)のみの場合
    if input_page.isdigit():
        return _finalize([int(input_page)])

    pages: list[int] = []

    # 2.カンマ区切りの数字の場合
    if "," in input_page:
        for page in input_page.split(","):
            if "-" in page:
                # 3-1.ハイフン繋ぎの数字の場合
                pages.extend(_parse_range(page))
            else:
                pages.append(int(page))
        return _finalize(pages)

    # 3-2.ハイフンのみの場合
    if "-" in input_page:
        return _finalize(_parse_range(input_page))

    return []


def _finalize(pages: list[int]) -> list[int]:
    """
    重複を一意化し、ソートされたリストを返す。
    Args:
        pages (list[int]): 整数型のページ番号リスト
    Returns:
        list[int]: ソートされた整数型のページ番号リスト
    """
    return sorted(set(pages))
