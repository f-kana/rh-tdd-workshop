from unittest import TestCase

from .printing_page_parser import _finalize, parse_printing_page


class HogeTest(TestCase):
    def test_parse_printing_page(self):
        with self.subTest("1.引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。"):
            self.assertEqual(parse_printing_page("1"), [1])
            self.assertEqual(parse_printing_page("10"), [10])

        with self.subTest("2.引数がカンマ区切りの数字の場合、カンマで区切られた各要素の数値を展開したリストを返す。"):
            # テストケースの観点
            # 順子・嵌張
            # カンマが１こ　or ２こ以上
            self.assertEqual(parse_printing_page("9,10"), [9, 10])
            self.assertEqual(parse_printing_page("1,3,4"), [1, 3, 4])

        with self.subTest("3-1.引数がハイフン繋ぎの数字の場合、FromからToまでの数値を展開したリストを返す。"):
            # From と Toが
            # 飛び値
            # 連番（順子）
            # 同一
            self.assertEqual(parse_printing_page("1-5"), [1, 2, 3, 4, 5])
            self.assertEqual(parse_printing_page("4-5"), [4, 5])
            self.assertEqual(parse_printing_page("10-10"), [10])

        with self.subTest("3-2.ハイフンとカンマの混在"):
            # どっちが先　カンマ　ハイフン
            self.assertEqual(parse_printing_page("1,3-5,8"), [1, 3, 4, 5, 8])
            self.assertEqual(parse_printing_page("2-4,9,11,14-16,20-21"), [2, 3, 4, 9, 11, 14, 15, 16, 20, 21])

        with self.subTest("4.ゼロ埋めを正常系として処理する。(001 -> 1)"):
            # 0 padding で0が１つ or それ以上(2)
            # paddingではないところに0が出現するか否か
            self.assertEqual(parse_printing_page("01"), [1])
            self.assertEqual(parse_printing_page("002"), [2])
            self.assertEqual(parse_printing_page("020"), [20])

        with self.subTest("5.重複は一意化する。"):
            # 重複が１つ or ２つ以上
            # 重複が２種類(以上)
            # 最後に結合
            self.assertEqual(_finalize([1, 1]), [1])
            self.assertEqual(_finalize([1, 1, 1]), [1])
            self.assertEqual(_finalize([1, 1, 2, 2]), [1, 2])
            self.assertEqual(_finalize([1, 2, 2, 1]), [1, 2])

            self.assertEqual(parse_printing_page("1,1,1"), [1])

        with self.subTest("6. 数値リストは昇順（1, 2, 3, …, 100）でソートする。"):
            self.assertEqual(_finalize([2, 1]), [1, 2])
            self.assertEqual(_finalize([1, 2, 5, 4]), [1, 2, 4, 5])

            self.assertEqual(parse_printing_page("1,2,5,4"), [1, 2, 4, 5])

        with self.subTest("7. 引数が未指定（無し or 空文字" "）の場合、例外をスローする。"):
            with self.assertRaises(ValueError):
                parse_printing_page("")

            with self.assertRaises(ValueError):
                parse_printing_page(None)

        with self.subTest("8. -nに対応"):
            self.assertEqual(parse_printing_page("-3"), [1, 2, 3])


# class DemoTest(TestCase):

#     def test_my_three_times(self):
#         """入力の数値が3倍になる。"""
#         self.assertEqual(my_three_times(1), 3)
#         self.assertEqual(my_three_times(1), 3)
