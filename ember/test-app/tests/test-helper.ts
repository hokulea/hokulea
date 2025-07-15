import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

import Application from '@hokulea/ember-test-app/app';
import config from '@hokulea/ember-test-app/config/environment';

import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
setApplication(Application.create(config.APP));

// eslint-disable-next-line import-x/namespace
setup(QUnit.assert);

start();

// eslint-disable-next-line import-x/namespace
QUnit.done(async function () {
  forceModulesToBeLoaded();
  await sendCoverage();
});
