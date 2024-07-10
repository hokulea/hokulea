import Page from '../page';
import Indicators from '../reference/indicators';

import type { TOC } from '@ember/component/template-only';

const IndicatorTokens: TOC = <template>
  <Page @title="Indicators">
    Tokens to express information and feedback. Learn more about
    [indicators](../foundation/indicators.md).

    <Indicators />
  </Page>
</template>;

export default IndicatorTokens;
