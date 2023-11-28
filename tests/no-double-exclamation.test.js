import test from 'ava';
import {
  noDoubleExclamation,
} from '../rules/no-double-exclamation.js';
import {
  Linter,
} from 'eslint';

const invalidItems = [
  '0',
  '""',
  'null',
  'undefined',
  'NaN',
  'expression',
].map((item) => {
  return {
    code: `!!${item}`,
    errors: [
      {
        message: 'Use Boolean() to cast to a boolean',
      },
    ],
    output: `Boolean(${item})`,
  };
});

test.beforeEach(t => {
  t.context = {
    linter: new Linter(),
  };
});

test(
  'noDoubleExclamation should not report errors for valid items',
  t => {
    const {
      linter,
    } = t.context;

    linter.defineRule(
      'noDoubleExclamation',
      noDoubleExclamation,
    );

    linter.verify(
      'Boolean(expression)',
      {
        rules: {
          noDoubleExclamation: 'error',
        },
      },
    );

    t.is(
      linter.verify(
        'Boolean(expression)',
        {
          rules: {
            noDoubleExclamation: 'error',
          },
        },
      ).length,
      0);
  });

invalidItems.forEach((item) => {
  test(
    `noDoubleExclamation should report an error for ${item.code}`,
    t => {
      const {
        linter,
      } = t.context;

      linter.defineRule('noDoubleExclamation', noDoubleExclamation);

      const {
        message, fix,
      } = linter.verify(
        item.code,
        {
          rules: {
            noDoubleExclamation: 'error',
          },
        },
      )[0];

      t.deepEqual(message, item.errors[0].message);
      t.deepEqual(fix.text, item.output);
    });
});
