#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 21/9/2022 PM 2:52 
# @File: exercise15.py
# @Software: PyCharm

# import package
from sys import argv

script, filename = argv  # make argv

txt = open(filename)  # open file

print(f"Here's your file {filename}:")  # show filename

print(txt.read())  # read contents & print txt

print("Type the filename again:")  # print title
file_again = input("> ")   # print"> " and input filename

# txt_again = open(file_again)  # open file again
txt = open(file_again)  # open file again
print(txt.read())  # read contents & print txt again
