import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

import Application from 'ember-aria-navigator-test-app/app';
import config from 'ember-aria-navigator-test-app/config/environment';
import setupSinon from 'ember-sinon-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

setupSinon();

start();
