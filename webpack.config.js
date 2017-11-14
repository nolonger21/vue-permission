const path = require('path');

function resolve(file) {
  return path.join(__dirname, file);
}

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-permission.js',
    library: 'vuePermission',
  },
};
