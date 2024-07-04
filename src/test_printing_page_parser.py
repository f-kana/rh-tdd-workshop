from unittest import TestCase
from .printing_page_parser import parse_printing_page, validate_invalid_char, remove_spaces


class PrintingPageParserTests(TestCase):
    def test_parse_printing_page(self):
        with self.subTest("1.引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。"):
            self.assertListEqual(parse_printing_page("1"), [1])
            self.assertListEqual(parse_printing_page("10"), [10])

        with self.subTest("2.引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。"):
            # FromとToが連番 or 離れているのか
            self.assertListEqual(parse_printing_page("1-2"), [1, 2])
            self.assertListEqual(parse_printing_page("9-11"), [9, 10, 11])

        with self.subTest("3-1.引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。"):
            # カンマが単体か複数か
            # 順子、嵌張
            self.assertListEqual(parse_printing_page("1,10,20"), [1, 10, 20])
            self.assertListEqual(parse_printing_page("2,3"), [2, 3])

        with self.subTest("3-2.カンマとハイフンの混合"):
            # テスト観点
            # * ハイフン含みが先にくるか後にくるか
            self.assertListEqual(parse_printing_page("1-2,3"), [1, 2, 3])
            self.assertListEqual(parse_printing_page("1,2-3,5-7"), [1, 2, 3, 5, 6, 7])

        with self.subTest("4.ゼロ埋めを正常系として処理する。(001 -> 1)"):
            self.assertListEqual(parse_printing_page("001, 001000"), [1, 1000])

        with self.subTest("5.重複は一意化する。"):
            self.assertListEqual(parse_printing_page("1, 1, 1, 4"), [1, 4])
        with self.subTest("6.数値リストは昇順（1, 2, 3, …, 100）でソートする。"):
            self.assertListEqual(parse_printing_page("10, 8, 5, 1"), [1, 5, 8, 10])

        with self.subTest('9. 数値に1未満の値や非整数が含まれる場合、例外をスローする。'):
            with self.assertRaises(ValueError):
                self.assertListEqual(parse_printing_page("0"), None)
                self.assertListEqual(parse_printing_page("0.1"), None)
                self.assertListEqual(parse_printing_page("1.1"), None)
                self.assertListEqual(parse_printing_page("0.1-0.9"), None)
                self.assertListEqual(parse_printing_page("0.1-2.1"), None)
                self.assertListEqual(parse_printing_page("0.1,2.1"), None)

        # with self.subTest("xxx"):
        #     self.assertListEqual(parse_printing_page(None), None)
        # with self.subTest("xxx"):
        #     self.assertListEqual(parse_printing_page(None), None)
        # with self.subTest("xxx"):
        #     self.assertListEqual(parse_printing_page(None), None)

    def test_validate_invalid_char(self):
        with self.subTest("8.受入可能文字（数値またはハイフンまたはカンマまたは半角スペース「0123456789,- 」)以外の場合、例外をスローする。"):
            with self.assertRaises(ValueError):
                validate_invalid_char("a")
            with self.assertRaises(ValueError):
                validate_invalid_char("*")
            with self.assertRaises(ValueError):
                validate_invalid_char("あ")
            with self.assertRaises(ValueError):
                validate_invalid_char("１")  # 全角数字
            with self.assertRaises(ValueError):
                validate_invalid_char("二")  # 漢数字
            with self.assertRaises(ValueError):
                validate_invalid_char("参")  # 漢数字
            with self.assertRaises(ValueError):
                validate_invalid_char("ー")  # 全角ハイフン

    def test_remove_spaces(self):
        with self.subTest("10.受入可能文字だが不正な並び（0/   /1   2/,/,,,,,/-/–--/1-2-3/-10/10-/等）は例外をスローする：うち、半角スペースの処理"):
            with self.assertRaises(ValueError):
                remove_spaces("1 2")
            with self.assertRaises(ValueError):
                remove_spaces("100    103")
            # 続きはJSパート参照


# def my_three_times(n):
#     return 3 * n


# class DemoTest(TestCase):
#     def test_my_three_times(self):
#         with self.subTest("入力の数値が3倍になる。"):
#             self.assertEqual(my_three_times(1), 3)
