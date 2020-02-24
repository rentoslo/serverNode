const users = require("../models/users");

module.exports = {
    listUser: (req, res) => {
        return res.json({
            "Mensagem": "list get OK",
            "Users": users
        })
    },
    addUser: (req, res) => {
        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;
        const { name, email, password } = req.body;

        users.push({ id: Math.floor(Math.random() * 999), name, email, password });

        return res.json({
            "Mensagem": "AddUser put OK",
            "Users List": users
        })
    },
    updateUser: (req, res) => {
        const idUser = req.query.id;
        const verificaElemento = users.find(item => item.id.toString() === idUser);
        if (!verificaElemento) {
            return res.json({
                "Mensagem": "Nenhum dado alterado",
                "Users List": users
            })
        }
        const posicao = users.indexOf(verificaElemento);
        users[posicao] = {
            ...verificaElemento,
            password: req.body.newPassword
        }
        return res.json({
            "Mensagem": "Dado alterado com sucesso",
            "Users List": users
        })
    },
    deleteUser: (req, res) => {
        const idUser = req.query.id;
        const verificaElemento = users.find(item => item.id.toString() === idUser);
        if (!verificaElemento) { 
            return res.json({
                "Mensagem": "Nenhum dado apagado",
                "Users List": users
            })
        }
        const posicao = users.indexOf(verificaElemento);
        users.splice(posicao, 1);
        return res.json({
            "Mensagem": "Dado apagado com sucesso",
            "Users List": users
        })
    }
}

// home: (req, res) => {
        //     return res.json({
        //         "Mensagem": "home get OK"
        //     })
        // },
        // login: (req, res) => {
        //     return res.json({
        //         "Mensagem": "login post OK"
        //     })
        // },