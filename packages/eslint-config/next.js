const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],

    "ignorePatterns" : ["postcss.config.js", "tailwind.config.js", "next.config.js", "babel.config.js", "jest.config.js", "tsconfig.json", "next-env.d.ts", "app.d.ts", ".eslintrc.js"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "*.ts",
                "*.tsx"
            ],
            "parserOptions": {
                "sourceType": "project",
            }
        }
    ],
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/quotes": ["error", "double"],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/indent": "off",
    }
}
