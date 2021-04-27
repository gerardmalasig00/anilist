//// Core modules

//// External modules
const axios = require('axios');

//// Modules
module.exports = axios.create({
    baseURL: CONFIG.anime.uri,
    headers: CONFIG.anime.headers,
    timeout: 60000 * 2,
});