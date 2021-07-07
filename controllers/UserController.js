const knex = require("../database/connection");
var User = require("../models/User");

class UserController {
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);

        if (user == undefined) {
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res) { // cadastro de usuario
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