import React, { useEffect, useState } from 'react'
import Landing from '../../components/Landing'
import RefinanceCar from '../../components/RefinanceCar'
import SelectCarBrand from '../../components/SelectCarBrand'
import { CarBrand } from '../../models/CarBrand'
import { Contract } from '../../models/Contract'
import { Proposal } from '../../models/Proposal'
import { CarBrandApi } from '../../services/api/carBrandApi'
import { ContractApi } from '../../services/api/refinancingContractApi'
import { ProposalApi } from '../../services/api/refinancingProposalApi'
import { ButtonStart, Container, ContentArea, RefCarContainer } from './styles'


function Home () {
  const [carBrands, setCarBrands] = useState<CarBrand[]>([])
  const [selectedCarBrand, setSelectedCarBrand] = useState<CarBrand| undefined>(undefined)
  const [proposal, setProposal] = useState<Proposal | undefined>(undefined)
  const [contract, setContract] = useState<Contract | undefined>(undefined)
  const [startRefinanceCar, setStarRefinanceCar] = useState<boolean>(false)
  useEffect(() => {
    loadCarBrands()
  }, [])

 async function loadCarBrands() {
  const carBrandApi = new CarBrandApi()
  const result =  await carBrandApi.getAll() 
  setCarBrands(result)
 }

 function handleSelecCarBrand(carBrand:CarBrand) {
    clearFrom()
    setSelectedCarBrand(carBrand)
 }

 function clearFrom() {
  setSelectedCarBrand(undefined)
  setProposal(undefined)
  setContract(undefined)
  setStarRefinanceCar(false)
 }

 async function handleCreateProposal (carBrandKey: string, carKey: string) {
    const proposalApi = new ProposalApi()
    const createdResponse = await proposalApi.save(carBrandKey, carKey)
    const proposalResponse = await proposalApi.get(createdResponse.key)
    setProposal(proposalResponse)
  }

 async function handleCreateContract (proposalKey: string, paymentPlan: number) {
    const contractApi = new ContractApi()
    const createdResponse = await contractApi.save(proposalKey, paymentPlan)
    const contractResponse = await contractApi.get(createdResponse.key)
    setContract(contractResponse)
 }

 async function handleSignContract () {
    const contractApi = new ContractApi()
     await contractApi.sign(contract?.key!)
     console.log('Go to Signed contract view')
     clearFrom()
 }

 function handleStarRefinanceCar() {
  setStarRefinanceCar(true)
 }

  return (
    <>
    <Container>
      <Landing/>
      <ContentArea>
      <>
        <SelectCarBrand
        carBrands={carBrands}
        onSelectCarBrand={handleSelecCarBrand}
        />
        <ButtonStart
        type='button'
        onClick={handleStarRefinanceCar}
        disabled={!selectedCarBrand}
        >
          Start
        </ButtonStart>
        </>
      </ContentArea>
    </Container>
    {(startRefinanceCar && selectedCarBrand) &&
      <RefCarContainer>
        <RefinanceCar carBrand={selectedCarBrand}
         proposal={proposal}
         onCreateProposal={handleCreateProposal}
         contract={contract}
         onCreateContract={handleCreateContract}
         onSignContract={handleSignContract}
         />
      </RefCarContainer>
    }
    </>
  )
}

export default Home