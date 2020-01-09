module.exports = {
  babel: {
    // asyncToPromises: true,
    babelrc: true,
    // configFile: false,
    // jsx: 'react',
    // minimal: false,
    // objectAssign: 'myAssign',
  },
  banner: false,
  bundleNodeModules: true,
  // env: { NODE_ENV: 'develope' },
  // extendConfig: () => {},
  // extendRollupConfig: () => {},
  // externals: [],
  globals: {
    vue: 'Vue',
  },
  input: 'src/Lazyload.vue',
  output: {
    dir: 'dist',
    extractCSS: false,
    // fileName: '[name][suffix].js',
    format: ['cjs-min', 'es-min', 'umd-min'],
    minify: true,
    moduleName: 'VueLazyloadPic',
    sourceMap: true,
    sourceMapExcludeSources: true,
    target: 'browser',
  },

  presets: ['@vue/babel-preset-jsx'],
  // plugins: {
  //   vue: true,
  // },
  // resolvePlugins: {},
};
