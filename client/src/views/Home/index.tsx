import React from 'react'
import Landing from '../../components/Landing'
import SelectCarBrand from '../../components/SelectCarBrand'
import { ButtonStart, Container, FormArea } from './styles'
interface Props {

}

function Home () {
  return (
    <Container>
      <Landing/>
      <FormArea>
        <SelectCarBrand/>
        <ButtonStart> Start</ButtonStart>
      </FormArea>
    </Container>
  )
}

export default Home