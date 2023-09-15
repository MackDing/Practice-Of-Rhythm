# -*- coding:utf-8 -*-
# @Time : 24/3/23 12:29 AM
# @Author: Mack.Ding
# @File : p006_sum_of_list.py

def sum_of_list(param_list):
    total = 0
    for item in param_list:
        total += item
    return total


list1 = [1, 2, 3, 4]
list2 = [17, 5, 3, 5]

print(f"sum of {list1}", sum_of_list(list1))
print(f"sum of {list2}", sum_of_list(list2))

print(f"sum of {list1}", sum(list1))
print(f"sum of {list2}", sum(list2))
