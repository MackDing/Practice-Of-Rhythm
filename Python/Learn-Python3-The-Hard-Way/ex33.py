#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/11/2 13:18 
# @File: ex33.py
# @Software: PyCharm


import decimal


def print_num():
    # i = int(input("input:"))
    i = input("input:")
    i = decimal.Decimal(i)
    # i = 0
    numbers = []
    while i < 6:
        print(f"At the top i is {i}")
        numbers.append(i)

        i += 1
        print("Numbers now: ", numbers)
        print(f"At the bottom i is {i}")
    print("The numbers: ")
    for num in numbers:
        print(num)


if __name__ == '__main__':
    print_num()
