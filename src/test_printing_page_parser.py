from unittest import TestCase

from .printing_page_parser import parse_printing_page


class GeneralTest(TestCase):
    def test_parse_printing_page(self):
        with self.subTest(
            "1. 引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。ただし入力が５桁→エラー"
        ):
            self.assertListEqual(parse_printing_page("1"), [1])
            self.assertListEqual(parse_printing_page("3"), [3])
            self.assertListEqual(parse_printing_page("9999"), [9999])
            # self.assertRaises(parse_printing_page("10000"), Exception)

        with self.subTest("2. 引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。"):
            # カンマの数が1、2以上
            # 順子、嵌張
            # self.assertListEqual(parse_printing_page("1,2"), [1, 2])
            self.assertListEqual(parse_printing_page("1,3"), [1, 3])
            self.assertListEqual(parse_printing_page("1,2,3"), [1, 2, 3])
            # self.assertListEqual(parse_printing_page("1,3,5"), [1, 3, 5])

        with self.subTest("3. 引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。"):
            self.assertListEqual(parse_printing_page("1-2"), [1, 2])
            self.assertListEqual(parse_printing_page("1-5"), [1, 2, 3, 4, 5])


# def my_three_times(n):
#     return 3 * n


# class DemoTest(TestCase):
#     def test_my_three_times(self):
#         with self.subTest("入力の数値が3倍になる。"):
#             self.assertEqual(my_three_times(1), 3)
