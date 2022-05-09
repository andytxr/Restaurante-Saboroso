var conn = require('./../inc/db.js');
var express = require('express');
var router = express.Router();

var menus = require('./../inc/menus.js');
var reservation = require('./../inc/reservation.js');
var contact = require('../inc/contacts.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results =>{

    res.render('index', {

      title: 'Restaurante Saboroso!',
      menus: results,
      home: true

    });

  });

});

//Rotas do Contato

router.get('/contact', function(req, res, next){

  contact.render(req, res);

});

router.post('/contact', function(req, res, next){

  if(!req.body.name){

    contacts.render(req, res, "Digite o nome!");

  }else if(!req.body.email){

    contacts.render(req, res, "Digite o email!");

  }else if(!req.body.message){

    contacts.render(req, res, "Digite a mensagem!");

  }else{

    contacts.saveForm(req.body).then(results=>{

      req.body={};

      contacts.render(req, res, null, "Contato enviado com sucesso!");

    }).catch(err=>{

      contacts.render(req, res, err.message);

    });

  }

});

//Rotas do Menu

router.get('/menu', function(req, res, next){

  menus.getMenus().then(results=>{

    res.render('menu', {

      title: 'Menu - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie o nosso menu!',
      menus: results,
  
    });

  })

});

//Rotas da Reserva

router.get('/reservation', function(req, res, next){

  reservation.render(req, res);

});

router.post('/reservation', function(req, res, next){

  if(!req.body.name){

    reservation.render(req, res, "Digite o nome!");

  }else if(!req.body.email){

    reservation.render(req, res, "Digite o email!");

  }else if(!req.body.people){

    reservation.render(req, res, "Selecione a quantidade de pessoas!");

  }else if(!req.body.date){

    reservation.render(req, res, "Marque a data!");

  }else if(!req.body.time){

    reservation.render(req, res, "Marque o horário!");

  } else {

    reservation.saveForm(req.body).then(results=>{

      req.body= {};

      reservation.render(req, res, null, "Reserva realizada com sucesso!");

    }).catch(err =>{

      reservation.render(res, req, err.messge);

    })

  }

});

//Rotas dos Serviços

router.get('/services', function(req, res, next){

  res.render('services', {

    title: 'Serviço - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'

  });

});

module.exports = router;
