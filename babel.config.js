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
  },
};
