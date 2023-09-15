# -*- coding:utf-8 -*-
# @Time : 29/3/23 8:26 PM
# @Author: Mack.Ding
# @File : p013_compute_max_min_avg.py

def compute_score():
    score = []
    with open("./student_grade_input.txt", "r") as fin:
        for line in fin:
            line = line[:-1]
            fields = line.split(',')
            score.append(int(fields[-1]))
    max_score = max(score)
    min_score = min(score)
    avg_score = round(sum(score) / len(score), 2)
    return max_score, min_score, avg_score


max_score, min_score, avg_score = compute_score()

print(f"max_score={max_score}, min_score={min_score},avg_score={avg_score}")
