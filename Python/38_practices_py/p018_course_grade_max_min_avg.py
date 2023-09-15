# -*- coding:utf-8 -*-
# @Time : 1/4/23 7:23 PM
# @Author: Mack.Ding
# @File : p018_course_grade_max_min_avg.py

# key: course, value: grade list
course_grades = {}

with open('./course_student_grade_input.txt') as fin:
    for line in fin:
        line = line[:-1]
        course, sno, sname, grade = line.split(",")
        # print(course, sno, sname, grade)
        if course not in course_grades:
            course_grades[course] = []
        course_grades[course].append(int(grade))

print(course_grades)
print(course_grades.items())

for course, grade in course_grades.items():  # 以列表返回一个视图对象
    print(
        course,
        min(grade),
        max(grade),
        sum(grade) / len(grade)
    )
