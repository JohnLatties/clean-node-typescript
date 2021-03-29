import React, {useState} from 'react'
import {  Radio } from 'react-radio-input'
import { PaymentPlan, Proposal } from '../../../models/Proposal'
import { Container, Description, RadioContainer, ActionArea, Button } from './styles'

interface ProposalStepProps {
  proposal: Proposal
  chosenPaymentPlan: PaymentPlan | null
  onAccept: (paymentPlan: PaymentPlan) => void
}


function ProposalStep ({proposal, onAccept, chosenPaymentPlan}: ProposalStepProps) {
  const { carBrand, car, proposalNumber, paymentOptions, apr } = proposal
  const [paymentOption, setPaymentOption] = useState('')

  function handleAcceptProposal() {
      const chosen: PaymentPlan  = paymentOptions.find(item => `${item.months}` === paymentOption)!
      onAccept(chosen)
  }

  function buildDescription() {
    return (
      <>
        <Description>
          {`Payments for your ${carBrand.name}, model ${car.name}  at a ${apr}% APR would be:`}
        </Description>
        <Description>{`Propose number: ${proposalNumber}`}</Description>
      </>
      )
  }

  if(chosenPaymentPlan) {
    return (
      <>
      <Container>
        {buildDescription()}
        <Description>{`The monthly payment is $${chosenPaymentPlan.value} in ${chosenPaymentPlan.months} months.`}</Description>
        <Description>{`Accepted ✅`}</Description>
      </Container>
    </>
    )
  }


  return (
    <Container>
      {buildDescription()}
      <RadioContainer
      name="favoriteFruit"
      onChange={setPaymentOption}
      selectedValue={paymentOption}
      >
        {paymentOptions
        .map(paymentOption => (
          <label key={`${paymentOption.months}-${paymentOption.value}`} htmlFor={`${paymentOption.months}`}>
          <Radio id={`${paymentOption.months}`} value={`${paymentOption.months}`} />
          {`  $${paymentOption.value} in ${paymentOption.months} months`}
        </label>))}
      </RadioContainer>
  
      <ActionArea>
        {paymentOption&& 
          <Button type='button' onClick={handleAcceptProposal}>To accept</Button>
        }    
      </ActionArea>
    </Container>
  )
}
export default ProposalStep