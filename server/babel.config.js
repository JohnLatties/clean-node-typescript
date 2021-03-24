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
          '@crosscutting': './src/crosscutting',
          '@presentation': './src/presentation'
        }
      }
    ]
  ],
  ignore: ['**/*.test.ts', '**/*.spec.ts']
}
