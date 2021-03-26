import React from 'react'
import { Container, SideContent, Image, Title, ImageArea, SubTitle } from './styles'
import carHome from '../../assets/image/car-home.png'

function Landing() {
 return (
   <Container>
     <SideContent>
       <ImageArea>
        <Image src={carHome} alt='Car Landing'/>
       </ImageArea>
     </SideContent>
     <SideContent>
       <Title>Refinance the easy way.</Title>
       <SubTitle>Get cash or lower your payments today.</SubTitle>
     </SideContent>
   </Container>
 ) 
}

export default Landing