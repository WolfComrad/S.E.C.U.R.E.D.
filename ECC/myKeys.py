from cryptography.hazmat.primitives import serialization

# Initialize variables to store key sections
key_sections = []
current_section = []

# Read the keys from the file
with open('ECC/keysss', 'rb') as file:
    for line in file:
        if b'-----BEGIN ' in line:
            # If a new section begins, check if we were already collecting one
            if current_section:
                key_sections.append(b''.join(current_section))
                current_section = []
        current_section.append(line)

# Append the last section
if current_section:
    key_sections.append(b''.join(current_section))

# Check if we have exactly four key sections
if len(key_sections) != 4:
    raise ValueError("Expected four key sections in the 'keysss' file")

# Deserialize the keys
alice_private_key_pem, alice_public_key_pem, bob_private_key_pem, bob_public_key_pem = key_sections

alice_private_key = serialization.load_pem_private_key(alice_private_key_pem, password=None)
alice_public_key = serialization.load_pem_public_key(alice_public_key_pem)
bob_private_key = serialization.load_pem_private_key(bob_private_key_pem, password=None)
bob_public_key = serialization.load_pem_public_key(bob_public_key_pem)