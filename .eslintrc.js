module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint-config-google",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "object-curly-spacing": [
      2,
      "always"
    ],
    "no-invalid-this": 0
  }
};
