import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';
import { useMemo } from "react";

function SearchBar( {placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);

    const Redirect = (data) => {
        useNavigate('/Equipamento'+ data)
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        const newFilter = data.filter((value) => {
            return value.modelo.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }
    // const equipamentoFiltrado = useMemo(() => {
    //     return listaEquipamento.filter( (equipamento) => equipamento.modelo.toLowerCase().includes(busca.toLowerCase()));        
    // },[busca]) 

    return (
        <div className="search">
            <div className="searchInputs"> 
                <div className="searchIcon"></div>
                <input type="text" placeholder={placeholder} onchange={handleFilter}/>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((value, key) => {
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