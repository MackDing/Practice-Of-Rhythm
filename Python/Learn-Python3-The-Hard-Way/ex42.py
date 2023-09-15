#!/usr/bin/python3.8
# -*- coding: utf-8 -*-
# @Author: Mack
# @Time: 2022/12/22 15:25 
# @File: ex42.py
# @Software: PyCharm


## Animal is-a object (yes, sort of confusing) look at the extra credit
class Animal(object):
    pass


## Make a class named Dog that is-a Animal.
class Dog(Animal):

    def __init__(self, name):
        ## From name get the name attribute and set it to 'name'.
        self.name = name


## Make a class named Cat that is-a Animal.
class Cat(Animal):

    def __init__(self, name):
        ## From name get the name attribute and set it to 'name'.
        self.name = name


## Person is-a object
class Person(object):

    def __init__(this, name):
        ## From name get the name attribute and set it to 'name'.
        this.name = name

        ## Person has-a pet of some kind
        this.pet = None


## Employee is-a object
class Employee(Person):

    def __init__(self, name, salary):
        ## ?? hmm what is this strange magic? Get the init content of the parent class.
        super(Employee, self).__init__(name)
        ## Employee has-a salary
        self.salary = salary


## Fish is-a object
class Fish(object):
    pass


## Salmon is-a object
class Salmon(Fish):
    pass


## Halibut is-a object
class Halibut(Fish):
    pass


## rover is-a Dog
rover = Dog("Rover")

## Santan is-a Cat
satan = Cat("Santan")

## Mary is-a Person
mary = Person("Mary")

## mary has-a pet, satan is-a cat
mary.pet = satan

## frank is-a Employee
frank = Employee("Frank", 120000)

## frank has-a pet, rover is-a Dog
frank.pet = rover

## flipper is-a fish
flipper = Fish()

## crouse is-a Salmon
crouse = Salmon()

## harry is-a halibut
harry = Halibut()
