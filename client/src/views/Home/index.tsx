import React, { useEffect, useState } from 'react'
import Landing from '../../components/Landing'
import RefinanceCar from '../../components/RefinanceCar'
import SelectCarBrand from '../../components/SelectCarBrand'
import { CarBrand } from '../../models/CarBrand'
import { CarBrandApi } from '../../services/api/carBrandApi'
import { ButtonStart, Container, ContentArea, RefCarContainer } from './styles'
interface Props {

}

function Home () {
  const [carBrands, setCarBrands] = useState<CarBrand[]>([])
  const [selectedCarBrand, setSelectedCarBrand] = useState<CarBrand| null>(null)
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
    setStarRefinanceCar(false)
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
    {startRefinanceCar &&
      <RefCarContainer>
        <RefinanceCar carBrand={selectedCarBrand!}/>
      </RefCarContainer>
    }
    </>
  )
}

export default Home