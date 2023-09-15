#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/22 17:15 
# @File: ex44a.py
# @Software: PyCharm


class Parent(object):

    def implicit(self):
        print("PARENT implicit()")


class Child(Parent):
    pass


# dad = Parent()
# son = Child()
#
# dad.implicit()
# son.implicit()
Parent().implicit()
Child().implicit()