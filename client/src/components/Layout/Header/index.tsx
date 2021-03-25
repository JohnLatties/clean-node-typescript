import React from 'react'
import { Container, Content, Logo, SideContent } from './styles'

function Header() {
  return (
    <Container>
      <Content>
        <SideContent>
          <Logo>EasyCar</Logo>
        </SideContent>
        <SideContent></SideContent>
      </Content>
    </Container>
  ) 
}

export default Header