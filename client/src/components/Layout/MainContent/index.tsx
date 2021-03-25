import React from 'react'
import { Container } from './styles'

interface Props {
  children: JSX.Element
}

function MainContent({ children }: Props) {
    return (
      <Container>
        {children}
      </Container>
    )
}

export default MainContent