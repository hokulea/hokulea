import dotenv from 'dotenv';
import FigmaTokenReader, { ReferencerType } from 'figma-token-reader';
import Exporter from './exporter';

dotenv.config();

async function main() {
  // read
  const reader = new FigmaTokenReader({
    referencer: {
      type: ReferencerType.FigmaPlugin,
      plugin: 'style-referencer',
      options: {
        jsonbinFile: process.env.JSONBIN_FILE,
        jsonbinSecret: process.env.JSONBIN_SECRET
      }
    },
    isToken(name) {
      return name.includes('.') && name.includes('/');
    }
  });

  const tokens = await reader.read(
    process.env.FIGMA_FILE!,
    process.env.FIGMA_SECRET!
  );

  const exporter = new Exporter(tokens);
  exporter.export();
  exporter.build();
}

main();
