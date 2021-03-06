// Configs
const { mode, config } = require('./project.config');

module.exports = (type) => {
  return {
    /**
     * Development
     */
    development: {
      plugins: [
        require('postcss-inline-svg'),
        require('autoprefixer')({
          overrideBrowserslist: ['> 0.1%', 'ie 11'],
        }),
        require('postcss-sort-media-queries')({
          sort: 'desctop-first'
        }),
        config[mode()].css[type].min
          ? require('cssnano')({
              preset: ['default', { discardComments: { removeAll: true } }],
            })
          : false,
      ].filter(Boolean),
    },

    /**
     * Production
     */
    production: {
      plugins: [
        require('postcss-inline-svg'),
        require('postcss-sort-media-queries')({
          sort: 'desctop-first'
        }),
        require('autoprefixer')({
          overrideBrowserslist: ['> 0.1%', 'ie 11'],
        }),
        config[mode()].css[type].min
          ? require('cssnano')({
              preset: ['default', { discardComments: { removeAll: true } }],
            })
          : false,
      ].filter(Boolean),
    },
  }
};
