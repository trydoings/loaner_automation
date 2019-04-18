import hashlib, binascii, os
import sys

def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  provided_password.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    print(stored_password)
    return pwdhash == stored_password

password = sys.argv[1]
storedPassowrd = hash_password(password)

while(1):
    passowrd_input = input("Enter your computer password: ")
    checker = verify_password(storedPassowrd, passowrd_input)
    if checker:
        print("Passwords match")
        break
    else:
        print("Password incorrect, try again.")
