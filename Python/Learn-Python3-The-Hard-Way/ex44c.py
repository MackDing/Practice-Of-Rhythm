#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2023/2/14 16:13 
# @File: ex44c.py
# @Software: PyCharm


class Parent(object):
    def altered(self):
        print("PARENT altered()")


class Child(Parent):
    def altered(self):
        print("CHILD, BEFORE PARENT altered()")
        super(Child, self).altered()   # super()函数是用于调用父类（超类）的一个方法
        print("CHILD, AFTER PARENT altered")


# dad = Parent()
# son = Child()
#
# dad.altered()
# son.altered()

Parent().altered()
Child().altered()