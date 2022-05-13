import React,{ useState, useEffect } from "react";
import axios from 'axios';

import './bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import '../../../src/component_recycling/barwork/BarWork.css';

import { parseJwt } from "../../services/auth";
import SearchBar  from '../../component_recycling/SearchBar';
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";


export default function BemVindo() 
{
    //Lista
    const[listaEquipamento, setListaEquipamento] = useState([]);
    const[busca, setBusca] = useState("");

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://localhost:5000/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            // console.log(response.data );
            setListaEquipamento((response.data));
            // setListaEquipamento.toString();
            console.log(listaEquipamento);
        })
        .catch((erro) => console.log(erro));
    }

    useEffect(() => (realizarListagem()), [])        


    return(   
        <div id="bem-vindo" className="container-cadastro-equipamento">
            <BarraLateral/>
        
            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">SEJA BEM VINDO</h2>
                    <div className="search-form">
                        <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                        
                    </div>
                </header>
            
                

                <section>
                        
                <div className="container-info-equipamento">    
                                    
                    <div className="bem-vindo">INICIE CADASTRANDO UM NOVO EQUIPAMENTO DA SUA INFRAESTRUTURA</div>
                                
                                                
                </div>
                </section>
    
            </div>
        </div>
    );
}