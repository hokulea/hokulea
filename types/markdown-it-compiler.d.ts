type PluginDescriptor = string | [string, object];

export interface MarkdownItCompilerConfig {
  preset?: 'commonmark' | 'default' | 'zero';
  /**
   * MarkdownIt Options
   * 
   * {@link https://markdown-it.github.io/markdown-it/#MarkdownIt.new}
   */
  options?: {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    typographer?: boolean;
    quotes?: string;
    highlight?: (str: string, lang: string) => string;
  };
  plugins?: PluginDescriptor[];
  /** Pass down the markdown it instance for precise configuration */
  configure?: (md: object) => void;
  format?: (contents: {
    attributes: Record<string, string>;
    toc: Array<{ content: string; slug: string; level: number }>;
    body: string;
    html: string;
  }) => string | object;
}

export default class MarkdownItCompiler { 
  constructor(config: MarkdownItCompilerConfig);

  compile(source: string): string;
}