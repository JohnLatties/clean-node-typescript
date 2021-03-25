import React, { useEffect, useState } from 'react'
import { CarBrand } from '../../models/CarBrand'
import CarBrandStep from './CarBrandStep'
import CarStep from './CarStep'
import RefinanceStepBase from './RefinanceStepBase'
import { Container } from './styles'
import next from '../../assets/image/next.svg'
import { Car } from '../../models/Cat'
interface RefinanceCarProps {
  carBrand: CarBrand
}

interface Step{
  selectBrand: boolean,
  selectCar?: boolean,
  selectProposal?: boolean,
}

function RefinanceCar ({carBrand}: RefinanceCarProps) {
  const [steps, setStep] = useState<Step>({selectBrand: true})
  useEffect(() => {
    setTimeout(() => {
      setStep({...steps, selectCar: true})
    }, 500)
  }, [])

  function handeRequestProposal(car: Car) {
    setStep({...steps, selectProposal: true})
  }

  return (
    <Container>
      <RefinanceStepBase title={`Car Brand: ${carBrand.name}`}>
        <CarBrandStep
        image={carBrand.image}
        />
      </RefinanceStepBase>
      <div>
        <img style={{height: 50, width: 50}} src={next} alt='next'/>
      </div>
      {steps.selectCar &&
      <RefinanceStepBase title='Select Car model'>
        <CarStep onRequesProposal={handeRequestProposal} cars={carBrand.cars}/>
        </RefinanceStepBase>
      }
    </Container>
  )
}

export default RefinanceCar
