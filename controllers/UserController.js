const knex = require("../database/connection");
var User = require("../models/User");
const passwordToken = require("../models/passwordToken");

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

    async edit(req, res) {
        var { id, name, role, email } = req.body;
        var result = await User.update(id, email, name, role);
        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("Tudo ok");
            } else {
                res.status(406);
                res.json(result.err);
            }


        } else {
            res.status(406);
            res.send("Ocorreu um erro no servidor");
        }
    }

    async deleteUser(req, res) {
        var id = req.params.id;

        var result = await User.delete(id);
        if (result.status) {
            res.status(200);
            res.send("Deleteção feita com sucesso!!");
        } else {
            res.status(404);
            res.send(result.err);
        }
    }
    async recoverPassword(req, res) {
        var email = req.body.email;
        var result = await passwordToken.create(email);

        if (result.status) {
            res.status(200);
            res.send(result.token.toString());
        } else {
            res.status(404);
            res.send(result.err);
        }

    }

}




module.exports = new UserController();