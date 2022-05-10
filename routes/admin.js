var express = require('express');
var moment = require('moment');
var router = express.Router();

var users = require("./../inc/users.js");
var admin = require("./../inc/admin.js");
var menus = require("./../inc/menus.js");
var contacts = require("./../inc/contacts.js")
var reservations = require("./../inc/reservation.js");
var emails = require("./../inc/emails.js")


moment.locale('pt-BR', {

    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

});

//Rotas de Logout 

router.use(function(req, res, next){

    if(['/login'].indexOf(req.url) == -1 && !req.session.user){

        res.redirect('/admin/login')

    }else{

        next()
    }

});

router.use(function(req, res, next){

    req.menus=admin.getMenus(req);
    next();

})

router.get("/logout", function(req, res, next){

    delete req.session.user;
    res.redirect("/admin/login");

});

//Rotas de Tela Inicial

router.get("/", function(req, res, next){

    admin.dashboard().then(data =>{

        res.render("admin/index", admin.getParams(req, {

            data
    
        }));

    }).catch(err=>{

        console.error(err);

    })

    

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

    contacts.getContacts().then(data=>{

        res.render("admin/contacts", admin.getParams(req, {

            data

        }));

    });

});

router.delete("/contacts/:id", function(req, res, next){

    contacts.deleteContact(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    })

});

//Rotas de Email

router.get("/emails", function(req, res, next){

    emails.getEmails().then(data =>{

        res.render("admin/emails", admin.getParams(req, {

            data

        }));

    });


});

router.delete("/emails/:id", function(req, res, next){

    emails.deleteEmail(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    })

});

//Rotas de Menus

router.get("/menus", function(req, res, next){

    menus.getMenus().then(data =>{

        res.render("admin/menus", admin.getParams(req, {

            data 
    
        }));

    });

});

router.post("/menus", function(req, res, next){

    menus.saveMenu(req.fields, req.files).then(results=>{

        res.send(results);

    }).catch(err =>{

        res.send(err);

    })

})

router.delete("/menus/:id", function(req, res, next){

    menus.deleteMenu(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    })

});

//Rotas de Reservas

router.get("/reservations", function(req, res, next){

    reservations.getReservations().then(data=>{

        res.render("admin/reservations", admin.getParams(req, {

            date: {},
            data,
            moment
        
        }));

    });

});

router.post("/reservations", function(req, res, next){

    reservations.saveForm(req.fields).then(results=>{

        res.send(results);

    }).catch(err =>{

        res.send(err);

    })

})

router.delete("/reservations/:id", function(req, res, next){

    reservations.deleteReservation(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    })

});

//Rotas de Usuários

router.get("/users", function(req, res, next){

    users.getUsers().then(data =>{

        res.render("admin/users", admin.getParams(req,{

            data

        }));

    });


});

router.post("/users", function(req, res, next){

    users.saveUser(req.fields).then(results =>{

        res.send(results);

    }).catch(err =>{

        res.send(err);

    });

});

router.post("/users/password-change", function(req, res, next){

    users.changePassword(req).then(results =>{

        res.send(results);

    }).catch(err=>{

        res.send({
            
            error: err

        });

    })

});

router.delete("/users/:id", function(req, res, next){

    users.deleteUser(req.params.id).then(results =>{

        res.send(results);

    }).catch(err =>{

        res.send(err);

    })

});


module.exports = router;