import React from 'react'
import StyleProvider from './styles'

function App() {
  return (
    <StyleProvider>
      <div className="App">
        <h1 style={{color: '#fff'}}>Home</h1>
      </div>
    </StyleProvider>
  );
}

export default App;
