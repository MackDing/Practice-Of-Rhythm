#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/22 17:16 
# @File: ex45.py
# @Software: PyCharm


from selenium import webdriver

browser = webdriver.Firefox()
browser.get('http://localhost:8000')
assert 'Django' in browser.title
