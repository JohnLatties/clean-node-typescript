import React, {useEffect, memo, useState, useRef}  from 'react'
import HorizontalScroll from 'react-scroll-horizontal'
import { Car } from '../../../models/Cat'
import { 
  Container,
  Card,
  CarImage,
  SlectedCarDescription,
  Button,
  ContainerScroll,
  ActionArea } from './styles'

interface CarSteprops {
  cars: Car[],
  onRequesProposal: (car: Car) => void
}


function CarStep ({ cars, onRequesProposal}: CarSteprops) {
  const [carSelected, setCarSelect] = useState<Car | null>(null)

  function handleSelectCat (car: Car) {
    const selected = car.name !== carSelected?.name ? car : null
    setCarSelect(selected)
  }


  return (
    <Container>
      <ContainerScroll>
      <HorizontalScroll>
        {cars
        .map(car => 
        (<Card isSeleted={(car.name === carSelected?.name)} key={car.name} onClick={() => handleSelectCat(car)}>
          <CarImage src={car.image}/>
          <h3>{car.name}</h3>
        </Card>))}
      </HorizontalScroll>
      </ContainerScroll>
      <ActionArea>
         <>
          <SlectedCarDescription>
              Request a proposal for the model car: 
              <h3>{carSelected?.name || "Select a car"}</h3>
          </SlectedCarDescription>
        {carSelected &&  
        <Button
        disabled={!carSelected}
        onClick={() => onRequesProposal(carSelected)}>
          Make request
        </Button>}
        </>
      </ActionArea>
    </Container>
  )
}

export default memo(CarStep)
