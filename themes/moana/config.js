function isOrdinalScalingToken(name) {
  return name.match(/[+-]?\d+$/);
}

const modes = ['light', 'dark'];

module.exports = {
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
        'name/color-scaling',
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
            return !token.colorScheme && !token.filePath.startsWith('tokens/transient');
          }
        }
      ]
    }
  },
  transform: {
    'name/color-scaling': {
      type: 'name',
      matcher(token) {
        // console.log(token);
        // return token.path.includes('color') && token.path.includes('palette');
        return token.path.includes('color') && isOrdinalScalingToken(token.name);
      },
      transformer(token) {
        // console.log(token);
        return token.path.join('-');
      }
    }
  }
}