//// Core modules

//// External modules
const express = require('express');

//// Modules


let router = express.Router();
router.use(require('./routes/public'));


module.exports = router;