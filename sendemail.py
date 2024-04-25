import random
import string

def generate_key():
    characters = string.ascii_letters + string.digits
    key = ''.join(random.choice(characters) for _ in range(8))
    return key

generated_key = generate_key()
print("Generated Key:", generated_key)


def verifyKey(key, generated_key):
    print(key)
    if(key == generated_key):
        print('all done')
        return True
    else:
        return False


while True:
    user_input_key = input('Please enter the verification key sent to your email address: ')
    if verifyKey(user_input_key, generated_key):
        print('thank you for successfully signing up to you account!')
        break
