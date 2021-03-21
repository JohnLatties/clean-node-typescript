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
          '@modules': './src/modules',
          '@config': './src/config',
          '@framework': './src/framework',
          '@infrastructure': './src/infrastructure',
          '@controllers': './src/controllers'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
