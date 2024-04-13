import { svgJar } from 'ember-svg-jar/helpers/svg-jar';

import styles from './logo.css';

import type { TOC } from '@ember/component/template-only';

const Base: TOC<{ Args: { logo: string } }> = <template>
  {{svgJar @logo class=styles.logo}}
</template>;

const CssLogo = <template><Base @logo='css' /></template>;

const FigmaLogo = <template><Base @logo='figma' /></template>;

const StyleDictionaryLogo = <template><Base @logo='style-dictionary' /></template>;

export { CssLogo, FigmaLogo, StyleDictionaryLogo };
