import { Link } from 'react-router-dom';

import '../../assets/css/app.css';

import Logo from '../../assets/img/logoRojo.png';

import bg from '../../assets/img/gra.png'

function App() {
  return (
      <div className='container-app'>

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

       

            
  </div>
  );
}

export default App;
