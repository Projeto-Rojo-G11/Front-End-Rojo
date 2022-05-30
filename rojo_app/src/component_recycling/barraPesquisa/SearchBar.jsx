import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';
import { useEffect } from "react";
import axios from 'axios';
import {parseJwt}from '../../services/auth';

export default function SearchBar( {placeholder, data}) {
    const [listaEquipamento, setListaEquipamento] = useState([]);

    const [search, setSearch] = useState([]);

    useEffect(() => {
        const params = {};
        if(search) {
            params.title_like = search;
        }

        let usuario = parseJwt().jti;
        axios
        .get('http://100.26.2.205/api/Equipamento/listar-meus-equipamentos/' + usuario, {params})
        .then((response) => {
            setListaEquipamento(response.data);
        })
        .catch((erro) => console.log(erro));

    },[search]);

    return (
        <div className="search">
            <div className="searchInputs"> 
                <div className="searchIcon"></div>
                <input type="text" value={search} placeholder={"Busque por um dispositivo"} onChange={(event) => setSearch(event.target.value)}/>
            </div>
            <div>
                {
                    listaEquipamento.map((equipamento) => (
                        <div>

                        </div>
                    ))
                }
            </div>
        </div>

               
 
    );
  }
  
