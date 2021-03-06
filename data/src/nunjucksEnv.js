//// Core modules
const querystring = require('querystring');

//// External modules
const nunjucks = require('nunjucks');
const lodash = require('lodash');
const moment = require('moment');

//// Modules


let dirView = CONFIG.app.dirs.view; // Path to view directory
//// Setup view
// Setup nunjucks loader. See https://mozilla.github.io/nunjucks/api.html#loader
let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, CONFIG.nunjucks.loader);

// Setup nunjucks environment. See https://mozilla.github.io/nunjucks/api.html#environment
let env = new nunjucks.Environment(loaderFsNunjucks, CONFIG.nunjucks.environment);

// Get type
env.addFilter('shortNum', (value) => {
    number = lodash.toNumber(number)
    if (Math.abs(number) > 999999) {
        return Math.abs(number) > 999999 ? Math.sign(number) * ((Math.abs(number) / 1000000).toFixed(2)) + 'M' : Math.sign(number) * Math.abs(number)
    } else {
        return Math.abs(number) > 999 ? Math.sign(number) * ((Math.abs(number) / 1000).toFixed(2)) + 'K' : Math.sign(number) * Math.abs(number)
    }
});
env.addFilter("stringify", function (value) {
    return JSON.stringify(value);
});
env.addFilter("formatDate", function (value, format) {
    if (typeof value === "undefined") {
        return value;
    }
    return moment(value).format(format);
});

env.addFilter("shortenString", function (value) {
    if (value.length > 100) {
        return value.substring(0, 100) + '...'
    }
    return value

});

env.addFilter("active_class", (value, list, activeClass = "active") => {
    value = value.replace(/\b[?, 0-9]+.*$/g, ""); //Will removed the query (ex. from "/er?s=Juan" to "/er")
    if (Array.isArray(list)) {
        for (let x = 0; x < list.length; x++) {
            let o = list[x];
            let typeString = Object.prototype.toString.call(o);
            if (typeString.includes("RegExp")) {
                if (o.test(value)) {
                    return activeClass;
                }
            } else {
                if (o === value) {
                    return activeClass;
                }
            }
        }
    } else {
        if (value === list) {
            return activeClass;
        }
    }
    return "";
});

module.exports = env;