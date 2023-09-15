# -*- coding:utf-8 -*-
# @Time : 22/3/23 7:40 PM
# @Author: Mack.Ding
# @File : p004_print_primes.py

def is_primes(number):
    if number in (1, 2):
        return True
    for idx in range(2, number):
        if number % idx == 0:
            return False
    return True


def print_primes(begin, end):
    for number in range(begin, end + 1):
        if is_primes(number):
            print(f"{number} is a primes")


begin = 11
end = 23

print_primes(begin, end)
