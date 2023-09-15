#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2023/2/14 17:32 
# @File: ex44e.py
# @Software: PyCharm


'''
- 无论如何都要避免多重继承，因为它太复杂而且不可靠。如果你被它困住了，那么要准备好了解一下类的层次结构，并花时间找出所有内容的来源。

- 使用组合将代码打包到模块中，这些模块可以用于许多不同的、不相关的地方和情境。

- 只有当存在明显相关的可复用代码片段，并且这些代码片段符合单个通用概念，或者由于你使用了某些东西而别无选择时，你才可以使用继承。
'''


class Other(object):
    def override(self):
        print("OTHER override()")

    def implicit(self):
        print("OTHER implicit()")

    def altered(self):
        print("OTHER altered()")


class Child(object):

    def __init__(self):
        self.other = Other()

    def implicit(self):
        self.other.implicit()

    def override(self):
        print("CHILD override()")

    def altered(self):
        print("CHIL, BEFORE OTHER altered()")
        self.other.altered()
        print("CHILD, AFTER OTHRT altered()")


son = Child()

son.implicit()
son.override()
son.altered()
