#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2023/2/14 16:10 
# @File: ex44b.py
# @Software: PyCharm


class Parent(object):

    def override(self):
        print("PARENT override()")


class Child(Parent):

    def override(self):
        print("CHILD override()")


Parent().override()
Child().override()
