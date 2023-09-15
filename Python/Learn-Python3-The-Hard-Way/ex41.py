#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/22 10:22 
# @File: ex41.py
# @Software: PyCharm


"""
类（class） ：告诉 Python 创建一个新类型的东西（Tell Python to make a new type of thing）。

对象（object）两种含义：最基本类型的东西, 任何实例。（the most basic type of thing, and any instance of something.）

实例（instance） ：当你告诉 Python 创建一个类的时候你所得到的东西。（What you get when you tell Python to create a class.）

def ：你如何在类里面定义一个函数。（How you define a function inside a class.）

self ：在一个类的函数里面，self 是被访问的实例/对象的一个变量。即实例属性。（Inside the functions in a class, self is a variable for the instance/object being accessed.）

继承（inheritance） ：关于一个类能从另一个类那里继承它的特征的概念，很像你和你的父母。（The concept that one class can inherit traits from another class, much like you and your parents.）

组合（composition） ：关于一个类可以由其他一些类构成的概念, 很像一辆车包含几个轮子。（The concept that a class can be composed of other classes as parts, much like how a car has wheels.）

属性（attribute） ：类所拥有的从组合那里得到的特性，通常是变量。（A property classes have that are from composition and are usually variables.）

is-a ：一种用来表达某物继承自一种东西的表述, 就像“三文鱼是一种鱼”。（A phrase to say that something inherits from another, as in a “salmon” is a “fish.”）

has-a ：一种用来表达某物是由一些东西组成或具有某种特性的表述，就像“三文鱼有一个嘴巴”。（A phrase to say that something is composed of other things or has a trait, as in “a salmon has-a mouth.”）
"""

import random, sys
from urllib.request import urlopen

WORD_URL = "http://learncodethehardway.org/words.txt"
WORDS = []

PHRASES = {
    "class %%%(%%%):":
        "Make a class named %%% that is-a %%%.",
    "class %%%(object):\n\tdef __init__(self, ***)":
        "class %%% has-a __init__ that takes self and *** params.",
    "class %%%(object):\n\tdef ***(self, @@@)":
        "class %%% has-a function *** that takes self and @@@ params.",
    "*** = %%%()":
        "Set *** to an instance of class %%%.",
    "***.***(@@@)":
        "From *** get the *** function, call it with params self @@@.",
    "***.*** = '***'":
        "From *** get the *** attribute and set it to '***'."
}

# do they want to drill phrases first
if len(sys.argv) == 2 and sys.argv[1] == "english":
    PHRASE_FIRST = True
else:
    PHRASE_FIRST = False

# load up the words from the website
for word in urlopen(WORD_URL).readlines():
    WORDS.append(str(word.strip(), encoding="utf-8"))
    # print(WORDS)

def convert(snippet, phrase):
    class_names = [w.capitalize() for w in
                   random.sample(WORDS, snippet.count("%%%"))]
    other_names = random.sample(WORDS, snippet.count("***"))
    results = []

    param_names = []

    for i in range(0, snippet.count("@@@")):
        param_count = random.randint(1, 3)
        param_names.append(', '.join(random.sample(WORDS, param_count)))

    for sentence in snippet, phrase:
        result = sentence[:]

        # fake class names
        for word in class_names:
            result = result.replace("%%%", word, 1)

        # fake other names
        for word in other_names:
            result = result.replace("***", word, 1)

        # fake parameter lists
        for word in param_names:
            result = result.replace("@@@", word, 1)

        results.append(result)

    return results


# keep going until they hit CTRL-D
try:
    while True:
        snippets = list(PHRASES.keys())
        random.shuffle(snippets)

        for snippet in snippets:
            phrase = PHRASES[snippet]
            question, answer = convert(snippet, phrase)
            if PHRASE_FIRST:
                question, answer = answer, question

            print(question)

            input("> ")
            print(f"ANSWER: {answer}\n\n")
except EOFError:
    print("\nBye")
