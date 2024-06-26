module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Compile Exported Namespaces
      '@babel/plugin-proposal-export-namespace-from',
      // Use Absolute Imports
      ['module-resolver', { alias: { src: './src' } }]
    ]
  };
};
