# -*- coding:UTF-8 -*-
# #!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 11/10/2022 PM 3:44
# @File: exercise23.py
# @Software: PyCharm

print("Let's practice everything.")
print('You\'d need to know \'bout escapes with \\ that do:')
print('\n newlines and \t tabs.')
# \n 缩进 indent, retract, retraction
# \t 换行 line feed

poem = """
\tThe lovely world
with logic so firmly panted
cannot discern \n the needs of love
nor comprehend passion from intuition
and requires an explanation
\n\t\twhere there is none. 
"""

print("--------------")
print(poem)
print("--------------")

five = 10 - 2 + 3 - 6
print(f"This should be five: {five}")


def secret_formula(started):
    jelly_beans = started * 500
    jars = jelly_beans / 1000
    crates = jars / 100
    return jelly_beans, jars, crates


start_point = 10000
# Define multiple variables
beans, jars, crates = secret_formula(start_point)

print("With a starting point of :{}".format(start_point))

print(f"We'd have {beans} beans, {jars} jars, and {crates} crates.")

start_point = start_point / 10

print("We can also do that this way.")
formula = secret_formula(start_point)
print(formula)

print("We'd have {} beans, {}jars, and {}crates.".format(
    *formula))  # If the variable is more than one parameter, a * sign is required

formula1 = 1, 2, 3
print("We'd have {} beans, {}jars, and {}crates.".format(
    *formula1))
