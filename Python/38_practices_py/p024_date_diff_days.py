# -*- coding:utf-8 -*-
# @Time : 3/4/23 10:43 PM
# @Author: Mack.Ding
# @File : p024_date_diff_days.py
import datetime


def get_diff_days(part_date, days):
    part_date_obj = datetime.datetime.strptime(part_date, '%Y-%m-%d')
    time_gap = datetime.timedelta(days=days)
    part_result = part_date_obj - time_gap
    return part_result.strftime('%Y-%m-%d')


print(get_diff_days("2022-03-4", 5))
print(get_diff_days("2022-01-4", 8))
print(get_diff_days("2022-03-4", 11))
print(get_diff_days("2022-12-3", 5))
print(get_diff_days("2022-12-30", 5))
print(get_diff_days("2022-03-4", 4))
