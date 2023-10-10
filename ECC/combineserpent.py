#ECC on

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.fernet import Fernet
import base64

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

# Function to decrypt a message using Serpent
def decrypt_message(encrypted_message, key):
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message)
    return decrypted_message.decode()

# Alice generates her key pair using prime256v1
alice_private_key = ec.generate_private_key(ec.SECP256R1(), default_backend())
alice_public_key = alice_private_key.public_key()

# Bob generates his key pair using prime256v1
bob_private_key = ec.generate_private_key(ec.SECP256R1(), default_backend())
bob_public_key = bob_private_key.public_key()

# Serialize Alice's public key for sending to Bob (in practice, this should be done securely)
alice_public_pem = alice_public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

# Serialize Bob's public key for sending to Alice (in practice, this should be done securely)
bob_public_pem = bob_public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

# Alice and Bob exchange public keys (in practice, this should be done securely)

# Alice generates a shared secret and derives encryption key
alice_shared_secret = generate_shared_secret(alice_private_key, bob_public_key)
alice_key = derive_key(alice_shared_secret, b"alice_salt")

# Bob generates a shared secret and derives encryption key
bob_shared_secret = generate_shared_secret(bob_private_key, alice_public_key)
bob_key = derive_key(bob_shared_secret, b"alice_salt")

# Simulate Alice sending a message to Bob
alice_message = "Hello, Bob! This is a secret message."

# Alice encrypts the message using Serpent
encrypted_message = encrypt_message(alice_message, alice_key)

# Simulate Bob receiving and decrypting the message
decrypted_message = decrypt_message(encrypted_message, bob_key)

print("Original Message from Alice:", alice_message)
print("Decrypted Message by Bob:", decrypted_message)
print(encrypted_message)