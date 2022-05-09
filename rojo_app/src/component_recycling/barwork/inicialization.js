import React from "react";
import './style.css'

export default function Inicialization (){
    return(
        <div id="connection" className="container-modal">
        <p>Inicializamento de Conexão</p>
        <div>
            <button className="btn-reboot-s">
                <p>SIM</p>
            </button>
            <button className="btn-reboot-n">
                <p>NÃO</p>
            </button>
        </div>
    </div>
    )
}