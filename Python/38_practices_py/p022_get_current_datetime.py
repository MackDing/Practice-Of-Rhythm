# -*- coding:utf-8 -*-
# @Time : 3/4/23 12:25 AM
# @Author: Mack.Ding
# @File : p022_get_current_datetime.py

import datetime

curr_dateTime = datetime.datetime.now()
print(curr_dateTime, type(curr_dateTime))

str_time = curr_dateTime.strftime("%Y-%m-%d %H-%M-%S")

print("str_time is: ", str_time)

print("Year", curr_dateTime.year)
print("month", curr_dateTime.month)
print("day", curr_dateTime.day)
print("hour", curr_dateTime.hour)
print("minute", curr_dateTime.minute)
print("second", curr_dateTime.second)
