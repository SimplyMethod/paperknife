module.exports = {
  root: true,
  extends: ["custom/next"],
  // settings: {
  //   "import/resolver": {
  //     alias: {
  //       map: [["@", "./src"]],
  //     },
  //   },
  // },
  rules: {
    // FIXME: This should be removed when the issue is fixed
    "import/no-extraneous-dependencies": ["warn", { includeInternal: false }],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowFunctionsWithoutTypeParameters: true,
      },
    ],
  },
};
