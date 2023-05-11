module.exports = {
    overrides: [
        {
            files: ['**/{__tests__,__mocks__}/**/*', '**/*.{spec,test}.*'],
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
            env: {
                'jest': true,
                'jest/globals': true,
            },
        },
    ],
};
