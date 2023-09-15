# -*- coding:utf-8 -*-
# @Time : 11/4/23 12:10 AM
# @Author: Mack.Ding
# @File : p035_format_article_phone.py
import re

content = """
        白日依2022/03/19山尽，
        黄河入2023.04.15海流。 
        欲穷05-22-2022千里目，
        更上5/26/2022一层楼。
"""

# re
content = re.sub(r'(\d{4})/(\d{2})/(\d{2})', r'\1-\2-\3', content)
print(content)

content = re.sub(r'(\d{4})\.(\d{2})\.(\d{2})', r'\1-\2-\3', content)
print(content)

content = re.sub(r'(\d{2})-(\d{2})-(\d{4})', r'\3-\1-\2', content)
print(content)

content = re.sub(r'(\d{1})/(\d{2})/(\d{4})', r'\3-0\1-\2', content)
print(content)
