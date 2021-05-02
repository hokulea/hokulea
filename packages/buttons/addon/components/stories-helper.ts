export function makeButtonArgTypes({ label = 'Button' }) {
  return {
    label: {
      name: 'Label',
      defaultValue: label,
      control: { type: 'text' }
    },
    size: {
      name: 'Size',
      defaultValue: '0',
      control: { type: 'range', min: -2, max: 4, step: 1 }
    }
  };
}
