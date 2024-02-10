import Page from '../page';
import GlobalSizing from '../reference/global-sizing';
import LocalSizing from '../reference/local-sizing';
import PlainToken from '../token/plain';
import TokenList from '../token-list';

import type { TOC } from '@ember/component/template-only';

const IndicatorTokens: TOC = <template>
  <Page @title="Sizing">
    Learn more about [hokuleas sizing system](../foundation/sizing.md).

    <TokenList>
      <PlainToken @name="--sizing-ratio"/>
      <PlainToken @name="--sizing-factor"/>
    </TokenList>

    <h2>Global Sizing</h2>

    <GlobalSizing/>

    <h2>Local Sizing</h2>

    <LocalSizing/>

  </Page>
</template>

export default IndicatorTokens;
