# -*- coding:utf-8 -*-
# @Time : 8/4/23 12:33 AM
# @Author: Mack.Ding
# @File : p033_re_search_prices.py
import re

content = """
小明上街买菜
买了1斤黄瓜花了8元；
买了2斤葡萄花了13.5元；
买了3斤白菜花了5.4元；
"""

# 提取 (1,黄瓜,8), (2,葡萄,13.5), (3，白菜，5.4)

# for
for line in content.split('\n'):
    # print(line)
# pattern
    pattern = r"(\d)斤(.*)花了(\d+(\.\d+)?)元"
# match
    match = re.search(pattern,line)
    # print(match)
# if
    if match:
        # print(match.groups())
        print(f"{match.group(1)}\t{match.group(2)}\t{match.group(3)}")

# print