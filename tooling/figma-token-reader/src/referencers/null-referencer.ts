import Referencer from 'figma-token-reader/referencers/referencer';

export default class NullReferencer implements Referencer {
  async setup() {
    // void implementation
  }

  find(_name: string, _type: string): string | undefined {
    return undefined;
  }
}
