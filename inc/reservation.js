var conn = require("./db.js")

module.exports = {

    render(req, res, error, success){

        res.render('reservation', {

            title: 'Reserva - Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma mesa!',
            body: req.body,
            error,
            success

        });

    },

    saveForm(fields){

        return new Promise((resolve, reject)=>{

            if(fields.date.indexOf('/') > -1){

                fields.date = fields.date.split('/').reverse().join('-');

            }

            let query;
            let params = [

                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time

            ]

            if(parseInt(fields.id)>0){

                query = `
                
                    UPDATE tb_reservations
                    SET
                        name = ?,
                        email = ?,
                        people = ?,
                        date = ?,
                        time = ?
                    WHERE id = ?

                `;

                params.push(fields.id);

            }else{

                query = `

                    INSERT INTO tb_reservations (name, email, people, date, time)
                    VALUES(?, ?, ?, ?, ?)
                    
                `;

            }

            conn.query(query, params, (err, results)=>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);

                }

            });

        });

    },

    getReservations(){

        return new Promise((resolve,reject)=>{

            conn.query(`SELECT * FROM tb_reservations ORDER BY date DESC`, (err, results)=>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);

                }

            });

        });

    },

    deleteReservation(id){

        return new Promise((resolve, reject) =>{

            conn.query(`
        
                DELETE FROM tb_reservations WHERE id = ?

             `, [

                id

            ], (err, results)=>{

                if(err){

                    reject(err);

                }else{

                    resolve(results);

                }

            });

        });

    }

}