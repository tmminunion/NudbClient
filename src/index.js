import { NuDB as NodeNuDB } from './node.js';
import { NuDB as BrowserNuDB } from './browser.js';

export const NuDB = typeof window !== 'undefined' ? BrowserNuDB : NodeNuDB;
export default NuDB;