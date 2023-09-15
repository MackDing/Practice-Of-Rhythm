# -*- coding:UTF-8 -*-
# #!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 11/10/2022 PM 3:44 
# @File: exercise23.py
# @Software: PyCharm


from sys import argv

# The default encoding in python3 is unicode
script, input_encoding, error = argv


def main(language_file, encoding, errors):
    line = language_file.readline()
    if line:
        print_line(line, encoding, errors)
        return main(language_file, encoding, errors)


def print_line(line, encoding, errors):
    '''
    str.strip([chars])
    Removes the character specified at the beginning and end of the string (by default, spaces or line breaks) or character sequences.
    Note: This method can only remove the first or last character, not the middle part of the character.
    '''
    next_lang = line.strip()
    # print(next_lang)
    raw_bytes = next_lang.encode(encoding, errors=errors)  # 编码 Transcoding also changes string to bytes
    # print(raw_bytes)
    cooked_string = raw_bytes.decode(encoding, errors=errors)  # 解码 Decoding also changes bytes back to string
    # print(cooked_string)
    print(raw_bytes, '<===>', cooked_string)


languages = open("languages.txt", encoding="gbk")  # set encoding='utf-8' script should UnicodeDecodeError
main(languages, input_encoding, error)
