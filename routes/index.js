var conn = require('./../inc/db.js');
var menus = require('./../inc/menus.js')
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

    })

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
      menus: results
  
    });

  })

});

router.get('/reservation', function(req, res, next){

  res.render('reservation', {

    title: 'Reserva - Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma mesa!'

  });

});

router.get('/services', function(req, res, next){

  res.render('services', {

    title: 'Serviço - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'

  });

});

module.exports = router;
