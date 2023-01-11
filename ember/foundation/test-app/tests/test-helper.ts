import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

import Application from '@hokulea/ember-foundation-test-app/app';
import config from '@hokulea/ember-foundation-test-app/config/environment';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
