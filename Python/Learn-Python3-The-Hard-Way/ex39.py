#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/16 15:12 
# @File: ex39.py
# @Software: PyCharm

# import this

# create a mapping of state to abbreviation
states = {
    'Oregon': 'OR',
    'Florida': 'FL',
    'California': 'CA',
    'New York': 'NY',
    'Michigan': 'MI'
}

# create a basic set of states and some cities in them
cities = {'CA': 'San Francisco', 'MI': 'Detroit', 'FL': 'Jacksonville'}

# add some more coyies
cities['NY'] = 'New York'
cities['OR'] = 'Portland'

# print out some cites
print('- ' * 10)
print("NY State has: ", cities["NY"])
print("OR State has: ", cities['OR'])

# print some states
print("-" * 10)
print("Michigan's abbreviation is: ", states['Michigan'])
print("Florida's abbreviation is: ", states['Florida'])

# do it bby using the state then cities dict
print('- ' * 9)
print("Michigan has: ", cities[states['Michigan']])
print("Florida has: ", cities[states['Florida']])

# print every state abbreviation
print('- ' * 8)
for state, abbrev in list(states.items()):
    print(f"{state} has the abbreviation {abbrev}.")

# print every city in state
print('- ' * 10)
for abbrev, city in list(cities.items()):
    print(f"{abbrev} has the city {city}")

# now do both at the same time
print('- ' * 10)
for state, abbrev in list(states.items()):
    print(f"{state} state is abbreviated {abbrev}")
    print(f"and has city {cities[abbrev]}")

print('-' * 10)
# safely get a abbreviation by state that might not be there
state = states.get('Texas')
# state = states.get('Oregon')
if not state:
    print('Sorry, no Texas')

# get a city with a default value
print('-' * 10)
city = cities.get('TX', 'Does Not Exist')
# city = cities.get('CA', 'Does Not Exist')
print(f"The city for the state 'TX' is : {city}")
