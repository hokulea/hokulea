import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';

// import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/addon-test-support';
import TestApp from '#app/app.ts';

export function start() {
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: '#ember-testing'
    })
  );

  // eslint-disable-next-line import-x/namespace
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}

// // eslint-disable-next-line import-x/namespace
// QUnit.done(async function () {
//   forceModulesToBeLoaded();
//   await sendCoverage();
// });
