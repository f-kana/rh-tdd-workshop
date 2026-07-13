from unittest import TestCase

from .printing_page_parser import parse_printing_page


class HogeTest(TestCase):
    def test_parse_printing_page(self):
        with self.subTest("1.引数が単独の正の数(文字列型)のみの場合、その数値(Number型)を格納したリストを返す。"):
            self.assertEqual(parse_printing_page("1"), [1])

        with self.subTest("2.???"):
            self.assertEqual(parse_printing_page(True), True)


def my_three_times(n):
    return n * 3


# class DemoTest(TestCase):

#     def test_my_three_times(self):
#         """入力の数値が3倍になる。"""
#         self.assertEqual(my_three_times(1), 3)
#         self.assertEqual(my_three_times(1), 3)
