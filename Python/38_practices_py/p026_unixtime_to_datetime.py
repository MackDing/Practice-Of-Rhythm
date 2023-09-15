# -*- coding:utf-8 -*-
# @Time : 3/4/23 11:17 PM
# @Author: Mack.Ding
# @File : p026_unixtime_to_datetime.py


import datetime

unix_time = 1620747647

datetime_obj = datetime.datetime.fromtimestamp(unix_time)
print(datetime_obj)
datetime_str = datetime_obj.strftime('%Y-%m-%d %H-%M-%S')
print(datetime_str)
