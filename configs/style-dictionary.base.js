function isOrdinalScalingToken(name) {
  return name.match(/[+-]?\d+$/);
}

const modes = ['light', 'dark'];

module.exports = {
  include: ['tokens/**/*.transient.json'],
  source: [
    // this is saying find any files in the tokens folder
    // that does not have .dark or .light, but ends in .json
    `tokens/**/!(*.${modes.join(`|*.`)}).json`
  ],
  platforms: {
    web: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'name/color-scaling'
      ],
      buildPath: 'build/',
      files: [
        {
          format: 'css/variables',
          destination: 'base.css',
          options: {
            outputReferences: true,
            showFileHeader: false
          },
          filter(token) {
            return !token.colorScheme;
          }
        }
      ]
    }
  },
  transform: {
    'name/color-scaling': {
      type: 'name',
      matcher(token) {
        return (
          token.path.includes('color') && isOrdinalScalingToken(token.name)
        );
      },
      transformer(token) {
        return token.path.join('-');
      }
    }
  },
  modes
};
