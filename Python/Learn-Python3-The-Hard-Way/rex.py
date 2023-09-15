#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 28/9/2022 PM 6:19 
# @File: rex.py
# @Software: PyCharm


import re

with open(r"D:\Extreme Vision\Mack\Code\Preface\words.txt", "r") as from_file:
    indata = from_file.read()
print(type(indata))

# shape = r"\w'+"
# pattern = r"[a-zA-Z]+"
# re_indata = re.compile(pattern, indata)
re_indata = indata.strip('1')

print(re_indata)
# print(type(re_indata))
out_file = str(re_indata)

with open(r"D:\Extreme Vision\Mack\Code\Preface\res_words.txt", 'w') as f:
    f.write(out_file)

print("Alright, all done.")
