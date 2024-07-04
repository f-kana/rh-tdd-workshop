"""
1.引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。
2.引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。
3.引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。
4.ゼロ埋めを正常系として処理する。(001 -> 1)
5.重複は一意化する。
6.数値リストは昇順（1, 2, 3, …, 100）でソートする。
7.引数が未指定（無し or 空文字""）の場合、例外をスローする。
8.受入可能文字（数値またはハイフンまたはカンマまたは半角スペース「0123456789,- 」)以外の場合、例外をスローする。
9.ハイフン繋ぎでFrom > To の場合、例外をスローする。（From = Toは単独の数値と同じ扱いとする。）
10.受入可能文字だが不正な並び（0/   /1   2/,/,,,,,/-/–--/1-2-3/-10/10-/等）は例外をスローする
"""
from typing import List
import re


def parse_printing_page(pages: str) -> List[int]:
    if pages == "":
        raise ValueError("The argument is empty.")
    validate_invalid_char(pages)

    pages = remove_spaces(pages)

    ret: List[int] = []
    for csp in [comma_separated_pages for comma_separated_pages in pages.split(",")]:
        if "-" in csp:
            from_page, to_page = map(int, csp.split("-"))  # Split後要素数が2以外だとココでエラーが出る
            if from_page == 0 or to_page == 0:
                raise ValueError("Invalid format.")
            if from_page > to_page:
                raise ValueError("Invalid format.")
            ret.extend([i for i in range(from_page, to_page + 1)])
        else:
            ret.append(int(csp))

    ret = sorted(list(set(ret)))
    return ret


def validate_invalid_char(pages: str) -> None:
    """ 0~9 カンマ ハイフン 半角スペースのみを許可する """
    regex = r"[^0-9,\- ]"
    if re.search(regex, pages):
        raise ValueError("Invalid character is included.")


def remove_spaces(pages: str) -> str:
    """
    引数の文字列pagesからスペースを除去する。
    但し、数値を空白で区切った書式は例外をスローする（例："1 2"を"12"とは解釈せずエラーを出す）
    """
    if " " in pages:
        if re.search(r"(\d) +(\d)", pages):
            raise ValueError("Invalid format.")
    return pages.replace(" ", "")
