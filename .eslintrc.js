module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2022: true
    },
    parserOptions: {
        ecmaVersion: 13
    },
    rules: {
        'no-cond-assign': 'off',
        'no-irregular-whitespace': 'error',
        'no-unexpected-multiline': 'error',
        'valid-jsdoc': ['error', {
            requireParamDescription: false,
            requireReturnDescription: false,
            requireReturn: false,
            prefer: {returns: 'return'}
        }],
        'curly': ['error', 'multi-line'],
        'guard-for-in': 'error',
        'no-caller': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-invalid-this': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-with': 'error',
        'prefer-promise-reject-errors': 'error',
        'no-unused-vars': ['error', {args: 'none'}],
        'array-bracket-newline': 'off',
        'array-bracket-spacing': ['error', 'never'],
        'array-element-newline': 'off',
        'block-spacing': ['error', 'never'],
        'brace-style': 'error',
        'camelcase': ['error', {properties: 'never'}],
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'comma-dangle': 'error',
        'computed-property-spacing': 'error',
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'indent': [
            'error', 4, {
                CallExpression: {
                    arguments: 4
                },
                FunctionDeclaration: {
                    body: 1,
                    parameters: 4
                },
                FunctionExpression: {
                    body: 1,
                    parameters: 4
                },
                MemberExpression: 4,
                ObjectExpression: 1,
                SwitchCase: 1,
                ignoredNodes: [
                    'ConditionalExpression'
                ]
            }
        ],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'linebreak-style': 'error',
        'max-len': ['error', {
            code: 80,
            tabWidth: 4,
            ignoreUrls: true,
            ignorePattern: 'goog\.(module|require)'
        }],
        'new-cap': 'error',
        'no-array-constructor': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-multiple-empty-lines': ['error', {max: 2}],
        'no-new-object': 'error',
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': 'error',
        'one-var': ['error', {
            var: 'never',
            let: 'never',
            const: 'never'
        }],
        'operator-linebreak': ['error', 'after'],
        'padded-blocks': ['error', 'never'],
        'quote-props': ['error', 'consistent'],
        'quotes': ['error', 'single', {allowTemplateLiterals: true}],
        'semi': ['error', 'always'],
        'semi-spacing': 'error',
        'semi-style': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': 'error',
        'switch-colon-spacing': 'error',
        'template-tag-spacing': 'error',
        'unicode-bom': 'error',
        'wrap-regex': 'error'
    }
};
