import Entity from 'entity';
import { Node, StylesMap } from 'figma-api';
import { GetFileResult } from 'figma-api/lib/api-types';
import { References, RefNode, StyleRef } from './references';

type CompositeNode = Node & {
  children: Node[];
}

function isCompositeNode(node: Node) {
  return ['DOCUMENT', 'FRAME', 'GROUP', 'CANVAS', 'BOOLEAN', ' BOOLEAN_OPERATION', 'COMPONENT'].includes(node.type);
}

type LayerNode = Node<'RECTANGLE'>;

export default class Parser {
  entities: Map<string, Entity> = new Map();

  private file: GetFileResult;
  private references: References;

  constructor(file: GetFileResult, references: References) {
    this.file = file;
    this.references = references;
  }

  parse() {
    this.parseNode(this.file.document);
  }

  private parseNode(node: Node) {
    switch (node.type) {
      case 'TEXT':
        this.parseTextNode(node as Node<'TEXT'>);
        break;

      case 'RECTANGLE':
      case 'ELLIPSE':
        this.parseLayerNode(node as LayerNode);
        break;
    }

    if (isCompositeNode(node)) {
      for (const child of (node as CompositeNode).children) {
        this.parseNode(child);
      }
    }
  }

  private parseTextNode(node: Node<'TEXT'>) {
    if (this.isEntityName(node.name)) {
      const entity = this.createEntity(node.name);

      entity.value = node.characters;

      this.entities.set(entity.id, entity);
    }
  }

  private parseLayerNode(node: LayerNode) {
    if (node.styles) {
      for (const type of Object.keys(node.styles)) {
        const id = node.styles[type as keyof StylesMap];
        const style = this.getStyle(id);

        if (this.isEntityName(style.name)) {
          const entity = this.createEntity(style.name);
          const reference = this.findReference(style.name, type.toLowerCase());

          // see if we have a reference
          if (reference) {
            entity.reference = reference;
          }

          // anyway look for the value
          else {
            const key = `${type.toLowerCase()}s` as keyof LayerNode;
            if (key === 'fills' && node[key]) {
              entity.color = node[key][0].color;
            }
          }

          this.entities.set(entity.id, entity);
        }
      }
    }
  }

  private getStyle(id: string) {
    return this.file.styles[id];
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
    const type = id.startsWith('t.') ? 'token' : 'component';
    const name = id.replace(/^(c|t)\./, '');
    const index = name.indexOf('/');
    const path = name.slice(0, index);
    const key = name.slice(index + 1).replace('/', '.');

    return {
      type,
      path,
      key,
      id
    };
  }

  private isEntityName(name: string) {
    return (name.startsWith('c.') || name.startsWith('t.')) && name.includes('/');
  }
}