# -*- coding:utf-8 -*-
# @Time : 7/4/23 11:41 PM
# @Author: Mack.Ding
# @File : p031_re_search_email.py
import re

content = """
寻隐者12345@qq.com不遇 
朝代：唐asdf12dsa#abc.com代 
作python666@163.cn者：贾岛
松下问童子，言师python-abc@163com采药去。
只在oython_ant-666@sina.net此山中，云深不知处。
"""

pattern = re.compile(r"""
    [a-zA-Z0-9_-]+
    @
    [a-zA-Z0-9]+
    \.
    [a-zA-Z]{2,4}
""",re.VERBOSE
)

results = pattern.findall(content)
print(results)
for result in results:
    print(result)


