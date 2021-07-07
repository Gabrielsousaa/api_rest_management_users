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
}




module.exports = new passwordToken();