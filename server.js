require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
var http = require('http');
// var jwt = require("jwt-simple");
var auth = require("./auth.js")();
var users = require("./users.js");
var cfg = require("./config.js");    
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(auth.initialize());

app.get("/teste", function (req, res) {
    res.json({ status: "My API vive!" });
});

// require("dotenv-safe").load();
// const jwt = require('express-jwt');

// app.use((req, res, next)=> {
//     console.log('Usando Middleware');
//     next();
//     // next(new Error('failed!'));
// });

// app.use((err, req, res, next)=> {
//     console.log('ERRO');
//     res.status(500).send(err.message);
// });

const autenticacao = (req, res, next) => {
    const pre_token = req.headers.authorization;
    const token = pre_token.split(" ")[1];
    console.log("process.env.SECRET");console.log(process.env.SECRET);
    const verificacao = jwt.verify(token, process.env.SECRET, (err, decoded) =>{
        if (err){
            return res.status(401).json({"mensagem": "Usuário não autenticado"})
        }
        req.iduser=decoded.id;
        return next();
    });
};

const geraToken = (req, res, next) => {
    if (req.body.username && req.body.pass) {
        var email = req.body.username;
        var password = req.body.pass;
        // console.log("email"); console.log(email);
        // console.log("password"); console.log(password);
        var user = users.find(function (u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = { id: user.id };
            var token = jwt.sign(payload, process.env.SECRET);
            res.json({ token: token });
            console.log("token: "); console.log(token);
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}

//GET: só devolve algo (só listar)
app.get('/home', (req, res) => {
    return res.json({
        "mensagem": "ok",
        "mensagem2": "ok2"
    })
});

// app.post("/token", function (req, res) {
//     if (req.body.username && req.body.pass) {
//         var email = req.body.username;
//         var password = req.body.pass;
//         console.log("email"); console.log(email);
//         console.log("password"); console.log(password);
//         var user = users.find(function (u) {
//             return u.email === email && u.password === password;
//         });
//         if (user) {
//             var payload = { id: user.id };
//             var token = jwt.encode(payload, cfg.jwtSecret);
//             res.json({ token: token });
//         } else {
//             res.sendStatus(401);
//         }
//     } else {
//         res.sendStatus(401);
//     }
// });

// //LOGIN COM TOKEN
// app.post('/login', (req, res, next) => {
//     console.log(req.body.username);
//     console.log(req.body.pass);
//     if(req.body.username === 'renato' && req.body.pass === '123456'){
//       //auth ok
//       const id = 1; //esse id viria do banco de dados
//       var token = jwt.sign({ id }, process.env.SECRET, {
//         expiresIn: 300 // expires in 5min
//       });
//       res.status(200).send({ auth: true, token: token });
//     }
//     console.log("Login inválido!");
//     res.status(500).send('Login inválido!');
//   })

//teste
app.get("/user", autenticacao, function (req, res) {
    return res.json({
        "idUser": req.iduser
    })
});

//POST: recebe algo e devolve algo(cadastrar, login, etc)
app.post('/login', geraToken, (req, res) => {
    // console.log("token");

//    // return console.log("OKK");
//     return res.json({
//         "mensagem": "login ok"
//     });

    // if (req.body.username === 'renato' && req.body.pass === '123456') {
    //     const id = 1;
    //     // console.log(jwt)
    //     return res.json({
    //         "mensagem": "login ok",
    //         token: token
    //     });
    // } else {
    //     return res.json({
    //         "mensagem erro": "não foi possivel logar"
    //     });
    // }


});


//lista para teste
const lista = {
    var1: "texto1",
    var2: "texto2",
    var3: "texto3"
};
const lista2 = [
    { id: "var1", name: "2texto1" },
    { id: "var2", name: "2texto2" },
    { id: "var3", name: "2texto3" }
];

//PUT: alterar/atualizar um valor
app.put('/alterar/:campoParaAlterar', autenticacao, (req, res) => {
    console.log("req.params.campoParaAlterar");
    console.log(req.params.campoParaAlterar);
    console.log("---");

    const verificaElemento = lista2.find((item) => item.id === req.params.campoParaAlterar)
    if (!verificaElemento) {
        return res.json({
            "arrey alterado": lista2,
            "mensagem": "Sem alteração"
        });

    }
    // console.log("verificaElemento");console.log(verificaElemento);
    lista2.map(item => {
        // console.log("==> Item:"+JSON.stringify(item))
        // console.log("item.id");
        // console.log(item.id);
        // console.log("req.params.campoParaAlterar");
        // console.log(req.params.campoParaAlterar);
        if (item.id === req.params.campoParaAlterar) {
            // console.log(`==> Item: ${item}`)
            return item.name = req.body.alterar
                ;
        }
        return item;
    })
    return res.json({
        "arrey alterado": lista2,
        "mensagem": "Lista alterada"
    });

});


//DELETE: deletar um valor
app.delete('/alterar/:campoParaDeletar', (req, res) => {
    console.log("req.params.campoParaDeletar"); console.log(req.params.campoParaDeletar);
    //var obj = lista;
    const verificaElemento = lista2.find((item) => item.id === req.params.campoParaDeletar)
    // console.log("verificaElemento");console.log(verificaElemento);
    if (!verificaElemento) {
        return res.json({
            "arrey alterado": lista2,
            "mensagem": "Sem alteração"
        });
    }
    const posicao = lista2.indexOf(verificaElemento);
    console.log("posicao"); console.log(posicao);
    lista2.splice(posicao, 1);
    return res.json({
        "arrey alterado": lista2,
        "mensagem": "item deletado"
    });

});



app.listen(3333, () => {
    console.log('Servidor online porta 3333')
});
