import axios from "axios";
import React,{ useEffect, useState} from "react";

import { Form } from 'react-bootstrap';
import { parseJwt } from "../../services/auth";

import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';
import '../listaEquipamento/listaEquipamento.css';

import './alerta.css';


export default function Alerta (){

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState("Switch");
    const [modelo, setModelo] = useState('Cisco Plus');
    const [numeroDeSerie, setNumeroDeSerie] = useState(null);
    const [id] = useState('#128');

    //Listas
    const [listEq, setListEq] = useState([]);

    //States status
    const [statusOn, setStatusOn] = useState(false)

    const [isLoading, setIsLoading] = useState('');
    const [listaEquipamento, setListaEquipamento] = useState([])

    //States alerta
    const [error] = useState("400");
    const [descricaoError] = useState(null);



    function buscarMeusEquipamentos(){
        axios('http://localhost:5000/api/Equipamento/listar-meus-equipamentos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setListEq( response.data );
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
        <div className="container-cadastro-equipamento">
            
            <BarraLateral/>

            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">ALERTAS</h2>
                    <div className="search-form">
                        <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                        
                    </div>
                </header>
        
                <section>
                        
                    <div className="container-info-equipamento">  
                        {/* <div className="box-alerta">
                            <div className="status">
                                <div className="img-alerta"/>
                                <p>{id}</p>
                            </div> 
                            {/* <div className="descricao">
                                <div className="head">
                                    <p>{idTipoEquipamento} {modelo}</p>    
                                    <p>ERRO : {error}</p>
                                </div>
                                <div className="body">
                                    <p>Lo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptatpidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div> */}
                            {/* </div>  */}
                        {/* </div>  */}
                        <div id="box-nada"/>
                    </div>
                </section>
    
            </div>
        </div>
    );
}