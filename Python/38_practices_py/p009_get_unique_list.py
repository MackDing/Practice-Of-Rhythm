# -*- coding:utf-8 -*-
# @Time : 26/3/23 10:30 PM
# @Author: Mack.Ding
# @File : p009_get_unique_list.py

def get_unique_list(lista):
    result = []
    for item in lista:
        if item not in result:
            result.append(item)
    return result


lista = [10, 20, 30, 10, 20]

print(f'source list {lista}, unique list is:  ', get_unique_list(lista))

print(f'source list {lista}, unique list is:  ', list(set(lista)))
