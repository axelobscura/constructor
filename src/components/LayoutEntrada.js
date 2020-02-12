import React from 'react';

const LayoutEntrada = (props) => (
  <div className="App">
    <header className="App-header">
        {props.children}
    </header>
  </div>
)

export default LayoutEntrada;