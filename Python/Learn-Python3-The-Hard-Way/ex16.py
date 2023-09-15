#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 21/9/2022 PM 2:56 
# @File: exercise16.py
# @Software: PyCharm


from sys import argv

script, filename = argv  # runtime create file

print(f"We're going to erase {filename}.")
print("If you don't want that, hit CTRL-C (^C).")
print("If you do want that, hit RETURN.")

input("?")  # interactive tips

print("Opening the file...")
target = open(filename, 'w')

print("Truncating the file. Good bye!")
target.truncate()  # empties file

print("Now I'm going to ask you for three lines.")

line1 = input("line 1: ")
line2 = input("line 2: ")
line3 = input("line 3: ")

print("I'm going to write these to the file.")

target.write(line1)
target.write("\n")
target.write(line2)
target.write("\n")
target.write(line3)
target.write("\n")

print("And finally, we close it.")
target.close()
