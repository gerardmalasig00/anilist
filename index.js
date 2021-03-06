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

let config;
if (ENV === 'dev') {
    config = './configs/configs.json'
} else {
    config = './configs/configs-production.json'
}
const configLoader = new pigura.ConfigLoader({
    configName: config,
    appDir: APP_DIR,
    env: ENV,
    logging: true
})
global.CONFIG = configLoader.getConfig()

//// Create our app
let server = require('./data/src/express');
let server_port = process.env.PORT || CONFIG.app.port;

server.listen(server_port, function () {
    console.log(`App running in "${ENV}" mode at "${CONFIG.app.url}"`);
});
server.keepAliveTimeout = 60000 * 2;


