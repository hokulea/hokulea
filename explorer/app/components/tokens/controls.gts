import Page from '../page';
import ColorToken from '../token/color';
import DimensionToken from '../token/dimension';
import StrokeToken from '../token/stroke';
import TokenList from '../token-list';

import type { TOC } from '@ember/component/template-only';

const Card: TOC = <template>
  <Page @title="Controls">
    <TokenList>
      <StrokeToken @name="--control-border"/>
      <ColorToken @name="--control-background"/>
      <ColorToken @name="--control-text"/>
      <ColorToken @name="--control-placeholder"/>
      <ColorToken @name="--control-accent"/>
    </TokenList>

    <h2>Disabled</h2>

    <TokenList>
      <ColorToken @name="--control-disabled-background"/>
      <ColorToken @name="--control-disabled-text"/>
    </TokenList>

    <h2>Focus</h2>

    <TokenList>
      <StrokeToken @name="--control-focus-stroke"/>
      <DimensionToken @name="--control-focus-stroke-offset"/>
    </TokenList>

    <h2>Hover</h2>

    <TokenList>
      <ColorToken @name="--control-hover-background"/>
    </TokenList>

    <h2>Selected</h2>

    <TokenList>
      <ColorToken @name="--control-selected-background"/>
    </TokenList>
  </Page>
</template>

export default Card;
