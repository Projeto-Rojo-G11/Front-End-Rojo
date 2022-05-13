import React from "react";

import './BarWork.css';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import { Settings } from "@mui/icons-material";


export default function BarWork(){
    // const reboot = document.getElementById('btn-reboot');
    // const modal_reboot = document.getElementById('reboot');
    // const close = document.getElementById('close');
    
    // reboot.addEventListener('click', () => {
    //     modal_reboot.classList.add('show');
    // });
    
    // close.addEventListener('click', () => {
    //     modal_reboot.classList.remove('show')
    // });
    return(
            <div className="sidebar">
                        <div className="s-c">
                            <button id="btn-reboot"><RestartAltIcon/></button>
                            <button id="#configuration"><Settings/></button>
                            <button id="#connection"><PlayCircleIcon/></button>
                            <button id="#extra"><SettingsInputHdmiIcon/></button>
                        </div>
            </div>
            
    )
}