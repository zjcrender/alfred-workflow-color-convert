import path from "node:path";

const ENV = process.env;

export const BUNDLEID = ENV.alfred_workflow_bundleid || 'ink.render.color-convert';

export const CACHE_DIR = ENV.alfred_workflow_cache || path.join('~', `Library/Caches/com.runningwithcrayons.Alfred/Workflow Data/${ BUNDLEID }`);

