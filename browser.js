module.exports = {
    extends: [require.resolve('./index.js')],
    env: {
        browser: true,
    },
    rules: {
        'import/no-commonjs': 'error',
        'import/no-nodejs-modules': 'error',
    },
    overrides: [
        {
            files: ['*.cjs'],
            rules: {
                'import/no-commonjs': 'off'
            }
        },
    ],
};
