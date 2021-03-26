import React, { useEffect, useState } from 'react'
import { CarBrand } from '../../models/CarBrand'
import CarBrandStep from './CarBrandStep'
import CarStep from './CarStep'
import RefinanceStepBase from './RefinanceStepBase'
import { Container } from './styles'
import next from '../../assets/image/next.svg'
import { Car } from '../../models/Cat'
import ProposalStep from './ProposalStep'
import { PaymentPlan, Proposal } from '../../models/Proposal'
import { Contract } from '../../models/Contract'
import ContractStep from './ContractStep'
interface RefinanceCarProps {
  carBrand: CarBrand
}

interface Step{
  showSelectBrand: boolean,
  showSelectCar?: boolean,
  showSelectProposal?: boolean,
  showSignContract?: boolean
}

function RefinanceCar ({carBrand}: RefinanceCarProps) {
  const [steps, setStep] = useState<Step>({showSelectBrand: true})
  const [car, setCar] = useState<Car | null>(null)
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setStep({...steps, showSelectCar: true})
    }, 500)
  }, [])

  function handeRequestProposal(car: Car) {
    setCar(car)
    setProposal({
      car: car,
      carBrand: { name: carBrand.name!, image: carBrand.image!},
      apr: 10,
      createdAt: new Date(),
      number: `#${Date.now()}`,
      paymentOptions: [{ months: 36, value: 300.5}, {months: 48, value: 270.8}]
    } as Proposal)

    setStep({...steps, showSelectProposal: true})
  }

  function handleAcceptProposal(paymentPlan:PaymentPlan) {
      setPaymentPlan(paymentPlan)
      setContract({
        proposal: proposal!,
        playmentPlan: paymentPlan!,
        createdAt: new Date(),
        signed: false
      } as Contract)
      setStep({...steps, showSignContract: true})
  }

  return (
    <Container>
      <RefinanceStepBase title={`Car Brand: ${carBrand.name}`}>
        <CarBrandStep
        image={carBrand.image}
        />
      </RefinanceStepBase>

      {steps.showSelectCar && <>
        <div>
          <img style={{height: 50, width: 50}} src={next} alt='next'/>
        </div>
        <RefinanceStepBase title='Select Car model'>
          <CarStep 
          onRequesProposal={handeRequestProposal}
          cars={carBrand.cars}
          proposalCreated={proposal}
          />
        </RefinanceStepBase>
      </>}

      {(steps.showSelectProposal && proposal)  &&<>
        <div>
            <img style={{height: 50, width: 50}} src={next} alt='next'/>
        </div>
        <RefinanceStepBase title='Choise a payment plan'>
          <ProposalStep proposal={proposal} onAccept={handleAcceptProposal} chosenPaymentPlan={paymentPlan}/>
         </RefinanceStepBase>
      </>}

      {(steps.showSignContract && paymentPlan && contract)  &&<>
        <div>
            <img style={{height: 50, width: 50}} src={next} alt='next'/>
        </div>
        <RefinanceStepBase title='Sign contract'>
          <ContractStep contract={contract} onSignContract={() =>{}}/>
         </RefinanceStepBase>
      </>}

    </Container>
  )
}

export default RefinanceCar
