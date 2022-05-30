import React,{ useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import axios from 'axios';

// @ts-ignore
import BarraTopologia from '../../component_recycling/barraTopologia/barraTopologiaTypeScript.tsx';
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';

import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import './topologia.css';


export default function Topologia() 
{
    var navigate = useNavigate();

    const [image, setImage] = useState<File>();
    const [base64, setBase64] = useState();
    const [preview, setPreview] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>();
    const [conditional, setConditional] = useState();
    
    //States Topologia
    const [descricao, setDescricao] = useState('');
    const [alterar, setAlterar] = useState(true);

    const[listaEquipamento, setListaEquipamento] = useState([]);
    const[listaTopologia, setListaTopologia]= useState([])
    

    function cadastrarTopologia(){
        // formData = Form
        // axios('',formData)
    }

    function newSection(){
            const container = document.querySelector("#campo-container-clone ");
            const section = document.querySelector(".container-barratopologia");
            container.appendChild(section.cloneNode(true));
    }

    // function cadastrarDescricao(event){
    //     event.preventDefault()

    //     axios.post()
    // }

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
                        
                    <div className="container-info-equipamento" id="container-topologia">    
                                        
                        <div className="cabecalho">
                            <p>Importe uma imagem de uma topologia</p>
                        </div>
                        <div>
                            
                        </div>
                        <div id="campo-container-clone">
                            <BarraTopologia/>
                        </div>                     
                        <button id="newsectionbtn" onClick={newSection}>NOVA SECAO</button>
                    </div>
                </section>
    
            </div>
           
        </div>
    );
}