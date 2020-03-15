declare module 'style-dictionary' {
  type TransformGroups = 'web' | 'js' | 'scss' | 'css' | 'less' | 'html' | 'android' | 'ios' | 'ios-swift-separate' | 'assets';
  interface FileConfig {
    destination: string;
    format: string;
    filter?: (object: object) => boolean;
    options?: {
      showFileHeader: boolean;
    }
  }

  interface Config {
    include?: string[];
    source: string[];
    platforms: {
      [key: string]: {
        transformGroup: string;
        transforms?: string;
        buildPath: string;
        prefix?: string;
        files: FileConfig[]
      }
    }
  }

  export default class StyleDictionary {
    static extend(config: Config): StyleDictionary;
    buildAllPlatforms(): StyleDictionary;
    buildPlatform(name: string): StyleDictionary;
    cleanAllPlatforms(): StyleDictionary;
    cleanPlatform(name: string): StyleDictionary;
  }
}