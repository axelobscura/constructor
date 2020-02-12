import React from 'react';
import LogotipoHorizontal from './LogoHorizontal';

const Dashboard = () => {
  return(
    <div>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          <LogotipoHorizontal />
        </h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="#">Cotizaciones</a>
          <a className="p-2 text-dark" href="#">Enviadas</a>
          <a className="p-2 text-dark" href="#">Recibidas</a>
          <a className="p-2 text-dark" href="#">Concretadas</a>
        </nav>
        <a className="btn btn-outline-primary" href="#">Salir</a>
      </div>
    </div>
  )
}

export default Dashboard;