def add_dashes(number):
    number = str(number)
    result = [number[0]]

    for i in range(1, len(number)):
        if int(number[i - 1]) % 2 == 1 and int(number[i]) % 2 == 1:
            result.append("-")
        result.append(number[i])

    return "".join(result)

num = 454793
print(add_dashes(num))  # Çıktı: 4547-9-3
