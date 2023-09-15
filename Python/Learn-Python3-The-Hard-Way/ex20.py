#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 22/9/2022 PM 2:58 
# @File: exercise20.py
# @Software: PyCharm


from sys import argv

script, input_file = argv


# read whole file
def print_all(f):
    print(f.read())


# control row
def rewind(f):
    f.seek(0)
    # return f


# control line
def print_a_line(line_count, f):
    print(line_count, f.readline(), end=" ")


current_file = open(input_file)

print("First let's print the whole file:\n")

print_all(current_file)

print("Now let's rewind, kind of like a tape.")

rewind(current_file)
print(rewind(current_file))

print("Let's print three lines:")

# x = x + y equal x += y

current_line = 1

print_a_line(current_line, current_file)

current_line = current_line + 1
print_a_line(current_line, current_file)

current_line += 1
print_a_line(current_line, current_file)

print(script)
print(type(script))

print(argv)
