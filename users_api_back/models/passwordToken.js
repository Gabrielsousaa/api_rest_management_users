const knex = require("../database/connection");
const User = require("./User")

class passwordToken {
    async create(email) {
        var user = await User.findByEmail(email);

        if (user != undefined) {
            try {
                var token = Date.now();
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token,
                }).table("passwordtoken");
                return { status: true, token: token }

            } catch (error) {
                console.log(error);
                return { status: false, err: err }
            }

        } else {
            return { status: false, err: "O email passado não existe no banco de dados!" }
        }
    }

    async validate(token) {
        try {
            var result = await knex.select().select().where({ token: token }).table("passwordtoken");

            if (result.length > 0) {
                var tk = result[0];
                if (tk.used) {
                    return { status: false };
                } else {
                    return { status: true, token: tk };
                }
            } else {
                return { status: false };
            }

        } catch (error) {
            console.log(error);
            return { status: false };
        }
    }

    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table("passwordtoken");
    }

}




module.exports = new passwordToken();