import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      'indent': [
        'error', 2,
      ],
      'max-len': [
        'error', {
          code: 60,
        }, {
          ignoreStrings: false,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'comma-dangle': [
        'error', 'always-multiline',
      ],
      'no-trailing-spaces': [
        'error', {
          skipBlankLines: false,
        },
      ],
      'array-bracket-newline': [
        'error', 'always',
      ],
      'object-curly-newline': [
        'error', 'always',
      ],
      'object-curly-spacing': [
        'error', 'always',
      ],
      'object-property-newline': [
        'error', {
          allowAllPropertiesOnSameLine: true,
        },
      ],
    },
  },
];

