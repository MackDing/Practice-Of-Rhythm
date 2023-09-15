#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/7 19:14 
# @File: ex38.py
# @Software: PyCharm


def foo():
    print("starting...")
    while True:
        res = yield 4
        print("res:", res)


g = foo()
print(next(g))
print("*" * 20)
print(next(g))


ten_things = "Apples Oranges Crows Telephone Light Sugar"

print("Wait there are not 10 thing in that list. Let's fix that.")

stuff = ten_things.split(" ")
print(f"stuff is {stuff}")
more_stuff = ["Day", "Night", "Song", "Frisbee", "Corn", "Banana", "Girl", "Boy"]
print(len(stuff))

while len(stuff) != 10:
    next_one = more_stuff.pop()
    print("Adding ", next_one)
    stuff.append(next_one)
    print(f"There are {len(stuff)} items now.")

print("There we go: ", stuff)

print("Let's do some things with stuff.")

print(stuff[1])
print(stuff[-1])  # whoa! fancy
print(stuff.pop())
print(' '.join(stuff))  # what? cool !
print(type(' '.join(stuff)))
print('#'.join(stuff[3:6]))  # super stellar!
