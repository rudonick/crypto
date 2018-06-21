const isProdMode = process.env.NODE_ENV === 'production';

module.exports = isProdMode ?
  require('./config/webpack.prod') :
  require('./config/webpack.dev');
