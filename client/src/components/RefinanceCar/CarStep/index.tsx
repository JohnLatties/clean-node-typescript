import React, {useEffect, memo, useState, useRef}  from 'react'
import HorizontalScroll from 'react-scroll-horizontal'
import { Car } from '../../../models/Cat'
import { Proposal } from '../../../models/Proposal'
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
  proposalCreated: Proposal | null
  onRequesProposal: (car: Car) => void
}


function CarStep ({ cars, proposalCreated, onRequesProposal}: CarSteprops) {
  const [carSelected, setCarSelect] = useState<Car | null>(null)

  function handleSelectCat (car: Car) {
    const selected = car.name !== carSelected?.name ? car : null
    setCarSelect(selected)
  }

   function buildCarOptions(cars: Car[]) {
      return (
       cars
       .map(car => 
        (<Card isSeleted={(car.name === carSelected?.name)} key={car.name} onClick={() => handleSelectCat(car)}>
          <CarImage src={car.image}/>
          <h3>{car.name}</h3>
        </Card>))
     )
   }

    if(proposalCreated) {
      return (
        <Container>
          <Card isSeleted={true} key={proposalCreated.car.name}>
            <CarImage src={proposalCreated.car.image}/>
            <h3>{proposalCreated.car.name}</h3>
          </Card>
          <ActionArea>
            <SlectedCarDescription>
                Proposal for the model car: 
                <h3>{proposalCreated.car.name}</h3>
            </SlectedCarDescription>
          </ActionArea>
        </Container>
      )
    }

  return (
    <Container> 
      <ContainerScroll>
        <HorizontalScroll>
          {buildCarOptions(cars)}
        </HorizontalScroll>
      </ContainerScroll>
      <ActionArea>
         <>
          <SlectedCarDescription>
              Proposal for the model car: 
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
