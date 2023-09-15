# -*- coding:utf-8 -*-
# @Time : 11/4/23 1:44 AM
# @Author: Mack.Ding
# @File : p038_chinese_person_name.py


# content = "李明喜欢韩梅梅，他俩早恋了"

import jieba.posseg as posseg
import pandas as pd

with open('鹿鼎记.txt') as fin:
    content = fin.read()
words = []
for word, flag in posseg.cut(content):
    if flag == 'nr':
        # print(word, flag)
        words.append(word)
# print(words)

print(pd.Series(words).value_counts()[:20])
