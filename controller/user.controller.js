'use strict';

const bcrypt = require('bcryptjs');
const User = require('../model').User;

class UserController {

    async getAll() {
        try {
            const user = await User.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
            console.log(`user: ${user}`);
            return user;
        } catch(e) {
            console.log(e);
            return undefined;
        }
    }
}
module.exports = new UserController();
