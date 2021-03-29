import React, { useEffect, useState } from 'react'
import Landing from '../../components/Landing'
import RefinanceCar from '../../components/RefinanceCar'
import SelectCarBrand from '../../components/SelectCarBrand'
import { CarBrand } from '../../models/CarBrand'
import { Proposal } from '../../models/Proposal'
import { CarBrandApi } from '../../services/api/carBrandApi'
import { ProposalApi } from '../../services/api/refinancingProposalApi'
import { ButtonStart, Container, ContentArea, RefCarContainer } from './styles'


function Home () {
  const [carBrands, setCarBrands] = useState<CarBrand[]>([])
  const [selectedCarBrand, setSelectedCarBrand] = useState<CarBrand| undefined>(undefined)
  const [proposal, setProposal] = useState<Proposal | undefined>(undefined)
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
    setSelectedCarBrand(carBrand)
    setProposal(undefined)
    setStarRefinanceCar(false)
 }

 async function handleCreateProposal (carBrandKey: string, carKey: string) {
    const proposalApi = new ProposalApi()
    const createdResponse = await proposalApi.save(carBrandKey, carKey)
    const proposalResponse = await proposalApi.get(createdResponse.key)
    setProposal(proposalResponse)
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
         />
      </RefCarContainer>
    }
    </>
  )
}

export default Home