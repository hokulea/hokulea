import { type TOC } from '@ember/component/template-only';
import { htmlSafe } from '@ember/template';

import styles from '@hokulea/core/graphics.module.css';

function getInitials(name: string) {
  const parts = name.split(' ');

  if (parts.length > 1) {
    return `${parts[0]?.[0]} ${parts.at(-1)?.[0]}`;
  }

  if (parts.length === 1) {
    return name[0];
  }

  return '';
}

const UserIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44.05 44.05 0 0 1 44 44m60 8A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88.09 88.09 0 0 0-91.47-87.93C77.43 41.89 39.87 81.12 40 128.25a87.65 87.65 0 0 0 22.24 58.16A79.7 79.7 0 0 1 84 165.1a4 4 0 0 1 4.83.32a59.83 59.83 0 0 0 78.28 0a4 4 0 0 1 4.83-.32a79.7 79.7 0 0 1 21.79 21.31A87.62 87.62 0 0 0 216 128"/></svg>`;

interface AvatarSignature {
  Element: HTMLSpanElement;
  Args: {
    src?: string | null;
    name?: string;
  };
}

export const Avatar: TOC<AvatarSignature> = <template>
  <span class={{styles.avatar}} data-test-avatar ...attributes>
    {{#if @src}}
      <img src={{@src}} alt={{@name}} />
    {{else if @name}}
      {{getInitials @name}}
    {{else}}
      {{htmlSafe UserIcon}}
    {{/if}}
  </span>
</template>;
