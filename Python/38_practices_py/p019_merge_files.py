# -*- coding:utf-8 -*-
# @Time : 2/4/23 2:10 PM
# @Author: Mack.Ding
# @File : p019_merge_files.py

course_teacher_map = {}
with open('./datas/course_teacher.txt') as fin:
    for line in fin:
        line = line[:-1]
        course, teacher = line.split(',')
        course_teacher_map[course] = teacher

# print(course_teacher_map)  # {'语文': '于老师', '数学': '周老师', '英语': '董老师'}
# print(type(course_teacher_map))  # <class 'dict'>
result = []
with open('course_student_grade_input.txt') as fin:
    for line in fin:
        line = line[:-1]
        course, sno, sname, garde = line.split(',')
        teacher = course_teacher_map.get(course)
        print(course, teacher, sno, sname, garde)
        result.append((course, teacher, sno, sname, garde))
    print(result)

# 输出到另一个txt文件
with open('./datas/course_teacher_output.txt', 'w') as four:
    four.write(str(result))
    # for course, teacher, sno, sname, garde in result.items():
    #     course, teacher, sno, sname, garde = (course, teacher, sno, sname, garde).split('\t')
    #     print(course, teacher, sno, sname, garde)
