// ideally this would go in another module (common.js)
function notFound(req, res, next) {
    res.status(404);
    res.set('Content-Type', 'text/plain');
    res.send(`Not found ${req.method} ${req.url}`);
}

module.exports = { notFound };