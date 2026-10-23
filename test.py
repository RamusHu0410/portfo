"""
APPLICATION FORM ENGINE  (~20 min)

Our application form is described by a list of fields, and the same description
drives the website (which shows the errors) and the server (which enforces them).
Organizers keep adding new field types, so types must be pluggable: adding one
must NOT mean editing Form.validate. A field type is any object with:

    check(value, field) -> an error string, or None if the value is fine
        (only called for values that aren't empty; `field` is the field's dict)

BooleanType below is an example.

Form(fields, types)
    types maps a type name to a field type object, e.g. {"text": TextType()}.
    Raise ValueError if a field uses an unknown type or two fields share a key.

form.validate(answers) -> {key: error} for every field with a problem
    "REQUIRED" if a required field is empty (missing, None, or only spaces).
    Otherwise, if the value isn't empty, the field's type decides.

Also write the built-in types:
    TextType    "TOO_LONG" if longer than field["max_length"] (after trimming)
    NumberType  "TOO_SMALL" if below field["min"]
    ChoiceType  "INVALID_CHOICE" if not in field["options"]
(max_length and min are optional on a field.)

If something isn't specified, pick a behaviour and explain it.

Examples (using FIELDS and TYPES from the tests section below)

  Example 1: a valid application
    form = Form(FIELDS, TYPES)
    form.validate({"name": " Jane ", "age": 20, "school": "UBC",
                   "dietary": "vegan", "in_person": True})
      -> {}

  Example 2: several problems at once
    form.validate({"name": "  ", "age": 12, "school": "UBC",
                   "dietary": "pizza", "in_person": True})
      -> {"name": "REQUIRED", "age": "TOO_SMALL", "dietary": "INVALID_CHOICE"}
         name is only spaces, 12 is below the min of 13, "pizza" isn't an option

  Example 3: a bad schema
    Form([{"key": "x", "type": "nope"}], TYPES)   -> raises ValueError (unknown type)
    Form([{"key": "x", "type": "text"},
          {"key": "x", "type": "text"}], TYPES)   -> raises ValueError (duplicate key)

  Example 4: a type the Form has never seen
    class EmailType:
        def check(self, value, field):
            return None if "@" in value else "INVALID_EMAIL"

    Form([{"key": "email", "type": "email", "required": True}], {"email": EmailType()})
        .validate({"email": "jane.ubc.ca"})   -> {"email": "INVALID_EMAIL"}
"""

from __future__ import annotations
from typing import Any, Protocol


# A "Protocol" is just a written-down description of what an object has to look
# like. Nothing inherits from FieldType and nothing is created from it: any object
# with a matching check() method counts as a field type. The "..." below means
# there's no body, because this is a description, not an implementation.
# It's here so you can see the interface at a glance; you can ignore it.
class FieldType(Protocol):
    def check(self, value: Any, field: dict) -> str | None: ...


class BooleanType:
    def check(self, value: Any, field: dict) -> str | None:
        return None if isinstance(value, bool) else "NOT_BOOLEAN"

class TextType:
    def check(self, value: Any, field: dict) -> str | None:
        # TextType    "TOO_LONG" if longer than field["max_length"] (after trimming)
        if len(value) > field.get("max_length", float('inf')):
            return "TOO_LONG"
        return None

class NumberType:
    def check(self, value: Any, field: dict) -> str | None:
        # NumberType  "TOO_SMALL" if below field["min"]
        if value < field.get("min", float('-inf')):
            return "TOO_SMALL"
        return None

class ChoiceType:
    def check(self, value: Any, field: dict) -> str | None:
        # ChoiceType  "INVALID_CHOICE" if not in field["options"]
        if value not in field.get("options", []):
            return "INVALID_CHOICE"
        return None


class Form:
    def __init__(self, fields: list[dict], types: dict[str, FieldType]):
        self.fields = fields   # [{"key": ..., "type": ..., "required": ..., ...}, ...]
        self.types = types     # {"text": TextType(), "number": NumberType(), ...}
        self.by_key = {}       # {key: field}
        # A bad schema should be caught here.
        # You can add more attributes if you need them.

    def validate(self, answers: dict[str, Any]) -> dict[str, str]:
        for field in self.fields:
            key = field["key"]
            if not field["required"]:
                if answers.get(key) is not None:
                    # Check the value using the field's type
                    function = self.types[field["type"]]
                    results = function(key)
                    if not results:
                        return results
            else:
                if answers.get(key) is None:
                    return (str(key) + " is required")
                else:
                    # Check the value using the field's type
                    function = self.types[field["type"]]
                    results = function(key)
                    if not results:
                        return results

# ---------------- tests (don't edit below) ----------------
def check(name, fn, expected):
    try:
        got = fn()
        print(("PASS " if got == expected else "FAIL ") + name + ("" if got == expected else f"  got {got!r}, expected {expected!r}"))
    except Exception as e:
        print(f"FAIL {name}  {type(e).__name__}: {e}")

def raises(fn):
    try:
        fn()
        return False
    except ValueError:
        return True

TYPES = {"text": TextType(), "number": NumberType(), "choice": ChoiceType(), "boolean": BooleanType()}
FIELDS = [
    {"key": "name",      "type": "text",    "required": True,  "max_length": 50},
    {"key": "age",       "type": "number",  "required": True,  "min": 13},
    {"key": "school",    "type": "text",    "required": False, "max_length": 60},
    {"key": "dietary",   "type": "choice",  "required": False, "options": ["none", "vegan", "halal"]},
    {"key": "in_person", "type": "boolean", "required": True},
]
GOOD = {"name": " Jane ", "age": 20, "school": "UBC", "dietary": "vegan", "in_person": True}

class EmailType:                      # a type the Form has never seen
    def check(self, value, field):
        return None if "@" in value else "INVALID_EMAIL"

check("valid form",       lambda: Form(FIELDS, TYPES).validate(GOOD), {})
check("several errors",   lambda: Form(FIELDS, TYPES).validate(dict(GOOD, name="  ", age=12, dietary="pizza")),
      {"name": "REQUIRED", "age": "TOO_SMALL", "dietary": "INVALID_CHOICE"})
check("bad schema raises", lambda: (raises(lambda: Form([{"key": "x", "type": "nope"}], TYPES)),
                                    raises(lambda: Form([{"key": "x", "type": "text"}, {"key": "x", "type": "text"}], TYPES))), (True, True))
check("plug in a new type", lambda: Form([{"key": "email", "type": "email", "required": True}], {"email": EmailType()}).validate({"email": "jane.ubc.ca"}),
      {"email": "INVALID_EMAIL"})
check("False is an answer, not empty", lambda: Form(FIELDS, TYPES).validate(dict(GOOD, in_person=False)), {})
