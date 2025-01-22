from unittest import TestCase

from .printing_page_parser import parse_printing_page


class GeneralTest(TestCase):
    def test_parse_printing_page(self):
        with self.subTest("xxx"):
            self.assertListEqual(parse_printing_page(), None)
        # with self.subTest("xxx"):
        #     self.assertListEqual(parse_printing_page(None), None)


def my_three_times(n):
    return 3 * n


class DemoTest(TestCase):
    def test_my_three_times(self):
        with self.subTest("入力の数値が3倍になる。"):
            self.assertEqual(my_three_times(1), 3)
