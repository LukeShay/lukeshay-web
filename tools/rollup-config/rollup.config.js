import { createRollupConfig } from './index';
import pkg from './package.json';

export default (args) => createRollupConfig(args, pkg);
