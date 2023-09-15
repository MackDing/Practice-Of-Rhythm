# -*- coding:utf-8 -*-
# @Time : 29/3/23 8:39 PM
# @Author: Mack.Ding
# @File : p014_count_word_in_article.py
import pprint

word_count = {}

with open('./Scrum_Guide_US.txt')as fin:
    for line in fin:
        line = line[:-1]
        words = line.split()
        for word in words:
            if word not in word_count:
                word_count[word] = 0
            word_count[word] += 1

pprint.pprint(
    sorted(word_count.items(),    # 以列表返回一个视图对象
           key=lambda x: x[1],
           reverse=True)[:10]
)
print(type(word_count))
print(type(word_count.items()))

