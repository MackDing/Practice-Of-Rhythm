# -*- coding:utf-8 -*-
# @Time : 27/3/23 11:13 PM
# @Author: Mack.Ding
# @File : p012_sort_grade_file.py
def read_file():
    result = []
    with open("./student_grade_input.txt") as fin:
        for line in fin:
            line = line[:-1]
            result.append(line.split(","))
    return result


def sort_grades(datas):
    return sorted(datas,
                  key=lambda x: int(x[2]),
                  reverse=True
                  )


def write_file(datas):
    with open('./student_grade_output.txt', 'w') as fout:
        for data in datas:
            fout.write(','.join(data) + '\n')


# 读取文件 ### txt文件光标要换行
datas = read_file()
print("read file datas: ", datas)
# 排序数据
datas = sort_grades(datas)
print(datas)

# 写出文件
write_file(datas)
