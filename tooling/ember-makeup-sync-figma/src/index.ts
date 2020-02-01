import dotenv from 'dotenv';
import { Api as FigmaClient } from 'figma-api';
import importCwd from 'import-cwd';
import fetch from 'node-fetch';
import { Package, SyncOptions } from './package';
import Parser from './parser';
import Writer from './writer';

dotenv.config();

const theme = importCwd('./package') as Package;

main();

async function main() {
  // read figma
  const figmaClient = new FigmaClient({
    personalAccessToken: process.env.FIGMA_SECRET!
  });

  const file = await figmaClient.getFile(process.env.FIGMA_FILE!);

  // read references from jsonbin.io
  const response = await fetch(`https://api.jsonbin.io/b/${process.env.JSONBIN_FILE}`, {
    headers: {
      'secret-key': process.env.JSONBIN_SECRET!
    }
  });
  const references = await response.json();

  const options: SyncOptions = theme.makeup.sync ?? {};

  const parser = new Parser(file, references, options);
  parser.parse();

  const writer = new Writer(parser.entities, {
    ...options,
    directory: process.cwd()
  });

  writer.save();
}