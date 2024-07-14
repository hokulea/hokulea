import Article from '../article';
import Indicators from '../reference/indicators';

import type { TOC } from '@ember/component/template-only';

const IndicatorTokens: TOC = <template>
  <Article @title="Indicators">
    <p>Tokens to express information and feedback. Learn more about
      <a
        href="#"
        data-sb-kind="documentation-foundation-indicators"
        data-sb-story="indicators"
      >indicators</a>.
    </p>

    <Indicators />
  </Article>
</template>;

export default IndicatorTokens;
