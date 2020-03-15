import Entity from 'entity';
import { Node, StylesMap, Style } from 'figma-api';
import { GetFileResult } from 'figma-api/lib/api-types';
import { References, RefNode, StyleRef } from './references';
import { SyncOptions } from './package';

type CompositeNode = Node & {
  children: Node[];
}

function isCompositeNode(node: Node) {
  return ['DOCUMENT', 'FRAME', 'GROUP', 'CANVAS', 'BOOLEAN', ' BOOLEAN_OPERATION', 'COMPONENT'].includes(node.type);
}

function isVectorNode(node: Node) {
  return ['VECTOR', 'BOOLEAN', 'BOOLEAN_OPERATION', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'RECTANGLE', 'TEXT'].includes(node.type);
}

export default class Parser {
  entities: Map<string, Entity> = new Map();

  private file: GetFileResult;
  private references: References;
  private options: SyncOptions;

  constructor(file: GetFileResult, references: References, options?: SyncOptions) {
    this.file = file;
    this.references = references;
    this.options = options ?? {
      contextPrefix: '$'
    };
  }

  parse() {
    this.parseNode(this.file.document);
  }

  private parseNode(node: Node) {
    // if (node.type === 'TEXT') {
    //   this.parseTextNode(node as Node<'TEXT'>);
    // }

    if (isVectorNode(node)) {
      this.parseVectorNode(node as Node<'VECTOR'>);
    }

    if (isCompositeNode(node)) {
      for (const child of (node as CompositeNode).children) {
        this.parseNode(child);
      }
    }
  }

  // private parseTextNode(node: Node<'TEXT'>) {
  //   if (this.isEntityName(node.name)) {
  //     const entity = this.createEntity(node.name);

  //     entity.value = node.characters;

  //     this.entities.set(entity.id, entity);
  //   }
  // }

  private parseVectorNode(node: Node<'VECTOR'>) {
    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const id = node.styles[type as keyof StylesMap];
        const style = this.getStyle(id);

        if (this.isEntityName(style.name)) {
          const entity = this.createEntity(style.name);
          entity.description = style.description;
          const reference = this.findReference(style.name, type.toLowerCase());

          // see if we have a reference
          if (reference) {
            entity.reference = this.getEntityName(reference);
          }

          // anyway look for the value
          else {
            const key = `${type.toLowerCase()}s` as keyof Node<'VECTOR'>;
            if (key === 'fills' && node[key]) {
              // @ts-ignore
              entity.color = { ...node[key][0].color, visible: node[key][0].visible ?? true };
            }
          }
          this.entities.set(entity.id, entity);
        }
      }
    }
  }

  private getStyle(id: string) {
    return this.file.styles[id] as Style & {description: string};
  }

  private findReference(to: string, type: string) {
    const nodeRef = this.references.nodes.find(node => {
      return node[type as keyof RefNode] &&
        (node[type as keyof RefNode] as StyleRef)?.to.name === to;
    });

    if (nodeRef) {
      return (nodeRef[type as keyof RefNode] as StyleRef)?.from.name;
    }

    return undefined;
  }

  private createEntity(id: string): Entity {
    id = this.getEntityName(id);
    const type = id.startsWith('.') ? 'token' : 'component';
    const name = id.replace(/^(c|t)\./, '');
    const slashIndex = name.indexOf('/');
    const path = name.slice(0, slashIndex);
    let key = name.slice(slashIndex + 1).replace('/', '.');
    const contextIndex = key.indexOf(this.options.contextPrefix!);
    const context = contextIndex === -1 ? 'base' : key.slice(contextIndex + 1);
    key = key.slice(0, contextIndex).replace(/\.$/, '');

    return {
      type,
      path,
      key,
      id,
      context
    };
  }

  private getEntityName(name: string) {
    if (this.options.transforms) {
      for (const [key, value] of Object.entries(this.options.transforms)) {
        name = name.replace(key, value);
      }
    }

    return name.replace(/\s/, '');
  }

  private isEntityName(name: string) {
    name = this.getEntityName(name);
    return name.includes('.') && name.includes('/');
  }
}