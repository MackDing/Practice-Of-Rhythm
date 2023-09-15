#!/usr/bin/python3.6
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/9/2 9:36 
# @File: exercise3.py
# @Software: Preface


print("Mary had a little lamb.")
print("Its fleece was white as {}.".format('snow'))
print("." * 10)  # What'd that do?

end1 = "C"
end2 = "h"
end3 = "e"
end4 = "e"
end5 = "s"
end6 = "e"
end7 = "B"
end8 = "u"
end9 = "r"
end10 = "g"
end11 = "e"
end12 = "r"

# watch end = '' at the end. try removing it see what happens
print(end1 + end2 + end3 + end4 + end5 + end6, end='')
print(end7 + end8 + end9 + end10 + end11 + end12)

end0 = 2
end0 += 1
print(end0)

print(end1 + end2 + end3 + end4 + end5 + end6, end=' ') # end=' '意思是末尾不换行，加空格
print(end7 + end8 + end9 + end10 + end11 + end12)