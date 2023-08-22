# -*- coding: utf-8 -*-
import ast
import uuid
import datetime
import pprint
import serpent


class DemoClass:
    def __init__(self):
        self.i=42
        self.b=False

data = {
    "names": ["Harry", "Sally", "Peter"],
    "big": 2**200,
    "colorset": { "red", "green" },
    "id": uuid.uuid4(),
    "timestamp": datetime.datetime.now(),
    "class": DemoClass(),
    "unicode": "€"
}

# serialize it
ser = serpent.dumps(data, indent=True)
open("data.serpent", "wb").write(ser)

print("Serialized form:")
print(ser.decode("utf-8"))

# read it back
data = serpent.load(open("data.serpent", "rb"))
print("Data:")
pprint.pprint(data)

# you can also use ast.literal_eval if you like
ser_string = open("data.serpent", "r", encoding="utf-8").read()
data2 = ast.literal_eval(ser_string)

assert data2==data