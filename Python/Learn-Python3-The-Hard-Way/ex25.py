#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 13/10/2022 PM 2:13 
# @File: ex25.py
# @Software: PyCharm


def break_words(stuff):
    """This function will break up words for us."""
    words = stuff.split(' ')
    return words


def sort_words(words):
    """Sorts the words.
    sorted syntax:sorted(iterable, cmp=None, key=None, reverse=False)
    """
    return sorted(words)


def sort_again_words(words):
    return sorted(sorted_words)


def print_first_word(words):
    """Prints the first word after popping it off."""
    word = words.pop(0)
    print(word)


def print_last_word(words):
    """Prints the last word after popping it off."""
    word = words.pop(-1)
    print(word)


def sort_sentence(sentence):
    """Takes in a full sentence and returns the sorted words."""
    words = break_words(sentence)
    return sort_words(words)


def print_first_and_last(sentence):
    """Prints the first and last words of the sentence."""
    words = break_words(sentence)
    print_first_word(words)
    print_last_word(words)


def print_first_and_last_sorted(sentence):
    """Sorts the words then prints the first and last one."""
    words = sort_sentence(sentence)
    print_first_word(words)
    print_last_word(words)


"""
import ex25
sentence = "All good things come to those who wait."
words = ex25.break_words(sentence)
words
sorted_words = ex25.sort_words(words)
sorted_words
ex25.print_first_word(words)
ex25.print_last_word(words)
words
ex25.print_first_word(sorted_words)
ex25.print_last_word(sorted_words)
sorted_words
sorted_words = ex25.sort_sentence(sentence)
sorted_words
ex25.print_first_and_last(sentence)
ex25.print_first_and_last_sorted(sentence)
"""

sentence = "All good things come to those who wait."

words = break_words(sentence)
print(words)

sorted_words = sort_words(words)
print(sorted_words)

print_first_word(words)
print_last_word(words)
print(words)
print_first_word(sorted_words)
print_last_word(sorted_words)
print(sorted_words)
sorted_words = sort_sentence(sentence)
print(sorted_words)
print_first_and_last(sentence)
print_first_and_last_sorted(sentence)
