import axios from "axios";
import { Component, useEffect, useState } from "react";

export default function ListaEquipamento (){
    
    const [isLoading, setIsLoading] = useState('');
    const [ listaEquipamento, setListaEquipamento ] = useState([])



    function buscarMeusEquipamentos() {

        setIsLoading(true);

        axios.post('http://localhost:5000/api/equipamento/ ', {
            headers : {
                'Authorization' : 'Bearer' + localStorage.getItem('usuario-login')
                }
        
            })
            .then(response => {
                if(response.status === 200) {
                    //console.log(response);
                    setListaEquipamento( response.data ); 
                }
            })
            .catch( erro => console.log(erro) );
    };

    useEffect( buscarMeusEquipamentos, [] );

    function listaTipoequipamento(){
        axios.get('http://localhost:5000/api/Usuario/',{})

        .then(resposta => resposta.status === 201)
    }
    
    

    return(
            <div>
                <header>
                    
                </header>
                <main>
                    <section>
                        
                        {
                            this.state.listaEquipamento.map(item =>{
                                return(
                                    <div className ="card-Equipamento" key={item.id}>
                                        <p>{item.tipoEquipamento}</p>
                                        <p>{item.Modelo}</p>
                                        <p>{item.NumeroSerie}</p>
                                        
                                    
                                    </div>

                                )
                            }

                        )} 
                    </section>
                </main>
            </div>
        );
    }
    
    
