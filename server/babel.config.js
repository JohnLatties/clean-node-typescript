module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@infra': './src/infra',
          '@domain': './src/domain',
          '@crosscutting': './src/crosscutting'
        }
      }
    ]
  ],
  ignore: ['**/*.test.ts', '**/*.spec.ts']
}
