# -*- coding:utf-8 -*-
# @Time : 24/3/23 12:40 AM
# @Author: Mack.Ding
# @File : p007_get_even_numbers.py


def get_even_numbers(begin, end):
    result = []
    for item in range(begin, end + 1):
        if item % 2 == 0:
            result.append(item)
    return result


begin = 4
end = 15
print(f'begin = {begin}, end = {end} even_numbers: ', get_even_numbers(begin, end))
data = {item for item in range(begin, end) if item % 2 == 0}  # Here should be the list "[]"
print(f'begin = {begin}, end = {end} even_numbers: ', data)


data = {item for item in range(0, 101) if item % 2 == 0}
print(sum(data))

print(sum({item for item in range(0, 101) if item % 2 != 0}))
