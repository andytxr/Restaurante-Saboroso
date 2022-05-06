var express = require('express');
var router = express.Router();

var users = require("./../inc/users.js");
var admin = require("./../inc/admin.js");

//Rotas de Logout 

router.use(function(req, res, next){

    if(['/login'].indexOf(req.url) == -1 && !req.session.user){

        res.redirect('/admin/login')

    }else{

        next()
    }

});

router.use(function(req, res, next){

    req.menus=admin.getMenus();
    next();

})

router.get("/logout", function(req, res, next){

    delete req.session.user;
    res.redirect("/admin/login");

});

//Rotas de Tela Inicial

router.get("/", function(req, res, next){

    res.render("admin/index", {

        menus:req.menus

    });

});

//Rotas de Login

router.get("/login", function(req, res, next){

    users.render(req, res, null);

});

router.post("/login", function(req, res, next){

    if(!req.body.email){

        users.render(req, res, "Preencha o campo e-mail.");

    }else if(!req.body.password){

        users.render(req, res, "Preencha o campo senha.");

    }else{

        users.login(req.body.email, req.body.password).then(user =>{

            req.session.user = user;
            res.redirect('/admin');

        }).catch(err =>{

            users.render(req, res, err.message || err);

        })

    }

});

//Rotas de Contatos

router.get("/contacts", function(req, res, next){

    res.render("admin/contacts", {

        menus:req.menus

    });

});

//Rotas de Email

router.get("/emails", function(req, res, next){

    res.render("admin/emails", {

        menus:req.menus

    });

});

//Rotas de Menus

router.get("/menus", function(req, res, next){

    res.render("admin/menus", {

        menus:req.menus

    });

});

//Rotas de Reservas

router.get("/reservations", function(req, res, next){

    res.render("admin/reservations", {

        menus:req.menus,
        date:{}

    });

});

//Rotas de Usuários

router.get("/users", function(req, res, next){

    res.render("admin/users", {

        menus:req.menus

    });

});


module.exports = router;