# -*- coding:utf-8 -*-
# @Time : 11/4/23 12:47 AM
# @Author: Mack.Ding
# @File : p036_split_file_get_words.py


# with open
import re

import pandas as pd

with open(r'./Scrum_Guide_US.txt') as fin:
    content = fin.read()
# print(content.split())

# re.split
words = re.split(r'[\s.()-?]+', content)
print(words)

# pandas as pd
print(pd.Series(words).value_counts()[:20])
