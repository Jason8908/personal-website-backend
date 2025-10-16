/**
 * For Sentry initialization
 */

import * as Sentry from "@sentry/node";

import config from "../../config/index.js";

const { dsn, enableLogs, sendDefaultPii } = config.sentry;
const { nodeEnv } = config.server;

Sentry.init({
  dsn,
  enableLogs, 
  sendDefaultPii,
  environment: nodeEnv,
});