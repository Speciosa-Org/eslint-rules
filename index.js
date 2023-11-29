import {
  noDoubleExclamation,
} from "./rules/no-double-exclamation.js";
import fs from 'fs/promises';

const pkgString = await fs.readFile('./package.json', 'utf8');
const pkg = JSON.parse(pkgString);

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    noDoubleExclamation
  },
};

export default plugin;
