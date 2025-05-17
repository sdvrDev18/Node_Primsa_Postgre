# Express Validator Detailed Guide (Node.js Setup)

## Overview

This document offers a comprehensive explanation of how to use `express-validator` in a Node.js + Express environment. It includes step-by-step code walkthroughs, answers to common doubts, example request/response flows, best practices, and an extended list of validators and sanitizers.

---

## 📦 Installation

```bash
npm install express-validator
```

Make sure you also have `express` installed and `express.json()` middleware added to parse incoming JSON requests:

```js
const express = require("express");
const app = express();
app.use(express.json());
```

---

## 🧪 Sample Endpoint with Validation

```js
const { body, validationResult } = require("express-validator");

app.post("/product",
  body("name").isString().withMessage("Name must be a string"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({ message: "Product added successfully", data: req.body });
  }
);
```

### 🔍 Explanation

* `body("name")`: Picks the `name` field from `req.body`.
* `.isString()`: Validates that the field is a string.
* `.withMessage()`: Adds a custom message if validation fails.
* `validationResult(req)`: Collects any validation errors triggered by previous middleware.
* `errors.array()`: Returns the validation error list in an array format.

---

## ❌ Example Invalid Request

```json
POST /product
{
  "name": 123
}
```

### Response:

```json
{
  "errors": [
    {
      "msg": "Name must be a string",
      "param": "name",
      "location": "body",
      "value": 123
    }
  ]
}
```

## ✅ Valid Request

```json
{
  "name": "Laptop"
}
```

### Response:

```json
{
  "message": "Product added successfully",
  "data": {
    "name": "Laptop"
  }
}
```

---

## 🛠 Common Validators

### 🔤 Type Validators

* `.isString()` – checks for a string.
* `.isInt()` – checks for an integer.
* `.isFloat()` – checks for a float.
* `.isBoolean()` – checks for boolean value.
* `.isArray()` – checks if the value is an array.

### 📧 Format Validators

* `.isEmail()`
* `.isURL()`
* `.isUUID()`
* `.isMobilePhone(locale)`

### 📏 Length and Range Validators

* `.isLength({ min, max })`
* `.isIn([array])`
* `.isNumeric()`
* `.isAlphanumeric()`
* `.isDate()`

### 🧼 Sanitizers

* `.trim()`
* `.toLowerCase()` / `.toUpperCase()`
* `.escape()` – escapes HTML entities

### 🧾 Example with Multiple Validations

```js
[
  body('name')
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2 }).withMessage("Name should have at least 2 characters"),

  body('email')
    .isEmail().withMessage("Please enter a valid email")
    .normalizeEmail(),

  body('age')
    .isInt({ min: 18 }).withMessage("Age must be 18 or above")
]
```

---

## 🤔 Frequently Asked Questions

### Q: How does it know `name` should be a string?

**A:** The rule `body("name").isString()` explicitly defines that requirement. During request handling, the middleware checks `typeof req.body.name === "string"`.

### Q: What is `errors` in the handler?

**A:** `const errors = validationResult(req)` gives an object containing any validation failures. Calling `errors.array()` provides a structured list of those errors.

### Q: Where should `express.json()` be added?

**A:** It must be added **before** any routes that access `req.body`. Otherwise, the body will be `undefined`.

### Q: What happens if no one sends a response and all middleware call `next()`?

**A:** Express will hang the request. Always ensure at least one handler ends the request with `res.send()` or `res.json()`.

---

## ✅ Best Practices

* Use `.withMessage()` for all validators to help users/debuggers understand errors clearly.
* Chain multiple validations for the same field if needed.
* Use `express.json()` at the start of your server code.
* Validate **early** in your routes to avoid side effects.
* Group field validators into arrays for neatness.

---

## 🧩 Extended Example for Registration

```js
app.post("/register", [
  body("username")
    .isString().withMessage("Username must be a string")
    .isLength({ min: 4 }).withMessage("Minimum 4 characters required"),

  body("email")
    .isEmail().withMessage("Invalid email address"),

  body("age")
    .isInt({ min: 18 }).withMessage("You must be 18 or older")
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({ message: "Registration successful" });
});
```

---

## 🔗 References

* Official Docs: [https://express-validator.github.io/docs](https://express-validator.github.io/docs)
* GitHub: [https://github.com/express-validator/express-validator](https://github.com/express-validator/express-validator)

---

Let me know if you’d like to extend this to cover nested object validation, conditional validation, or reusable validation schemas.
