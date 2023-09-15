# -*- coding:utf-8 -*-
# @Time : 4/4/23 12:41 AM
# @Author: Mack.Ding
# @File : p027_sale_data_week_diff.py
import datetime

date_sale = {}

is_first_line = True
with open('./date_sale_data.txt') as fin:
    for line in fin:
        line = line[:-1]
        if is_first_line:
            is_first_line = False
            continue
        date, sale_num = line.split('\t')
        date_sale[date] = float(sale_num)


def get_diff_days(date, days):
    curr_date = datetime.datetime.strptime(date, '%Y-%m-%d')
    timedelta = datetime.timedelta(days=-days)
    return (curr_date + timedelta).strftime('%Y-%m-%d')


for date, sale_num in date_sale.items():
    date7 = get_diff_days(date, 7)
    sale_num7 = date_sale.get(date7, 0)
    if sale_num7 == 0:
        print(date, sale_num, 0)
    else:
        week_diff = (sale_num - sale_num7) / sale_num7
        print(date, sale_num, date7, sale_num7, week_diff)
