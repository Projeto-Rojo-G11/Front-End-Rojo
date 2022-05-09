import React from "react";

import './style.css'
import './BarWork.css';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import { Settings } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';


export default function Modulo_Model(){

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
        <div className="modulo-model">
            <div className="sidebar">
                        <div className="s-c">
                            <button id="btn-reboot"><RestartAltIcon/></button>
                            <button id="#configuration"><Settings/></button>
                            <button id="#connection"><PlayCircleIcon/></button>
                            <button id="#extra"><SettingsInputHdmiIcon/></button>
                        </div>
            </div>
            <div id="reboot" className="modal_container">
            <div id="box-modal">
                        <div className="img-modal"/>
                        <div id="info-modal">
                            <h2>INICIAR REBOOT</h2>
                            <h4>DO EQUIPAMENTO :</h4>
                            <div id="text">
                                <p>modelo :{}</p>
                                <p>ip :{}</p>

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
        </div>
    )
}