// ideally this would go in another module (common.js)
function notFound(req, res, next) {
    res.status(404);
    res.set('Content-Type', 'text/html');
    res.send(`Not found`);
}

module.exports = { notFound };