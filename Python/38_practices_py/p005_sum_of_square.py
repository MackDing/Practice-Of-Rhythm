# -*- coding:utf-8 -*-
# @Time : 24/3/23 12:23 AM
# @Author: Mack.Ding
# @File : p005_sum_of_square.py


def sum_of_square(n):
    result = 0
    for number in range(1, n + 1):
        result += number * number
    return result


print("sum of square : 3", sum_of_square(3))
print("sum of square : 5", sum_of_square(5))
print("sum of square : 10", sum_of_square(10))
