import Article from '../article';
import GlobalSizing from '../reference/global-sizing';
import LocalSizing from '../reference/local-sizing';
import PlainToken from '../token/plain';
import TokenList from '../token-list';

import type { TOC } from '@ember/component/template-only';

const IndicatorTokens: TOC = <template>
  <Article @title="Sizing">
    <p>Learn more about
      <a href="#" data-sb-kind="documentation-foundation-sizing" data-sb-story="sizing">hokulea's
        sizing system</a>.
    </p>

    <TokenList>
      <PlainToken @name="--sizing-ratio" />
      <PlainToken @name="--sizing-factor" />
    </TokenList>

    <h2>Global Sizing</h2>

    <GlobalSizing />

    <h2>Local Sizing</h2>

    <LocalSizing />

  </Article>
</template>;

export default IndicatorTokens;
