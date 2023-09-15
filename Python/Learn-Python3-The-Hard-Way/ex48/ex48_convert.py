def convert_number(s):
    try:
        return int(s)
    except ValueError:
        return None
    

convert_number('aaa')