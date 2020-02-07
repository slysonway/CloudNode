'use strict';

class RouterBuilder {
    build(app) {
        app.use('/user', require('./user.router'));
    }
}

module.exports = new RouterBuilder();
