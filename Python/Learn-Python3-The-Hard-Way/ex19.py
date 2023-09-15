#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 22/9/2022 PM 2:58 
# @File: exercise20.py
# @Software: PyCharm


def cheese_and_crackers(cheese_count, boxes_of_crackers):
    print(f"You have {cheese_count} cheeses!")
    print(f"You have {boxes_of_crackers} boxes of crackers!")
    print("Man that's enough for a party!")
    print("Get a blanket.\n")


print("We can just give the function numbers directly:")
cheese_and_crackers(20, 30)

print("OR, we can use variables from our script:")
amount_of_cheese = 10
amount_of_crackers = 50

cheese_and_crackers(amount_of_cheese, amount_of_crackers)

print("We can even do math inside too:")
cheese_and_crackers(10 + 20, 5 + 6)

print("And we cam combine the two, variable and math:")
cheese_and_crackers(amount_of_cheese + 100, amount_of_crackers + 1000)


def circumstance():
    a = 5 + 1
    return a


print("OR, we can use define from our script:")
cheese_and_crackers(circumstance(), circumstance() + 6)  # function add number


class confidence:
    def multis(self):
        a = 6 + 1
        return a


print("OR, we can use class from our script:")
cheese_and_crackers(confidence.multis(), confidence.multis() + 6)  # function add number
