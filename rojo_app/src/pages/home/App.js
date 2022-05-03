import { Link } from 'react-router-dom';

import '../../assets/css/app.css';

import Logo from '../../assets/img/logoRojo.png';

function App() {
  return (
      <div className='container-app'>

        <nav className='box-top'>
          <Link id="box--top" to="/">
            <div className='icon-suporte'/>
            <p>Suporte</p>
          </Link>
          <Link id="box--top" to="/">
            <p>Idioma Padrao</p>
            <div className='campo-lingua' >PT-BR</div>  
          </Link>
        </nav>

      <header className='container-header'>
        
          <nav className="logo-header">
            <Link to="/"><img src={Logo}/></Link>
          </nav>
            
            <nav className='box-nav-header'>
                <a href='#inicio'> INICIO</a>
                <a href='servicos'> SERVIÇOS</a>
                <a href='contato'> CONTATO</a>
                <Link id="btn-login" to="/Login">
                  <div className='palito-header'/>
                  <div className='login-header'>
                   FAZER LOGIN
                  </div>
                    
                </Link>
            </nav>
            
            
      </header>
      <main>
        <div className='box-banner'>

        </div>
        <div className='text-apps'>
          <h2>Otimize sua forma de trabalhar</h2>
          <p>
            Trazemos o melhores recursos de infraestrutura de redes em tempo real
            em um unico lugar
          </p>
        </div>
        <div className='apps'>
          <div className='img-zabbix'/>
          <div className='img-text-zabbix'/>
        </div>
        <div className='apps'>
          <div className='img-text-grafana'/>
          <div className='img-grafana'/>
        </div>
        <div className='footer'>
          <p>Copyright © 2021 | All Rights Reserved By Rojo</p>
        </div>
      <div className='back-text'>
        
      </div>
      <div className='back-vermelho'>

      </div>
      </main>

       

            
  </div>
  );
}

export default App;
