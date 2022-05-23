import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import axios from 'axios';


import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';

import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import './topologia.css';


export default function Topologia() 
{
    var navigate = useNavigate();
    
    //States Topologia
    const [descricao, setDescricao] = useState('');
    const [alterar, setAlterar] = useState(true);

    const[listaEquipamento, setListaEquipamento] = useState([]);

    function cadastrarTopologia(){
        // formData = Form
        // axios('',formData)
    }

    function cadastrarDescricao(){

    }

    function alterarDescricao(){
        // descricao
    }

    return(   
        <div className="container-cadastro-equipamento">
            
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
                                    
                    <div className="box-topologia">
                        <div className="cabecalho">
                            <p>Importe uma imagem de uma topologia</p>
                        </div>
                            {/* <div className="wrapper">
                                <div className="collapsible">
                                    <input type="checkbox" id="collapsible-head"/>
                                    <label for="collapsible-head">
                                        collapsible using only html css
                                    </label>
                                    <div className="collapsible-text">
                                        <h2>collapsible heading</h2>
                                        <p>
                                            Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum
                                            Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum
                                            Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum

                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        <div className="corpo">
                            <div className="img-topologia"/>                     
                            
                            <div className="texto-topologia">
                                    <form className="des">
                                    <input 
                                        placeholder="Insira uma descricao para a topologia"
                                        onChange={(event) => setDescricao(event.target.value)}
                                    />
                                    {
                                        alterar === false && (
                                            
                                            <button
                                                className="btn-alterar"
                                                onClick={alterarDescricao}
                                            />
                                        )
                                    }
                                    {
                                        alterar === true && (
                                            
                                            <button
                                                className="btn-salvar"
                                                onClick={cadastrarDescricao}
                                            />
                                        )
                                    }
                                    </form>
                                    
                             
                            </div>
                        </div>
                        <div className="btn-topologia"/>
                    </div> 
                                
                                               
                </div>
                </section>
    
            </div>
            <div className="box-btn-img">
                
                      <div className="btn-img-topo"/>
                
            </div>
        </div>
    );
}