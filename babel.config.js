module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%', 'not ie < 11'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    production: {
      ignore: [
        '**/*.test.js',
      ],
      presets: [
        'minify',
      ],
    },
    test: {
      plugins: [
        // This fixes an issue with import resolution and babel-jest.
        // Prior to adding this plugin we were getting syntax errors with `import` statements.
        // See https://github.com/facebook/jest/issues/6913#issuecomment-421618932.
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
};
