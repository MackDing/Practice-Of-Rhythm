#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/9/2 9:36 
# @File: exercise3.py
# @Software: Preface

my_name = 'Zed A. Shaw'
my_age = 35  # not a lie
my_height = 74  # inches
my_weight = 180  # lba
my_eyes = 'Blue'
my_teeth = 'White'
my_hair = 'Brown'

print(f"Let's talk about {my_name}.")
print(f"He's {my_height} inches tall.")
print(f"He's {my_weight} pounds heavy.")
print("Actually that's not too heavy.")
print(f"He's got {my_eyes} eyes an {my_hair} hair.")
print(f"His teeth are usually {my_teeth} depending on the coffee.")

# This line is tricky, try to get it exactly right
total = my_age + my_height + my_weight
print(f"If I add {my_age}, {my_height}, and {my_weight} I get {total}.")


