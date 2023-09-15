__builtins__.end = None


def my_abs(x):
    if x > 0:
        return x
    else:
        return -x
    end
end

print(my_abs(10))
print(my_abs(-10))