import React from "react";
import './style.css'
import CloseIcon from '@mui/icons-material/Close';


export default function Reboot({modelo, ip}){
    const reboot = document.getElementById('btn-reboot');
    const modal_reboot = document.getElementById('reboot');
    const close = document.getElementById('close');

    reboot.addEventListener('click', () => {
        modal_reboot.classList.add('show');
    });

    close.addEventListener('click', () => {
        modal_reboot.classList.remove('show')
    });

    return(
        <div id="reboot" className="modal_container">
            <div id="box-modal">
                        <div className="img-modal"/>
                        <div id="info-modal">
                            <h2>INICIAR REBOOT</h2>
                            <h4>DO EQUIPAMENTO :</h4>
                            <div id="text">
                                <p>modelo :{modelo}</p>
                                <p>ip :{ip}</p>

                            </div>
                            <p>Tem certeza que deseja continuar?</p>
                            <div id="btn">
                            <button className="btn-reboot-s">
                                <p>sim, estou ciente</p>
                            </button>
                            <button className="btn-reboot-n">
                                <p>não,cancelar</p>
                            </button>
                        </div>
                    </div>
                    <button id="close"><CloseIcon/></button>
            </div>
        </div>
    )
}