import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';
import { useMemo } from "react";
import { useEffect } from "react";
import axios from 'axios';
import {parseJwt}from '../../src/services/auth';

function SearchBar( {placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [listaEquipamento, setListaEquipamento] = useState([]);

    const [searchInput, setSearchInput] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://100.26.2.205/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            console.log(response.data );
            setListaEquipamento((response.data));
            // listaEquipamento.();
        })
        .catch((erro) => console.log(erro));
    };

    useEffect(()=>(realizarListagem()),[])

    const Redirect = (data) => {
        useNavigate('/Equipamento'+ data)
    }

    // const handleFilter = (event) => {
    //     const searchWord = event.target.value;
    //     const newFilter = data.filter((value) => {
    //         return value.modelo.toLowerCase().includes(searchWord.toLowerCase());
    //     });
    //     if (searchWord === "") {
    //         setFilteredData([]);
    //     } else {
    //         setFilteredData(newFilter);
    //     }
    // }
    // const equipamentoFiltrado = useMemo(() => {
    //     return listaEquipamento.filter( (equipamento) => equipamento.modelo.toLowerCase().includes(busca.toLowerCase()));        
    // },[busca]) 

    
    
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredResults = listaEquipamento.filter((item) => {
                return Object.values(item.nomeCurso).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults()
        }
    }

    return (
        <div className="search">
            <div className="searchInputs"> 
                <div className="searchIcon"></div>
                <input type="text" placeholder={placeholder} onchange={searchItems}/>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredResults.map((value, key) => {
                        return (
                            <button className="dataItem" onClick={Redirect(value.idEquipamento)} target="_blank">
                                <p>{value.modelo}</p>
                                <p>{value.numeroDeSerie}</p>
                            </button>
                        )
                    })}
                </div>

                )
            }
        </div>
    );
  }
  
export default SearchBar;