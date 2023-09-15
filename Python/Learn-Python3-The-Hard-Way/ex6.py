#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/9/2 9:36 
# @File: exercise3.py
# @Software: Preface

type_of_people = 10
x = f"There are {type_of_people} types of people."

binary = "binary"
do_not = "don't"
y = f"Those who know {binary} and those who {do_not}."

print(x)
print(y)

print(f"I said: {x}")
print(f"I also said: '{y}'")

hilarious = False
joke_evaluation1 = "Isn't that joke so funny?! {} {}"
joke_evaluation = "Isn't that joke so funny?! {}"
print(joke_evaluation)
print(joke_evaluation.format(hilarious))
print(joke_evaluation.format("splendid"))
w = "This is the left side of..."
e = "a string with a right side."
print(joke_evaluation1.format("1", '2'))
print(w + e)
