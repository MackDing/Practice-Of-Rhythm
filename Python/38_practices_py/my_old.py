# -*- coding:utf-8 -*-
# @Time : 24/9/22 2:40 PM
# @Author: Mack.Ding
# @File : my_old.py


# 导入时间模块
import datetime

# 输入生日日期，字符串格式
my_birthday = '1900-01-20'

# 转换为可识别的
my_birthday = datetime.datetime.strptime(my_birthday, '%Y-%m-%d')
print(my_birthday)

# datetime.datetime(2000, 1, 1, 0, 0)

# 查看目前的时间
datetime.datetime.now()
print(datetime.datetime.now())
# datetime.datetime(2022, 4, 5, 14, 15, 27, 748086)

# 计算间隔时间。这里间隔时间其实最小单位并不是天，而是微秒
diff = datetime.datetime.now() - my_birthday

# 查看时间间隔
print(diff)

# datetime.timedelta(days=8130, seconds=58676, microseconds=52564)


# 提取天数的部分
print(diff.days)
