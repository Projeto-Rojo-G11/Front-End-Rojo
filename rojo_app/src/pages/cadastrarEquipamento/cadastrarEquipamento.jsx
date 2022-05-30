import axios from "axios";
import React,{ useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import { parseJwt } from "../../services/auth";


import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import SearchBar  from '../../component_recycling/barraPesquisa/SearchBar';


import '../../assets/css/animation__input.css';
import './cadastroEquipamento.css';


export default function CadastroEquipamento() {

    var navigate = useNavigate();   

    const [isLoading, setIsLoading] = useState(false);
    // const [boolPut, setBoolPut] = useState(false);

    //States Usuario
    const [idUsuario, setIdUsuario] = useState(parseJwt().jti)

    //Listas
    const[listaEquipamento, setListaEquipamento] = useState([]);


    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(null);
    const [numeroDeSerie, setNumeroDeSerie] = useState('');
    const [modelo, setModelo] = useState('');
    const [gateWay, setGateWay] = useState('');
    const [ip, setIp] = useState('');
    const [dns, setDns] = useState('');
    const [porta, setPorta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date())

    const [tipo, setTipo] = useState(null);
    const [dadoEquipamento, setDadoEquipamento] =useState([]);
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);

    const buscarTipoEquipamento = () =>
    {
        axios
        .get('http://3.211.143.134:8080/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoTipoEquipamento(response.data)
        })
        .catch((erro)=> console.log(erro))
    }

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://3.211.143.134:8080/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            // console.log(response.data );
            setListaEquipamento((response.data));
            // setListaEquipamento.toString();
            console.log(listaEquipamento);
        })
        .catch((erro) => console.log(erro));
    }

    const realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          navigate('/'); 
        } catch (error) {
          console.warn(error);
        }
      };
    
    const cadastroEquipamento = (event) => 
    {
        event.preventDefault();

        let equipamento = {
        idUsuario: idUsuario,
        idTipoEquipamento: parseInt(idTipoEquipamento),
        numeroDeSerie: numeroDeSerie,
        modelo: modelo,
        gateWay: parseInt(gateWay),
        mask: parseInt(ip),
        dns: parseInt(dns),
        porta: parseInt(porta),
        dataEntrada : new Date(data),
        descricao: descricao,
        };

        axios
        .post("http://3.211.143.134:8080/api/Equipamento/cadastro-equipamento", equipamento
        )   
        
        .then( function (response){
            setDadoEquipamento(response.data);
        })

        .then( function (resposta) {
            console.log(resposta);
            navigate('/ListaEquipamento')
        })
        
        .catch( function (erro) {
            console.log(erro);
        });
    }


    useEffect(() => (buscarTipoEquipamento()),[])

    return(   
            <div className="container-cadastro-equipamento">
                  
                <BarraLateral/>

                <div className="conteudo-equipamento">

                    <header>
                        <h2 className="titulo">NOVO DISPOSITIVO</h2>
                        <div className="search-form">
                            <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                            
                        </div>
                    </header>
            
                    <section>
                            
                    <div className="container-info-equipamento">    
                    <div className="container-info-equipamento-h3"><h3>Dados Equipamento</h3></div>
                                        
                
                                                    <form className="form-cadastro-equipamento" onSubmit={(event) => cadastroEquipamento(event)}>
                                                        <div className="dados">
                                                            <div className="box-1">
                                                                <div className="box-1-1">
                                                                    
                                                                    <div className="form__div">
                                                                        <select
                                                                            name="idTipoEquipamento"  
                                                                            value={idTipoEquipamento}   
                                                                            id="form__input_tipoEquipamento"      
                                                                            onChange={(event) => setIdTipoEquipamento(event.target.value)}
                                                                        >
                                                                                {dadoTipoEquipamento.map((event) => {
                                                                                    return (

                                                                                        <option key={event.idTipoEquipamento} value={event.idTipoEquipamento}>{event.equipamento}
                                                                                        </option>
                                                                                    );
                                                                                })}                                 
                                                                                <option value="#">Tipo de Equipamento </option>
                                                                        </select>                        
                                                                        
                                                                    </div>
                                                                    <div className="form__div">                       
                                                                        <input 
                                                                            className="form__input"
                                                                            type="text"
                                                                            name="Modelo"
                                                                            value={modelo}
                                                                            autoComplete='off'
                                                                            placeholder=" "
                                                                            onChange={(event) => setModelo(event.target.value)}
                                                                        /> 
                                                                        <label className="form__label">
                                                                            Modelo
                                                                        </label>
                                                                    </div>
                                                                </div>


                                                                <div className="form__div">                   
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="NumeroSerie"
                                                                        value={numeroDeSerie}
                                                                        placeholder=" "
                                                                        onChange={(event) => setNumeroDeSerie(event.target.value)}
                                                                    />  
                                                                    <label className="form__label">
                                                                        Numero de Série
                                                                    </label>
                                                                </div> 


                                                            </div>
                                                            <div className="divisor">
                                                                <p>Informações para consultas básicas do sistema</p>
                                                                <div className="palito-divisor"/>
                                                            </div>
                                                            <div className="box-2">
                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="Gateway"
                                                                        value={gateWay}
                                                                        placeholder=" "
                                                                        onChange={(event) => setGateWay(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        GateWay
                                                                    </label>
                                                                </div>

                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="IP"
                                                                        value={ip}
                                                                        placeholder=" "
                                                                        onChange={(event) => setIp(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        Mask
                                                                    </label>
                                                                </div>

                                                                <div className="form__div">                      
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="DNS"
                                                                        value={dns}
                                                                        placeholder=" "
                                                                        onChange={(event) => setDns(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        DNS
                                                                    </label> 
                                                                </div> 

                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="Porta"
                                                                        value={porta}
                                                                        placeholder=" "
                                                                        onChange={(event) => setPorta(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        Porta
                                                                    </label>
                                                                </div>

                                                                
                                                                </div>

                                                        </div>
                                                        <div className="container-img">
                                                            <div className="box-img" alt="imagem do perfil"/>

                                                                <div className="form__div">    
                                                                    <textarea rows="6" cols="20" wrap="hard"
                                                                            className="form__input"
                                                                            id="form__input_descricao"
                                                                            type="text"                                                                        value={descricao}
                                                                            placeholder=" "                                                                        
                                                                            onChange={(event) => setDescricao(event.target.value)}
                                                                    />                   
                                        
                                                                    <label className="form__label">
                                                                        Descrição
                                                                    </label>
                                                                </div> 
                                                            
                                        
                                                                <button
                                                                    type="submit"
                                                                    className="btn__login-2"
                                                                    disabled={
                                                                        idTipoEquipamento === '' ||
                                                                        modelo === '' || 
                                                                        numeroDeSerie === '' |
                                                                        gateWay === '' ||
                                                                        dns === ''||
                                                                        ip === ''||
                                                                        porta === '' 
                                                                        ? 'none'
                                                                        : ''
                                                                    }
                                                                >    
                                                                    CADASTRAR
                                                                </button>
                                    
                                                        </div>
                                                    </form>
                                    </div>
                    </section>
        
                </div>
            </div>
        );
    

}
