import string

def check_password(password):
    if len(password) < 7 or len(password) > 31:
        return "Geçersiz: Uzunluk şartını sağlamıyor."
    if "parola" in password.lower():
        return "Geçersiz: 'parola' kelimesini içeriyor."
    if not any(char.isupper() for char in password):
        return "Geçersiz: En az bir büyük harf içermeli."
    if not any(char.isdigit() for char in password):
        return "Geçersiz: En az bir rakam içermeli."
    if not any(char in string.punctuation for char in password):
        return "Geçersiz: En az bir noktalama işareti içermeli."
    
    return "Geçerli parola!"

password = input("Parolanızı girin: ")
print(check_password(password))
