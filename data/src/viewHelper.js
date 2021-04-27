// View helper middleware
// Adds a way for view to know what page it is on
// Adds addActiveClass function and currentPath global variable
module.exports = (req, res, next) => {
    // Add original URL to global view vars
    res.app.locals.currentPath = req.originalUrl;
    next();
}