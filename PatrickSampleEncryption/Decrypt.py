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

# Function to decrypt a message using Serpent
def decrypt_message(encrypted_message, key):
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message)
    return decrypted_message.decode()

# Bob generates a shared secret and derives encryption key
bob_shared_secret = generate_shared_secret(myKeys.bob_private_key, myKeys.alice_public_key)
bob_key = derive_key(bob_shared_secret, b"alice_salt")

encrypted_message = b'gAAAAABlSpSvv0WC9oL5q0n5HiLidgpPMa2_mabBb11-axokK5SGro94cSefHDmVNg3Q_rn5lx1vDuqQNS0HZDPP4f-tsX2fNhqkIy1aZU2qFVQy8G_HHB-SfA7TsqsKAzLVfZVmYzYK'

# Simulate Bob receiving and decrypting the message
decrypted_message = decrypt_message(encrypted_message, bob_key)


print("Decrypted Message by Bob:", decrypted_message)