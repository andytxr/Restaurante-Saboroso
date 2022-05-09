class Grid {

    constructor(configs){

        configs.listeners = Object.assign({

              afterUpdateClick: (e)=>{
        
                $("#modal-update").modal('show');
        
              },
              afterDeleteClick: (e)=>{
        
                window.location.reload();
        
              },
              afterFormCreate: (e)=>{

                window.location.reload();

              },
              afterFormUpdate: (e)=>{

                window.location.reload();

              },
              afterFormCreateError: (e)=>{

                alert('Não foi possível enviar o formulário!');

              },
              afterFormUpdateError: (e)=>{

                alert('Não foi possível enviar o formulário!');

              }
        
            },configs.listeners)

        this.options = Object.assign({}, {
            
            formCreate: "#modal-create form",
            formUpdate: "#modal-update form",
            btnUpdate: ".btn-update",
            btnDelete: ".btn-delete",

        }, configs);

        this.initForms();
        this.initButtons();

    }

    initForms(){

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json=>{

            this.event('afterFormCreate');

        }).catch(err=>{

            this.fireEvent('afterFormCreateError');

        })

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save().then(json=>{

            this.event('afterFormUpdate');

        }).catch(err=>{

            this.fireEvent('afterFormUpdateError');

        });

    }

    initButtons(){

        [...document.querySelectorAll(this.options.btnDelete)].forEach(btn=>{

            btn.addEventListener('click', e=>{

                this.event('beforeDeleteClick');

                let data = this.getTrData(e);

                if(confirm(eval('`' + this.options.deleteAlert + '`'))){

                    fetch(eval('`' + this.options.deleteUrl + '`'), {

                        method: 'DELETE'

                    }).catch(response => response.json()).then(json=>{


                        this.event('afterDeleteClick', [e]);

                    })

                }

            });

        });

        [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn =>{
            
            btn.addEventListener('click', e=>{

                this.event('beforeUpdateClick', [e]);
                let data = this.getTrData(e);

                for(let name in data){

                    this.options.onUpdateLoad(this.formUpdate, name, data);
                    let input = this.formUpdate.querySelector(`[name=${name}]`);

                }

                this.event('afterUpdateClick', [e]);

            });

        });

    }

    event(name, args){

        if(typeof this.options.listeners[name]==='function'){

            this.options.listeners[name].apply(this, args);

        }

    }

    getTrData(e){

        let tr = e.composedPath().find(el=>{

            return (el.tagName.toUpperCase() === 'TR');

        });

        return JSON.parse(tr.dataset.row);


    }

}