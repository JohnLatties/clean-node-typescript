import React, { useEffect } from 'react'
import { Container, Title } from './styles'


interface RefinanceStepBaseProps {
  children: JSX.Element,
  title: string
}

function RefinanceStepBase ({children, title}: RefinanceStepBaseProps) {
  useEffect(() => {
    window.scrollTo(0,document.body.scrollHeight - 100)
  }, [])
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  )
}

export default RefinanceStepBase
