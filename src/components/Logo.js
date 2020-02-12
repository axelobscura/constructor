import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';

const Logotipo = () => (
  <div>
    <Logo style={{
      width: "200px"
    }} />
    <p style={{
      fontSize: '0.8em',
      padding: '10px'
    }}>COTIZA TUS PROYECTOS DE MANERA PRIVADA</p>
    <hr/>
  </div>
  
)

export default Logotipo;