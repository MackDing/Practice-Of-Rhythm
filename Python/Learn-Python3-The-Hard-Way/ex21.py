#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 10/10/2022 PM 3:24 
# @File: exercise21.py
# @Software: PyCharm


# # adding a + b
def add(a, b):
    print(f"adding {a} + {b}")
    return a + b


# subtracting a - b
def subtract(a, b):
    print(f"subtract {a} - {b}")
    return a - b


# multiply a * b
def multiply(a, b):
    print(f"multiplying {a} * {b}")
    return a * b


# dividing a / b
def divide(a, b):
    print(f"dividing {a} / {b}")
    return a / b


#
#
# 24 + 34 / 100 - 1023
def mix(e, f, c, d):
    return e + f / c - d


print(mix(24, 34, 100, 1023))

# print notice
print("Let's do some math with just functions!")

# name variables and set them to number and transfer function {age} {height} {weight} {iq}
# age = add(30, 5)
# height = subtract(78, 4)
# weight = multiply(90, 2)
# iq = divide(100, 2)

print("How old are you?", end=' ')  # 末尾不换行
age = input()
print("How tall are you?", end=' ')
height = input()
print("How much do you weigh?", end=' ')
weight = input()
print("How much do you iq?", end=' ')
iq = input()

# print strings  {age} {height} {weight} {iq}
print(f"Age:{age}, Height:{height}, Weight:{weight}, iq:{iq}")

print(type(iq))
# A puzzle for the extra credit. type it in any way.
print("Here is a puzzle.")

what = add(int(age), subtract(float(height), multiply(int(weight), divide(int(iq), 2))))

print("That becomes: ", what, "Can you do it by hand?")
