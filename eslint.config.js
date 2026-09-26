const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
