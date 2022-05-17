import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import axios from 'axios';


import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import '../listaEquipamento/listaEquipamento.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
// import BarraLateral from "../../component_recycling/barraLateral/barraLateral";


export default function Grafana() 
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
            
            {/* <BarraLateral/> */}

            <div className="conteudo-equipamento">

            <iframe src="http://18.205.127.50:3000/d-solo/000000098/zabbix-server-dashboard?orgId=1&refresh=1m&from=1652815474184&to=1652817274185&var-group=Zabbix%20servers&var-host=Zabbix%20server&panelId=2" width="450" height="200" frameborder="0"></iframe>
    
            </div>
        </div>
    );
}