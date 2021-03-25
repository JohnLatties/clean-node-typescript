import React, { useEffect, useState } from 'react'
import Landing from '../../components/Landing'
import SelectCarBrand from '../../components/SelectCarBrand'
import { CarBrand } from '../../models/CarBrand'
import { CarBrandApi } from '../../services/api/carBrandApi'
import { ButtonStart, Container, FormArea, RefCarContainer } from './styles'
interface Props {

}

function Home () {
  const [carBrands, setCarBrands] = useState<CarBrand[]>([])
  const [selectedCarBrand, setSelectedCarBrand] = useState<CarBrand| null>(null)
  const [startSimulation, setStartSimulation] = useState<boolean>(false)
  useEffect(() => {
    loadCarBrands()
  }, [])

 async function loadCarBrands() {
  const carBrandApi = new CarBrandApi()
  const result =  await carBrandApi.getAll() 
  console.log(result)
  setCarBrands(result)
 }

 function handleSelecCarBrand(carBrand:CarBrand) {
    setSelectedCarBrand(carBrand)
    setStartSimulation(false)
 }

  return (
    <>
    <Container>
      <Landing/>
      <FormArea>
        <SelectCarBrand
        carBrands={carBrands}
        onSelectCarBrand={handleSelecCarBrand}
        />
        <ButtonStart> Start</ButtonStart>
      </FormArea>
    </Container>
    {startSimulation &&
      <RefCarContainer>

      </RefCarContainer>
    }
    </>
  )
}

export default Home