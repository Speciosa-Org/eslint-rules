export const noDoubleExclamation = {
  meta: {
    fixable: 'code',
    type: 'suggestion',
    docs: {
      description: 'Disallow double exclamation points',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create: function (context) {
    return {
      UnaryExpression(node) {
        const isDoubleExclamation = node.operator === '!' &&
          node.argument.type === 'UnaryExpression' &&
          node.argument.operator === '!';

        if (isDoubleExclamation === false) {
          return;
        }

        context.report({
          node,
          message: 'Use Boolean() to cast to a boolean',
          fix: function (fixer) {
            const sourceCode = context.getSourceCode();
            const argumentSource = sourceCode.getText(
              node.argument.argument,
            );
            return fixer.replaceText(node, `Boolean(${argumentSource})`);
          },
        });
      },
    };
  },
};
