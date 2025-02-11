import re

def check_name(name):
    pattern = r"^([A-Z][a-z]+(?: [A-Z][a-z]+)* )([A-Z]+)$"
    if re.match(pattern, name):
        return "Geçerli isim!"
    return "Geçersiz isim!"

names = ["Cemre MENGU", "Sude Sevval CILOGLU", "cemre mengu", "Sude", "sude MENGU"]
for name in names:
    print(f"{name}: {check_name(name)}")
