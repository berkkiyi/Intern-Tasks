import re

def regex_password_check(password):
    pattern = r"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*parola).{7,31}$"
    if re.match(pattern, password):
        return "Geçerli parola!"
    return "Geçersiz parola!"

password = input("Parolanızı girin: ")
print(regex_password_check(password))
