# -*- coding:utf-8 -*-
# @Time : 31/3/23 7:18 PM
# @Author: Mack.Ding
# @File : binary_search.py


def binary_search(list, item):
    low = 0
    high = len(list) - 1
    while low <= high:
        mid = (low + high) // 2
        guess = list[mid]
        if guess == item:
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1

    return None


if __name__ == '__main__':
    my_list = [num_list for num_list in range(0, 101) if num_list % 2 != 0]
    print(my_list)
    print(binary_search(my_list, 49))
    print(binary_search(my_list, -10))
