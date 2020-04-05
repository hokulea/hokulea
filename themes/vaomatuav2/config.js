module.exports = {
  source: ['properties/**/*.json'],
  platforms: {
    web: {
      transformGroup: 'theemo/css',
      buildPath: 'build/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            showFileHeader: false
          },
          filter(token) {
            return !token.colorScheme;
          }
        },
        {
          format: 'css/variables',
          destination: 'light.css',
          options: {
            showFileHeader: false
          },
          filter(token) {
            return token.colorScheme === 'light';
          }
        },
        {
          format: 'css/variables',
          destination: 'dark.css',
          options: {
            showFileHeader: false
          },
          filter(token) {
            return token.colorScheme === 'dark';
          }
        }
      ]
    }
  },
  transforms: {
    name: {
      matcher(property) {
        return property.name.includes('$');
      },
      transformer(property) {
        property.path.pop();

        const index = property.name.indexOf('$')
        return property.name.slice(0, index);
      }
    }
  }
}