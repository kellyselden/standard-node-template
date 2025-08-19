import mocha from './helpers/mocha.cjs';
import chai from './helpers/chai.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  emberInit as _emberInit,
  setUpBlueprintMocha
} from 'ember-cli-update-test-helpers';

const { describe, it } = mocha;
const { expect } = chai;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
