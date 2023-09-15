#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 22/9/2022 AM 11:23 
# @File: exercise17.py
# @Software: PyCharm

import sys

import os
from os.path import exists

# unpacking from_file to_file


script, from_file, to_file = sys.argv
# print  from_name to_file
print(f"Copying from {from_file} to {to_file}")

# open & read in_file
in_file = open(from_file)
indata = in_file.read()

print(f"The input file is {len(indata)} bytes long.")  # print indata length
print(f"Does the output file exist? {os.path.exists(to_file)}.")  # Judge whether the file exists
print("Ready, hit RETURN to continue, CTRL-C to abort.")
input()  # input tips

# create & open & write to_file
out_file = open(to_file, 'w')
out_file.write(indata)

# print result
print("Alright, all done.")
# close out_file in_file
out_file.close()
in_file.close()
