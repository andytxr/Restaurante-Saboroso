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
            btnUpdate: "btn-update",
            btnDelete: "btn-delete",
            onUpdateLoad: (form, name, data) =>{

                let input = form.querySelector('[name='+name+']');
                if(input){

                    input.value=data[name];

                }

            }

        }, configs);

        this.rows=[...document.querySelectorAll('table tbody tr')];

        this.initForms();
        this.initButtons();

    }

    initForms(){

        this.formCreate = document.querySelector(this.options.formCreate);

        if(this.formCreate){

            this.formCreate.save({
            
                success:()=>{
    
                    this.event('afterFormCreate');
    
                },
                failure: ()=>{
    
                    this.fireEvent('afterFormCreateError');
    
                }
    
            });

        }

        this.formUpdate = document.querySelector(this.options.formUpdate);

        if(this.formUpdate){

            this.formUpdate.save({

                success: ()=>{
    
                    this.event('afterFormUpdate');
    
                },
                failure: ()=>{
    
                    this.event('afterFormUpdateError');
    
                }
                
            });

        }

    }

    initButtons(){

        this.rows.forEach(row=>{

            [...row.querySelectorAll('.btn')].forEach(btn=>{

                btn.addEventListener('click', e=>{

                    if(e.target.classList.contains(this.options.btnUpdate)){

                        this.btnUpdateClick(e);

                    }else if(e.target.classList.contains(this.options.btnDelete)){

                        this.btnDeleteClick(e);

                    }else{

                        this.event('buttonClick', [e.target, this.getTrData(e), e]);

                    }

                });

            });

        });        

    }

    btnUpdateClick(e){

        this.event('beforeUpdateClick', [e]);
        let data = this.getTrData(e);

        for(let name in data){

            this.options.onUpdateLoad(this.formUpdate, name, data);
            let input = this.formUpdate.querySelector(`[name=${name}]`);

        }

        this.event('afterUpdateClick', [e]);

    }

    btnDeleteClick(e){

        this.event('beforeDeleteClick');

        let data = this.getTrData(e);

        if(confirm(eval('`' + this.options.deleteAlert + '`'))){

            fetch(eval('`' + this.options.deleteUrl + '`'), {

                method: 'DELETE'

            }).catch(response => response.json()).then(json=>{


                this.event('afterDeleteClick', [e]);

            });

        }

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