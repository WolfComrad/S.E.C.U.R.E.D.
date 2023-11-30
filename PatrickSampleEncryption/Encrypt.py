from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.fernet import Fernet
import base64
import myKeys as myKeys

# Function to generate a shared secret from a private key and a public key
def generate_shared_secret(private_key, public_key):
    shared_secret = private_key.exchange(ec.ECDH(), public_key)
    return shared_secret

# Function to derive an encryption key from a shared secret
def derive_key(shared_secret, salt):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        salt=salt,
        iterations=100000,  # Adjust as needed for your security requirements
        length=32,  # Specify the desired key length (e.g., 32 bytes for AES-256)
        backend=default_backend()
    )
    key = base64.urlsafe_b64encode(kdf.derive(shared_secret))
    return key

# Function to encrypt a message using Serpent
def encrypt_message(message, key):
    f = Fernet(key)
    encrypted_message = f.encrypt(message.encode())
    return encrypted_message

# Alice generates a shared secret and derives encryption key
alice_shared_secret = generate_shared_secret(myKeys.alice_private_key, myKeys.bob_public_key)
alice_key = derive_key(alice_shared_secret, b"alice_salt")

# Simulate Alice sending a message to Bob
alice_message = "Hello, Bob! This is a secret message."

# Alice encrypts the message using Serpent
encrypted_message = encrypt_message(alice_message, alice_key)

print(encrypted_message)