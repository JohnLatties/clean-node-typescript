import React from 'react'
import Header from './components/Layout/Header'
import MainContent from './components/Layout/MainContent'
import StyleProvider from './styles'
import Home from './views/Home'

function App() {
  return (
    <StyleProvider>
      <>
      <Header/>
      <MainContent>
        <Home/>
      </MainContent>
      </>
    </StyleProvider>
  );
}

export default App;
