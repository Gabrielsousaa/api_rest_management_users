var User = require("../models/User");

class UserController {
    async index(req, res) {}
    async create(req, res) {
        var { email, name, password } = req.body;

        if (email == undefined) {
            res.status(400);
            res.json({ err: "o email é invalido! " })
            return; // encerra a requisição para mostrar o erro
        }
        var emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406);
            res.json({ err: "o email já existe" });
            return;
        }

        await User.new(email, password, name);

        res.status(200);
        res.send("Tudo ok!");
    }
}


module.exports = new UserController();