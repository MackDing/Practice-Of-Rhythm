# -*- coding:utf-8 -*-
# @Time : 3/4/23 12:08 AM
# @Author: Mack.Ding
# @File : p020_concat_text_files.py
import os

data_dir = './datas/many_texts'

contents = []
for file in os.listdir(data_dir):
    file_path = f'{data_dir}/{file}'
    if os.path.isfile(file_path) and file.endswith('.txt'):
        print(file_path)
        with open(file_path) as fin:
            contents.append(fin.read())

final_content = "\n".join(contents)
with open('./datas/many_texts.txt', 'w') as fout:
    fout.write(final_content)
