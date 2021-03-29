import React, { useEffect, useState } from 'react'
import { CarBrand } from '../../models/CarBrand'
import CarBrandStep from './CarBrandStep'
import CarStep from './CarStep'
import RefinanceStepBase from './RefinanceStepBase'
import { Container } from './styles'
import next from '../../assets/image/next.svg'
import { Car } from '../../models/Car'
import ProposalStep from './ProposalStep'
import { PaymentPlan, Proposal } from '../../models/Proposal'
import { Contract } from '../../models/Contract'
import ContractStep from './ContractStep'
interface RefinanceCarProps {
  carBrand: CarBrand
  proposal?: Proposal
  contract?: Contract
  onCreateProposal?: (carBrandKey: string, carKey: string) => void
  onCreateContract?: (proposalKey: string, paymentPlan: number) => void
  onSignContract?: () => void
}

interface Step{
  showSelectBrand: boolean,
  showSelectCar?: boolean,
  showSelectProposal?: boolean,
  showSignContract?: boolean
}

function RefinanceCar ({
  carBrand,
  proposal,
  contract,
  onCreateProposal,
  onCreateContract,
  onSignContract}: RefinanceCarProps) {
  const [steps, setStep] = useState<Step>({showSelectBrand: true})
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setStep({...steps, showSelectCar: true})
    }, 500)
  }, [])

  useEffect(() => {
    if(contract) {
      initWithContract(contract)
      return
    }

   if(proposal) {
    initWithProposal(proposal)
    return
   }
  }, [proposal, contract])

  function initWithContract(contract: Contract) {
    setPaymentPlan(contract.paymentPlan)
    setStep({...steps, showSignContract: true})
  }

  function initWithProposal(proposal: Proposal) {
    setStep({...steps, showSelectProposal: true})
  }
  
  function handeRequestProposal(car: Car) {
    if(onCreateProposal) onCreateProposal(carBrand!.key, car.key)
  }

  function handleAcceptProposal(paymentPlan:PaymentPlan) {
      setPaymentPlan(paymentPlan)
     
      setStep({...steps, showSignContract: true})
      if(onCreateContract) onCreateContract(proposal!.key, paymentPlan.months)
  }

  function handleSignContract() {
      if(onSignContract) onSignContract()
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
          <ContractStep contract={contract} onSignContract={handleSignContract}/>
         </RefinanceStepBase>
      </>}

    </Container>
  )
}

export default RefinanceCar
