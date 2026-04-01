const mongoose = require('mongoose');

function connect({ host, name, user, password }) {
    const credentials = user ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@` : '';
    return mongoose.connect(`mongodb://${credentials}${host}/${name}`);
}

module.exports = { connect };