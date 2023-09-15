#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 22/9/2022 AM 11:50 
# @File: exercise18.py
# @Software: PyCharm


# Names, Variables, Code, Functions

# this one is like your scripts with argv
def print_two(*args):
    arg1, arg2 = args
    print(f"arg1: {arg1}, arg2: {arg2}")


# ok, that * args is actually pointless, we can just do this
def print_two_again(arg1, arg2):
    print(f"arg1: {arg1}, arg2: {arg2}")


# this just takes one argument
def print_one(arg1):
    print(f"arg1: {arg1}")


# this one takes no arguments
def print_none():
    print("I got nothing'.")


print_two("ran", "ding")
print_two_again("ran", "ding")
print_one("First!")
print_none()


def print_two1(*args):  # multiple variables
    arg11, arg12, arg13, arg14, arg15 = args
    print(f"arg1: {arg11}, arg2: {arg12},{arg13},{arg14}{arg15}")


print_two1(1, 2, 3, 4, 5,)
