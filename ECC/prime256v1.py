from ecdsa import SigningKey, SECP256k1

# Function to encrypt a message using the recipient's public key
def encrypt_message(message, recipient_public_key):
    ciphertext = recipient_public_key.encrypt(message.encode(), ecies.ECIES())
    return ciphertext

# Function to decrypt a message using the recipient's private key
def decrypt_message(ciphertext, recipient_private_key):
    plaintext = recipient_private_key.decrypt(ciphertext, ecies.ECIES())
    return plaintext.decode()

# Alice generates her key pair
alice_private_key = SigningKey.generate(curve=SECP256k1)
alice_public_key = alice_private_key.get_verifying_key()

# Bob generates his key pair
bob_private_key = SigningKey.generate(curve=SECP256k1)
bob_public_key = bob_private_key.get_verifying_key()

# Simulate Alice sending a message to Bob
alice_message = "Hello, Bob! This is a secret message."
encrypted_message = encrypt_message(alice_message, bob_public_key)

# Simulate Bob receiving and decrypting the message
decrypted_message = decrypt_message(encrypted_message, bob_private_key)

print("Original Message from Alice:", alice_message)
print("Decrypted Message by Bob:", decrypted_message)

# Simulate Bob sending a message to Alice
bob_message = "Hi, Alice! Here's my secret response."
encrypted_message = encrypt_message(bob_message, alice_public_key)

# Simulate Alice receiving and decrypting the message
decrypted_message = decrypt_message(encrypted_message, alice_private_key)

print("\nOriginal Message from Bob:", bob_message)
print("Decrypted Message by Alice:", decrypted_message)
