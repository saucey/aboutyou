const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const versionInfo = gitDescribeSync({
  dirtyMark: false,
  dirtySemver: false,
});

versionInfo.version = version;
versionInfo.buildTime = new Date().toUTCString();

const file = resolve(__dirname, '..', 'dist', 'browser', 'version.json');

writeFileSync(file, JSON.stringify(versionInfo, null, 2), { encoding: 'utf-8' });

console.log(`Wrote version info ${versionInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
