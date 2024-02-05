// /** @type {import("eslint").Linter.Config} */
// module.exports ={
//   // "extends": "next",
//   //    "extends": [
//   //       "standard-with-typescript",
//   //       "plugin:react/recommended"
//   //   ],
//   // "ignorePatterns" : ["**/*.js"],
//   // overrides: [
//   //   {
//   //     files: ["*.ts", "*.tsx"],
//   //     parserOptions: {
//   //       sourceType: "project"
//   //     }
//   //   }
//   // ],
//   // "root": true,
//   //   "rules": {
//   //       "@typescript-eslint/quotes": ["error", "double"],
//   //       "react/react-in-jsx-scope": "off",
//   //       "@typescript-eslint/explicit-function-return-type": "off",
//   //       "@typescript-eslint/space-before-function-paren": "off",
//   //       "@typescript-eslint/no-confusing-void-expression": "off",
//   //       "@typescript-eslint/no-floating-promises": "off",
//   //       "@typescript-eslint/strict-boolean-expressions": "off",
//   //       "@typescript-eslint/consistent-type-definitions": "off",
//   //       "@typescript-eslint/indent": "off",
//   //   }
// }


/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-redeclare": "off"
  }
}
