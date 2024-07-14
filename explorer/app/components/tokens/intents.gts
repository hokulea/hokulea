import Article from '../article';
import Intents from '../reference/intents';

import type { TOC } from '@ember/component/template-only';

const IntentTokens: TOC = <template>
  <Article @title="Intents">
    <p>Tokens to express user intentions. Learn more about
      <a
        href="#"
        data-sb-kind="documentation-foundation-intents"
        data-sb-story="intents"
      >intents</a>.
    </p>

    <Intents />
  </Article>
</template>;

export default IntentTokens;
