# -*- coding:utf-8 -*-
# @Time : 30/3/23 8:33 PM
# @Author: Mack.Ding
# @File : p015_size_of_file.py


import os

print(os.path.getsize('Scrum_Guide_US.txt'))

sum_size = 0
for file in os.listdir('.'):
    if os.path.isfile(file):
        sum_size += os.path.getsize(file)

print('all size in dir: ', round(sum_size / 1000, 2), "kb")

for i in range(1, 5):
    for j in range(1, 5):
        for k in range(1, 5):
            if (i != j) and (j != k) and (k != i):
                print(i, j, k)
'''
1 2 3
1 2 4
1 3 2
1 3 4
1 4 2
1 4 3
2 1 3
2 1 4
2 3 1
2 3 4
2 4 1
2 4 3
3 1 2
3 1 4
3 2 1
3 2 4
3 4 1
3 4 2
4 1 2
4 1 3
4 2 1
4 2 3
4 3 1
4 3 2
'''
