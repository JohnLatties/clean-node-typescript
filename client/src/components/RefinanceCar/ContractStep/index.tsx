import React, { useState } from 'react'
import { Contract } from '../../../models/Contract'
import { Container, Description, ActionArea, Button } from './styles'

interface ContractStepProps {
  contract: Contract
  onSignContract: () => void
}

function ContractStep({contract, onSignContract }: ContractStepProps) {
  const [agreed, setAgreed] = useState(false)

  const { proposal, paymentPlan, signed } = contract
  const { car, carBrand, proposalNumber} = proposal

  return(
    <Container>
      <Description>
        {`Car refinancing: ${car.name} - (${carBrand.name})`}
      </Description>
      <Description>
        {`Proposal number: ${proposalNumber}`}
      </Description>
      <Description>
        {`Payment plan: $${paymentPlan.value} in ${paymentPlan.months} months`}
      </Description>
      <ActionArea>
        {!signed && <div>
        <div>
          <input
          checked={agreed}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAgreed(event.target.checked)}
          type="checkbox"
          id="agree"
          name="agree"/>
          <label htmlFor="agree">{` Agree`}</label>
        </div>
        {agreed && <Button type='button' onClick={onSignContract}>Sign</Button>}
       </div> }
        {signed && 
        <div>
          <h3>Signed ✅</h3>
        </div> }
      </ActionArea>
    </Container>
  )
}


export default ContractStep