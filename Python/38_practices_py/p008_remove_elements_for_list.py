# -*- coding:utf-8 -*-
# @Time : 26/3/23 10:16 PM
# @Author: Mack.Ding
# @File : p008_remove_elements_for_list.py


lista = [3, 5, 7, 9, 11, 13]
listb = [7, 11]


def remove_elements_for_list(lista, listb):
    for item in listb:
        lista.remove(item)
    return lista


print(f"{lista} remove {listb}, result: ", remove_elements_for_list(lista, listb))

lista = [3, 5, 7, 9, 11, 13]
listb = [7, 11]
data = [item for item in lista if item not in listb]
print(f"{lista} remove {listb}, result: ", data)
