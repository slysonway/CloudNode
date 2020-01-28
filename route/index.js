'use strict';

class RouterBuilder {
    build(app) {
        app.use('/user', require('./user.router'));
        app.use('/auth', require('./auth.router'));
    }
}

module.exports = new RouterBuilder();
