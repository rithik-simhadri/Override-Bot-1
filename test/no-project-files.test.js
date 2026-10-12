const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const test = require('node:test');

test('repository has no tracked project files to inspect or repair', () => {
  const trackedFiles = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);

  assert.deepEqual(trackedFiles, []);
});
