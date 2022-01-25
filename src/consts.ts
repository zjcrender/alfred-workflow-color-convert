import type { ScriptEnvironmentVariables } from 'alfred-types'

const ENV = process.env as ScriptEnvironmentVariables;

let BUNDLE_ID: string;
let DATA_DIR: string;
if ('alfred_workflow_bundleid' in ENV) {
  BUNDLE_ID = ENV.alfred_workflow_bundleid;
  DATA_DIR = ENV.alfred_workflow_data
}

export {
  BUNDLE_ID,
  DATA_DIR
}