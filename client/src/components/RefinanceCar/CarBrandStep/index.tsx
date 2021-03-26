import React from 'react'
import { Container, Image } from './styles'

interface CarBrandSteprops {
  image: string
}

function CarBrandStep ({ image}: CarBrandSteprops) {

  return (
    <Container>
      <Image src={image}/>
    </Container>
  )
}

export default CarBrandStep
