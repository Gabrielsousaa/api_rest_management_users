var knex = require('../database/connection');
var bcrypt = require("bcrypt");
const passwordToken = require('./passwordToken');

class User {
    async findAll() { //select all
        try {
            var result = await knex.select(["id", "email", "name", "role"]).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    async findById(id) {
        try {
            var result = await knex.select(["id", "email", "name", "role"]).where({ id: id }).table("users");

            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
    async findByEmail(email) {
        try {
            var result = await knex.select(["id", "email", "password", "name", "role"]).where({ email: email }).table("users");

            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
    async new(email, password, name) {
        try {

            var hash = await bcrypt.hash(password, 10);
            await knex.insert({ email, password: hash, name, role: 0 }).table("users")

        } catch (err) {
            console.log(err);
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select("*").from("users").where({ email: email }); // *knex == * ALL
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async update(id, email, name, role) {
        var user = await this.findById(id);

        if (user != undefined) {

            var editUser = {};

            if (email != undefined) {
                if (email != user.email) {
                    var result = await this.findEmail(email);
                    if (result = false) {
                        editUser.email = email;
                    } else {
                        return { status: false, err: "O email já está cadastrado" };
                    }
                }
            }

            if (name != undefined) {
                editUser.name = name;
            }

            if (role != undefined) {
                editUser.role = role;
            }
            try {
                await knex.update(editUser).where({ id: id }).table("users");
                return { status: true }
            } catch (err) {
                return { status: false, err: err };
            }


        } else {
            return { status: false, err: "O usuario não existe" };
        }

    }

    async delete(id) {
        var user = await this.findById(id);

        if (user != undefined) {
            try {

                await knex.delete().where({ id: id }).table("users");
                return { status: true };
            } catch (err) {
                return { status: false, err: err };
            }


        } else {
            return { status: false, err: "O usuario não existe" };
        }


    }

    async changePassword(newPassword, id, token) {
        var hash = await bcrypt.hash(newPassword, 10);

        await knex.update({ password: hash }).where({ id: id }).table("users");
        await passwordToken.setUsed(token);
    }



}

module.exports = new User();