import dotenv from 'dotenv';
import { Api as FigmaClient } from 'figma-api';
import Parser from './parser';
import fetch from 'node-fetch';
import Writer from './writer';

dotenv.config();

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

  const parser = new Parser(file, references);
  parser.parse();

  const writer = new Writer(parser.entities, {
    directory: process.cwd()
  });

  writer.save();
}