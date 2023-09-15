#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 13/10/2022 PM 3:10 
# @File: exercise26.py
# @Software: PyCharm

from sys import argv

print("How old are you?", end=' ')
age = input()
print("How tall are you?", end=' ')
height = input()
print("How much do you weigh?", end=' ')
weight = input()

print(f"So, you're {age} old, {height} tall and {weight} heavy.")

script, filename = argv

txt = open(filename)

print("Here's your file {filename}:")
print(txt.read())

print("Type the filename again:")
file_again = input("> ")

txt_again = open(file_again)

print(txt_again.read())

print("Let's practice everything.")
print(r'You\'d need to know \'bout escapes with \\ that do \n newlines and \t tabs.')

poem = """
\tThe lovely world
with logic so firmly planted
cannot discern \n the needs of love
nor comprehend passion from intuition
and requires an explanation
\n\t\twhere there is none.
"""

print("--------------")
print(poem)
print("--------------")

five = 10 - 2 + 3 - 1
print(f"This should be five: {five}")


def secret_formula(started):
    jelly_beans = started * 500
    jars = jelly_beans / 1000
    crates = jars + 100
    return jelly_beans, jars, crates


start_point = 10000
beans, jars, crates = secret_formula(start_point)

# remember that this is another way to format a string
print("With a starting point of: {}".format(start_point))
# it's just like with an f"" string
print(f"We'd have {beans} beans, {jars} jars, and {crates} crates.")

start_point = start_point / 10

print("We can also do that this way:")
formula = secret_formula(start_point)
# this is an easy way to apply a list to a format string
print("We'd have {} beans, {} jars, and {} crates.".format(*formula))

people = 20
cats = 30
dogs = 15

if people < cats:
    print("Too many cats! The world is doomed!")

if people < cats:
    print("Not many cats! The world is saved!")

if people < dogs:
    print("The world is drooled on!")

if people > dogs:
    print("The world is dry!")

dogs += 5

if people >= dogs:
    print("People are greater than or equal to dogs.")

if people <= dogs:
    print("People are less than or equal to dogs.")

    if people == dogs:
        print("People are dogs.")
'''
布尔逻辑表达式(boolean logic expression)

NOT	True?
not False	True
not True	False
OR	True?
True or False	True
True or True	True
False or True	True
False or False	False
AND	True?
True and False	False
True and True	True
False and True	False
False and False	False
NOT OR	True?
not (True or False)	False
not (True or True)	False
not (False or True)	False
not (False or False)	True
NOT AND	True?
not (True and False)	True
not (True and True)	False
not (False and True)	True
not (False and False)	True
!=	True?
1 != 0	True
1 != 1	False
0 != 1	True
0 != 0	False
==	True?
1 == 0	False
1 == 1	True
0 == 1	False
0 == 0	True
'''
