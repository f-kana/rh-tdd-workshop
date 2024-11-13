from unittest import TestCase

from .printing_page_parser import parse_printing_page


class GeneralTest(TestCase):
    def test_parse_printing_page(self):
        with self.subTest(
            "1. 引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。"
        ):
            self.assertListEqual(parse_printing_page("1"), [1])
            self.assertListEqual(parse_printing_page("10"), [10])
        with self.subTest(
            "2. 引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。"
        ):
            # テスト観点
            # ・カンマの個数：1つ、2つ以上か -> 2 Pattern
            # ・順子or嵌張 -> 2 Pattern
            self.assertListEqual(parse_printing_page("2,10"), [2, 10])
            self.assertListEqual(parse_printing_page("1,2,3"), [1, 2, 3])
        with self.subTest(
            "3-1. 引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。"
        ):
            # テスト観点
            # ・順子or嵌張 -> 2 Pattern
            self.assertListEqual(parse_printing_page("1-2"), [1, 2])
            self.assertListEqual(parse_printing_page("1-3"), [1, 2, 3])

        with self.subTest("3-2. カンマとハイフンの混合"):
            self.assertListEqual(parse_printing_page("1-3,5-6"), [1, 2, 3, 5, 6])
            self.assertListEqual(parse_printing_page("3,5-6,10"), [3, 5, 6, 10])

        with self.subTest("4. ゼロ埋めを正常系として処理する。(001 -> 1)"):
            self.assertListEqual(parse_printing_page("001"), [1])
            self.assertListEqual(parse_printing_page("00204"), [204])

        with self.subTest("5&6. 重複は一意化する。数値リストは昇順でソートする。"):
            self.assertListEqual(parse_printing_page("1,1"), [1])
            self.assertListEqual(parse_printing_page("5,5,5,4,3,3"), [3, 4, 5])
        with self.subTest(
            "7. 引数が未指定（無し or 空文字" "）の場合、例外をスローする。"
        ):
            self.assertRaises(ValueError, parse_printing_page, "")

        with self.subTest(
            "8. 受入可能文字（数値またはハイフンまたはカンマまたは半角スペース「0123456789,- 」)以外の場合、例外をスローする。"
        ):
            self.assertRaises(ValueError, parse_printing_page, "a")
            self.assertRaises(ValueError, parse_printing_page, "1-2, a、１")
            self.assertRaises(ValueError, parse_printing_page, "壱")
            self.assertRaises(ValueError, parse_printing_page, "、")
            self.assertRaises(ValueError, parse_printing_page, "，")
            self.assertRaises(ValueError, parse_printing_page, "。")
            self.assertRaises(ValueError, parse_printing_page, "ー")
        with self.subTest(
            "9. ハイフン繋ぎでFrom > To の場合、例外をスローする。（From = Toは単独の数値と同じ扱いとする。）"
        ):
            self.assertListEqual(parse_printing_page("10-10"), [10])
            self.assertRaises(ValueError, parse_printing_page, "2-1")

        with self.subTest(
            "10. 受入可能文字だが不正な数値や文字の並び（0/   /1   2/,/,,,,,/-/---/1-2-3/-10/10-/等）は例外をスローする"
        ):
            self.assertRaises(ValueError, parse_printing_page, "0")
            self.assertRaises(ValueError, parse_printing_page, "   ")
            self.assertRaises(ValueError, parse_printing_page, "1   2")
            self.assertRaises(ValueError, parse_printing_page, ",")
            self.assertRaises(ValueError, parse_printing_page, ",,,,,")
            self.assertRaises(ValueError, parse_printing_page, "-")
            self.assertRaises(ValueError, parse_printing_page, "---")
            self.assertRaises(ValueError, parse_printing_page, "1-2-3")
            self.assertRaises(ValueError, parse_printing_page, "-10")
            self.assertRaises(ValueError, parse_printing_page, "10-")
        # with self.subTest(""):
        #     self.assertListEqual(parse_printing_page(), [])
        #     self.assertListEqual(parse_printing_page(), [])


# def my_three_times(n):
#     return 3 * n


# class DemoTest(TestCase):
#     def test_my_three_times(self):
#         with self.subTest("入力の数値が3倍になる。"):
#             self.assertEqual(my_three_times(1), 3)
