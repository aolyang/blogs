module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true,
    },
    plugins: ['simple-import-sort', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'next',
        'next/core-web-vitals',
    ],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        quotes: ['error', 'single', { avoidEscape: true }],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                disallowTypeAnnotations: false,
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
                    ['^react', '^@?\\w', '^\\u0000'],
                    ['^'],
                    ['^\\.'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
        'react/prop-types': 0,
        '@typescript-eslint/no-unused-vars': 0,
        'react/no-unescaped-entities': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
}
