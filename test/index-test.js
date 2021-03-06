'use strict';

const { describe } = require('./helpers/mocha');
const { expect } = require('./helpers/chai');
const path = require('path');
const {
  emberInit: _emberInit,
  setUpBlueprintMocha
} = require('ember-cli-update-test-helpers');

const fixturesPath = path.resolve(__dirname, 'fixtures');

async function emberInit({
  args = []
}) {
  return await _emberInit({
    args: [
      '-sn',
      ...args
    ]
  });
}

describe(function() {
  this.timeout(5e3);

  // eslint-disable-next-line mocha/no-setup-in-describe
  setUpBlueprintMocha.call(this);

  it('works', async function() {
    let cwd = await emberInit({
      args: [
        '-b',
        this.blueprintPath,
        '--name',
        '@my-scope/my-project'
      ]
    });

    expect(path.join(cwd, 'README.md'))
      .to.be.a.file()
      .and.equal(path.join(fixturesPath, 'README.md'));
  });
});
