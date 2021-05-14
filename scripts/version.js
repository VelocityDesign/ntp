const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd());
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const MANIFEST_PATH = path.join(
  ROOT,
  'extensions',
  'official',
  'manifest.json'
);

const version = process.argv[2];
console.log(version);

let package_json = JSON.parse(readFileSync(PACKAGE_JSON).toString());
package_json.version = version;
writeFileSync(PACKAGE_JSON, JSON.stringify(package_json, null, 2));

let manifest = JSON.parse(readFileSync(MANIFEST_PATH).toString());
manifest.version = version;
writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
