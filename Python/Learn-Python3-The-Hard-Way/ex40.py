#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/21 18:32 
# @File: ex40.py
# @Software: PyCharm


class Song(object):

    def __init__(self, lyrics):
        self.lyrics = lyrics
        # print(self.lyrics)
        print(lyrics)

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)


happy_bday = Song(["Happy birthday to you", "I don't want to get sued", "So I 'll stop right there"])

bulls_on_parade = Song(["They rally around the family", "With pockets full of shells"])

happy_bday.sing_me_a_song()

print('-' * 8)

bulls_on_parade.sing_me_a_song()
