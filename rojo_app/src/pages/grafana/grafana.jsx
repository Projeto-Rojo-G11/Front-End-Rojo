import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import axios from 'axios';

import '../../assets/css/bem-vindo.css';
import '../../assets/css/animation__input.css';
import '../../assets/css/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";


export default function BemVindo() 
{
    var navigate = useNavigate();
    
    //States Usuario
    const [nome, setNome] = useState(parseJwt().nome);
    const [cargo, setCargo] = useState(parseJwt().cargo);

    //Lista
    const[listaEquipamento, setListaEquipamento] = useState([]);
    const[busca, setBusca] = useState("");

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://localhost:5000/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            console.log(response.data );
            setListaEquipamento((response.data));
            setListaEquipamento.toString();
        })
        .catch((erro) => console.log(erro));
    }

    useEffect(() => (realizarListagem()), [])        
    
    const equipamentoFiltrado = useMemo(() => {
        return listaEquipamento.filter( (equipamento) => equipamento.modelo.toLowerCase().includes(busca.toLowerCase()));        
    },[busca]) 


    return(   
        <div className="container-cadastro-equipamento">
            
            <BarraLateral/>

            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">SEJA BEM VINDO</h2>
                    <div className="search-form">
                        <div className="lupa"/>
                    
                        <input
                            name="country"
                            value = {busca}
                            onChange = {(evento) => setBusca(evento.target.value)}
                            placeholder="Procure por um equipamento"
                        />
                        <ul>
                            {
                                equipamentoFiltrado.map((equipamento) => (
                                    <li
                                    onClick={navigate('/Equipamento/' + equipamento.idEquipamento)}
                                    key={equipamento.idEquipamento}>{equipamento.modelo}</li>
                                ))
                            }
                        </ul>
                        
                    </div>
                </header>
            
                

                <section>
                        
                <div className="container-info-equipamento">    
                                    
                    
                                
                                                
                </div>
                </section>
    
            </div>
        </div>
    );
}