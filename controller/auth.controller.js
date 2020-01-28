'use strict';

//for token
const jwt = require('jsonwebtoken');
//for hash password
const bcrypt = require('bcryptjs');
//model for user
const User = require('../model').User;

class AuthController {
    async register(firstname, lastname, email, date, password) {
        //hash password for BDD
        const hashedPassword = await bcrypt.hash(password, 8);
        try {
            //add user to BDD
            const user = await User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                date: date,
                //generate token and return
                password: hashedPassword
            });
            const token = this.generateToken(user.id);
            return {auth: true, token: token};
       } catch (e) {
            return undefined;
       }
    }

    async login(email, password) {
        try {
            //find user by mail
            const user = await User.findAll({
                where: {
                    email: email
                }
            });
            //check that there is only one user for this mail
            if (user.length > 1) {
                return undefined;
            }
            //check if password is valide
            const passwordIsValid = await bcrypt.compare(password, user[0].password);
            if (!passwordIsValid) {
                return  undefined;
            }
            //generate token and return
            const token = this.generateToken(user[0].id);
            return { auth: true, token: token};
        } catch (e) {
            return undefined;
        }
    }

    generateToken(id) {
        return jwt.sign({id: id}, process.env.SECRET, {
            expiresIn: 20 * 60 //20 minutes
        });
    }
}

module.exports = new AuthController();
