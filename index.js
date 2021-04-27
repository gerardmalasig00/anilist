//// Core modules
const path = require('path');

//// External modules
const lodash = require('lodash');
const express = require('express')

//// Modules
const pigura = require('pigura');

//// First things first
//// Save full path of our root app directory and load config and credentials
global.APP_DIR = path.resolve(__dirname).replace(/\\/g, '/'); // Turn back slash to slash for cross-platform compat
global.ENV = lodash.get(process, 'env.NODE_ENV', 'dev')

const configLoader = new pigura.ConfigLoader({
    configName: './configs/configs.json',
    appDir: APP_DIR,
    env: ENV,
    logging: true
})
global.CONFIG = configLoader.getConfig()

const credLoader = new pigura.ConfigLoader({
    configName: './credentials/credentials.json',
    appDir: APP_DIR,
    env: ENV,
    logging: true
})
global.CRED = credLoader.getConfig()

//// Create our app
let server = require('./data/src/express');
server.listen(CONFIG.app.port, function () {
    console.log(`App running in "${ENV}" mode at "${CONFIG.app.url}"`);
});
server.keepAliveTimeout = 60000 * 2;

