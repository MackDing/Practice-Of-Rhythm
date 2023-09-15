#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/11/2 13:18 
# @File: ex32.py
# @Software: PyCharm


hairs = ['brown', 'blond', 'red']
eyes = ['brown', 'blue', 'green']
weights = [1, 2, 3, 4]

the_count = [1, 2, 3, 4, 5]
fruits = ['apples', 'oranges', 'pears', 'apricots']
change = [1, 'pennies', 2, 'dimes', 3, 'quarters']

# this first kind of for-loop goes through alist

for number in the_count:
    print(f"This is count {number}")

# same as above
for fruit in fruits:
    print(f"A fruit of type: {fruit}")

# also we can go through mixed lists too
# notice we vahe to use {} since we don't know what's in it

for i in change:
    print(f"I got {i}")

# we can also build lists,first start with an empty one
elements = []

# then use the range function to do 0 to 5 counts
for i in range(0, 6):
    print(f"Adding {i} to the list")
    elements.append(i)

# then use the range function to do 0 to 5 counts
for i in elements:
    print(f"Element was： {i}")

sticks = []

for a in range(0, 10):
    print(f"range like {a}")
    a += 2
    sticks.append(a)
    for b in sticks:
        print(f"this is {b}")

print(sticks)
