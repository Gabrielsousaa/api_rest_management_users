var knex = require('../database/connection');
var bcrypt = require("bcrypt");

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



}

module.exports = new User();