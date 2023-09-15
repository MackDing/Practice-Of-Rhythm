# -*- coding:utf-8 -*-
# @Time : 8/4/23 1:06 AM
# @Author: Mack.Ding
# @File : p034_re_search_phone.py
import re

content = """
        白日依19989881888山尽，
        黄河入45645546468798978海流。 
        欲穷12345千里目，
        更上15619292345一层楼。
"""

# pattern
pattern = r'(1[3-9])\d{9}'

# sub
print(re.sub(pattern, r"\1*********", content))
