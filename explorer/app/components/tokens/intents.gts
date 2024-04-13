import Page from '../page';
import Intents from '../reference/intents';

import type { TOC } from '@ember/component/template-only';

const IntentTokens: TOC = <template>
  <Page @title="Intents">
    Tokens to express user intentions. Learn more about [intents](../foundation/intents.md).

    <Intents />
  </Page>
</template>

export default IntentTokens;
