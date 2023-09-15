# _*_ coding:utf-8 _*_
# 因为 lexicon_tests.py 文件调用时用的是from ex48 import lexicon 而不是 from ex48.lexicon import lexicon
# 所以不用类来写这个文件，不然会出现找不到scan函数的情况
# 用类写请将lexicon_tests.py 文件中from ex48 import lexicon 改为 from ex48.lexicon import Lexicon // Lexicon为类名

directions = ('south','north','west','east','center')
verbs = ('go','kill','eat','run','tell','shoot','sing','love')
stops = ('the','in','of','to','via')
nouns = ('bear','princess','MissHei','tiger','dragon')

def scan(stuff):
    words = stuff.split() #默认空格和其他符号 
    sentence = []

    for word in words:
        try:
            if word in directions:
                sentence.append(('direction',word))
            elif word in verbs:
                sentence.append(('verb',word))
            elif word in stops:
                sentence.append(('stop',word))
            elif word in nouns:
                sentence.append(('noun',word))
            else: 
                word = int(word)
                sentence.append(('number',word))
        except ValueError:
            sentence.append(('error',word))
    return sentence

# 手动测试函数
def test():  
    print(scan("Let's go go go "))

if __name__ == "__main__": # 直接运行此文件时运行，调用此文件时不运行
    test()
