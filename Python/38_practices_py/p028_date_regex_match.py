# -*- coding:utf-8 -*-
# @Time : 4/4/23 1:01 AM
# @Author: Mack.Ding
# @File : p028_date_regex_match.py
import re


def date_is_right(date):
    return re.match("\d{4}-\d{2}-\d{2}", date) is not None


date1 = '2022-05-20'
date2 = '202-05-20'
date3 = '2022/05-20'
date4 = '20220520'

print(date1, date_is_right(date1))
print(date2, date_is_right(date2))
print(date3, date_is_right(date3))
print(date4, date_is_right(date4))
