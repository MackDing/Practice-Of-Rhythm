# -*- coding:utf-8 -*-
# @Time : 7/4/23 11:52 PM
# @Author: Mack.Ding
# @File : p032_re_search_password.py


"""写一个函数，验证密码是否满足条件
1,长度位于[6,20]之间
2,必须包含至少1个小写字母
3,必须包含至少1个大写字母
4,必须包含至少1个数字
5,必须包含至少1个特殊字符

返回
    True None
    或者False,原因
"""
import re


def check_password(password):
    # 密码必须赵6到20之间
    if not 6 <= len(password) <= 20:
        return False, "密码必须赵6到20之间"
    # 必须包含至少1个小写字母
    if not re.findall(r"[a-z]", password):
        return False, "必须包含至少1个小写字母"
    # 必须包含至少1个大写字母
    if not re.findall(r"[A-Z]", password):
        return False, "必须包含至少1个大写字母"
    # 必须包含至少1个数字
    if not re.findall(r"[0-9]", password):
        return False, "必须包含至少1个数字"
    # 必须包含至少1个特殊符号
    if not re.findall(r"[^A-Za-z0-9]", password):
        return False, "必须包含至少1个数字"
    return True, None


print("adJK2134*!", check_password("adJK2134*!"))
print("asdJH(&", check_password("asdJH(&"))
print("asd2134*!", check_password("asd2134*!"))
print("JK2134*!", check_password("JK2134*!"))
print("123456", check_password("123456"))
print("111", check_password("111"))


print(check_password(input("Pls fill in pwd:")))
