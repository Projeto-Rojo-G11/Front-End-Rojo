import axios from "axios";
import React,{ useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import { parseJwt } from "../../services/auth";

import '../../component_recycling/barraLateral/barraLateral.css';
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import './listaEquipamento.css';
import { map } from "lodash";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";


import '../../pages/listaEquipamento/listaEquipamento.css';

export default function ListaEquipamento (){

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [numeroSerie, setNumeroSerie] = useState(0);

    //Listas
    const [ listaEquipamento, setListaEquipamento ] = useState([])

    //States status
    const [statusOn, setStatusOn] = useState(false)

    const [isLoading, setIsLoading] = useState('');

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://localhost:5000/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            console.log(response.data );
            setListaEquipamento((response.data));
            // listaEquipamento.();
        })
        .catch((erro) => console.log(erro));
    };
    
    useEffect( () => realizarListagem(), [] );
    

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
                            {
                            listaEquipamento.map((item) => {
                                return(
                                <div className="box-lista">
                                    <div className="box-head-lista">
                                        <div><p>#{item.idEquipamento} </p></div>
                                    </div>
                                    <div className="box-body-lista">
                                            <div className="ob1-info">
                                                <div className="ob1-info-input">
                                                        <div className="form__div">                       
                                                                            <div
                                                                                className="-lista"
                                                                            >
                                                                                {item.idTipoEquipamento}
                                                                            </div>
                                                                            <label className="label">
                                                                                Tipo Equipamento
                                                                            </label>
                                                        </div>
                                                        <div className="form__div">                       
                                                                            <div 
                                                                                className="-lista"
                                                                            >
                                                                                {item.modelo}
                                                                            </div>
                                                                            <label className="label">
                                                                                Modelo
                                                                            </label>
                                                        </div>
                                                </div>
                                                <div className="ob1-info-input-2">
                                                        <div className="form__div">                       
                                                                            <div 
                                                                                className="-lista"
                                                                            >{item.numeroDeSerie}</div> 
                                                                            <label className="label">
                                                                                Numero de Serie
                                                                            </label>
                                                                            
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="ob2-status">
                                                <div className="status">

                                                    STATUS 
                                                    <div>
                                                        {
                                                        statusOn === true && (
                                                            <div className="on-off">
                                                                <div className="circle1"/>
                                                                <p>Ligado</p>
                                                            </div>
                                                        )}
                                                        {
                                                        statusOn === false && (
                                                            <div className="on-off">
                                                                <div className="circle2"/>
                                                                <p>Desligado</p>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                                <div>
                                                    ALERTAS
                                                    <div className="box-alerta">
                                                        <div className="alerta">
                                                            <div className="alerta1"/>
                                                            <p>0</p>
                                                            </div>
                                                
                                                
                                                        <div className="alerta">
                                                            <div className="alerta2"/>
                                                            <p>0</p>
                                                        </div>
                                                        </div>               
                                                    </div> 
                                            </div>
                                            <div className="ob3-img"/>
                                    </div>
                                </div>
                                )
                            })  
                        }
                    </div>
                </section>
    
            </div>
        </div>
    );
    }
    
    
