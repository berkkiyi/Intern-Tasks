def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

nums = [5, 6, 7]  # Örnek sayı listesi
factorials = [str(factorial(n)) for n in nums]
print(", ".join(factorials))


##RECURSIVE###

def recursive_factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * recursive_factorial(n - 1)

nums = [5, 6, 7]  # Örnek sayı listesi
factorials = [str(recursive_factorial(n)) for n in nums]
print(", ".join(factorials))
