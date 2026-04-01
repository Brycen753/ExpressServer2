const mongoose = require('mongoose');

function connect({ host, name, user, password }) {
    return mongoose.connect(
        `mongodb://${host}/${name}`,
        { user, password }
    );
}

module.exports = { connect };