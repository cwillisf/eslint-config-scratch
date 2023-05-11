// Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    plugins: ['import'],
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    env: {
        commonjs: true,
        es6: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2018,
        requireConfigFile: false,
        sourceType: 'module',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        }
    },
    rules: {
        'import/no-amd': [2],
        'indent': [2, 4],
        'linebreak-style': [2, 'unix'],
        'max-len': [2, {
            code: 118, // good for viewing diffs on GitHub
            tabWidth: 4,
            ignoreUrls: true
        }],
        'no-trailing-spaces': [2],
        'unicode-bom': [2, 'never'],
    },
    overrides: [
        {
            files: ['*.cjs', '*.js', '*.mjs', '*.jsx'],
            rules: {
                'require-jsdoc': [2],
                'valid-jsdoc': [2, {
                    prefer: {
                        arg: 'param',
                        argument: 'param',
                        class: 'constructor',
                        return: 'return',
                        virtual: 'abstract',
                    },
                    preferType: {
                        Boolean: 'boolean',
                        Number: 'number',
                        Object: 'object',
                        String: 'string',
                    },
                    requireReturn: false,
                    requireReturnType: true,
                    requireParamDescription: true,
                    requireReturnDescription: true,
                }],
            }
        },
        {
            files: ['*.cts', '*.mts', '*.ts', '*.tsx'],
            plugins: [
                '@typescript-eslint',
                'tsdoc',
            ],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                // Some rules are not compatible with TypeScript, but have TypeScript equivalents

                'no-redeclare': [0],
                '@typescript-eslint/no-redeclare': [2],

                'no-use-before-define': [0],
                '@typescript-eslint/no-use-before-define': [2],

                'no-unused-vars': [0],
                '@typescript-eslint/no-unused-vars': [2],

                // Other rules
                'tsdoc/syntax': [2],
            }
        },
    ],
};
