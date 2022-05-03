const { resolveInclude } = require("ejs");
let conn = require("./db.js");

module.exports = {

    getMenus(){

        return new Promise((res,rej)=>{

            conn.query(`SELECT * FROM tb_menus ORDER BY title`, (err, results)=>{

                if(err){

                    rej(err);

                }else{

                    res(results);

                }

            });

        });

    }

}