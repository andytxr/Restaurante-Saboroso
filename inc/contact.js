var conn = require('./db.js');

module.exports = {

    render(req, res, error, success){

        res.render('contact', {

            title: 'Contato - Restaurante Saboroso!',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga um oi!',
            body: req.body,
            error,
            success
        
        });

    }, 

    saveForm(fields){

        return new Promise((resolve, reject)=>{

            conn.query(`
            
                INSERT INTO tb_contacts (name, email, message)
                VALUES(?, ?, ?)
            
            `, [

                fields.name,
                fields.email,
                fields.message

            ], (err, results)=>{

                if(err){

                    reject(err);
                    
                }
                else{

                    resolve(results);

                }

            });

        });

    }


}