# -*- coding:utf-8 -*-
# @Time : 21/3/23 11:46 PM
# @Author: Mack.Ding
# @File : p002_number_factorial.py


def factorial(number):
    result = 1
    while number > 0:
        result *= number  # c *= a 等效于 c = c * a
        number -= 1  # c -= a 等效于 c = c - a
    return result


print("factorial is", factorial(3))
print("factorial is", factorial(6))
print("factorial is", factorial(100))
