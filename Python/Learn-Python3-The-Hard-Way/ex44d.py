#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2023/2/14 16:22 
# @File: ex44d.py
# @Software: PyCharm

class Parent(object):

    def override(self):
        print("PARENT override()")

    def implicit(self):
        print("PARENT imlicit()")

    def altered(self):
        print("PARENT altered")


class Child(Parent):

    def override(self):
        print("CHILD override()")

    def altered(self):
        print("CHILD, before parent altered()")
        super(Child, self).altered()
        print("CHILD, AFTER PARENT altered()")


dad = Parent()
son = Child()

dad.implicit()
son.implicit()

dad.override()
son.override()

dad.altered()
son.altered()

