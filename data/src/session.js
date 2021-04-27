//// Core modules

//// External modules
const session = require('express-session'); // Session engine
const SQLiteStore = require('connect-sqlite3')(session); // Save session to sqlite db

// Use the session middleware
// See options in https://github.com/expressjs/session
module.exports = session({
    name: CONFIG.session.name,
    store: new SQLiteStore({
        dir: CONFIG.session.store.dir
    }),
    secret: "abcdefg123456",
    cookie: CONFIG.session.cookie,
    resave: CONFIG.session.resave
});