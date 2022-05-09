import React from "react";
import './style.css'

export default function Configuration(){
    return(
        <div id="configuration" className="container-modal">
            <p>Inicializamento de Configuração</p>
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