var conn = require('./../inc/db.js');;
var menus = require('./../inc/menus.js');
var reservation = require('./../inc/reservation.js');
var express = require('express');
const req = require('express/lib/request');
var router = express.Router();


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

router.get('/contact', function(req, res, next){

  res.render('contact', {

    title: 'Contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'

  });

});

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

router.get('/reservation', function(req, res, next){

  reservation.render(req, res);

  res.render('reservation', {

    title: 'Reserva - Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma mesa!'

  });

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

      reservation.render(req, res, null, "Reserva realizada com sucesso!");

    }).catch(err =>{

      reservation.render(res, req, err);
      
    })

  }

});

router.get('/services', function(req, res, next){

  res.render('services', {

    title: 'Serviço - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'

  });

});

module.exports = router;
