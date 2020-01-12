import Entity from './entity';
// @ts-ignore
import cc from 'color-converter';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import { SyncOptions } from './package';

interface WriterOptions extends SyncOptions {
  directory: string,
}

export default class Writer {
  private entities: Map<string, Entity>;
  private options: WriterOptions;

  private tokens: Entity[];
  private components: Entity[];

  constructor(entites: Map<string, Entity>, options: WriterOptions) {
    this.entities = entites;
    this.tokens = Array.from(this.entities.values()).filter(entity => entity.type === 'token');
    this.components = Array.from(this.entities.values()).filter(entity => entity.type === 'component');
    this.options = { color: 'hex', colorAlpha: 'rgb', contextPrefix: '$', ...options };
  }

  save() {
    this.write('tokens', this.tokens);
    this.write('components', this.components);
  }

  private write(section: string, entites: Entity[]) {
    // collect files and entites
    const files: Map<string, Set<Entity>> = new Map();
    for (const entity of entites) {
      if (!files.has(entity.path)) {
        files.set(entity.path, new Set());
      }

      files.get(entity.path)?.add(entity);
    }

    // create file structure
    for (const [file, entries] of files.entries()) {
      const contents = {};
      for (const entry of entries) {
        const contexts = this.getContexts(entry);
        if (contexts.length > 0) {
          for (const context of contexts) {
            set(contents, [...entry.key.split('.'), `$${context}`], `${this.getRefName(entry)}.${context}`);
          }
        } else {
          set(contents, entry.key.split('.').map(name => name.replace(this.options.contextPrefix ?? '', '')), this.getValue(entry));
        }
      }

      this.writeFile(section, file, contents);
    }
  }

  private getContexts(entity: Entity) {
    if (!(entity.type === 'component' && entity.reference)) {
      return [];
    }

    return this.tokens
      .filter(entry => entry.id.startsWith(`${entity.reference}.${this.options.contextPrefix}`))
      .map(entry => entry.id.replace(`${entity.reference}.${this.options.contextPrefix}`, ''));
  }

  private writeFile(section: string, file: string, data: object) {
    const target = path.join(this.options.directory, section, file.replace(/\./g, '/')) + '.yml';
    const contents = yaml.safeDump(data);
    const parent = path.dirname(target);

    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }

    fs.writeFileSync(target, contents);
  }

  private getValue(entity: Entity): string {
    if (entity.type === 'token' && entity.reference) {
      const ref = this.entities.get(entity.reference);
      if (ref) {
        return this.getValue(ref);
      }
      console.log('Reference does not exist:', entity.reference);
      return '';
    }

    if (entity.reference) {
      return this.getRefName(entity);
    }

    if (entity.color) {
      const c = entity.color;
      const color = cc.fromRGBA(c.r * 255, c.g * 255, c.b * 255, c.a);

      if (c.visible === false) {
        return 'transparent';
      }

      else if (color.alpha === 1) {
        switch (this.options.color) {
          case 'hex':
            return color.toHex();

          case 'rgb':
            return color.toRGB();

          case 'hsl':
            return color.toHSL();
        }
      }

      switch (this.options.colorAlpha) {
        case 'rgb':
          return color.toRGBA();

        case 'hsl':
          return color.toHSLA();
      }
    }

    return entity.value ?? '';
  }

  private getRefName(entity: Entity) {
    return `$${entity.reference?.replace('t.', '').replace(/\//g, '.')}`;
  }
}

function set(obj: object, keyPath: string[], value: any) {
  const lastKeyIndex = keyPath.length - 1;
  for (var i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i] as keyof object;
    if (!(key in obj)) {
      // @ts-ignore
      obj[key] = {}
    }
    obj = obj[key];
  }

  // @ts-ignore
  if (typeof obj[keyPath[lastKeyIndex]] !== 'object') {
    // @ts-ignore
    obj[keyPath[lastKeyIndex]] = value;
  }
}