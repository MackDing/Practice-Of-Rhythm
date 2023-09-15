# -*- coding:utf-8 -*-
# @Time : 2/4/23 11:21 PM
# @Author: Mack.Ding
# @File : p017_search_dir.py


import os

# d:/workbenc/xxx
search_dir = "./arrange_dir/txt"

result_files = []
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".txt"):
            file_path = f"{root}/{file}"
            result_files.append((file_path,
                                os.path.getsize(file_path) / 1000))

print(
    sorted(result_files,
           key=lambda x: x[1],
           reverse=True)[:10]
)
