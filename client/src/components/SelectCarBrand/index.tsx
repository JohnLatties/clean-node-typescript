import React, { useState } from 'react'
import { Container, Option, OptionImg, OptionText } from './styles'
import Select from 'react-select'

interface Option {
  value: string
  label: any
}

function SelectCarBrand() {
  const [carBrand, setCarBrand] = React.useState('');
  const [item, setItem] = React.useState<Option|null>(null);
  const options = [
    { value: 'Chevrolet', label: <Option>
      <OptionImg src='https://static.wixstatic.com/media/b00f6a_b64a3abcab8745aa9ee467ce9649fdd3~mv2.png' />
      <OptionText>
      Chevrolet
      </OptionText>
       </Option> },
    { value: 'Acura', label: <Option>
    <OptionImg src='https://static.wixstatic.com/media/b00f6a_33d9b2dc534d415fafc24a9af26bdc85~mv2.png' />
    <OptionText>
      Acura
      </OptionText>
     </Option> },
    { value: 'Chevrolet', label: <Option>
      <OptionImg src='https://static.wixstatic.com/media/b00f6a_b64a3abcab8745aa9ee467ce9649fdd3~mv2.png' />
      <OptionText>
      Chevrolet
      </OptionText>
       </Option> },
    { value: 'Acura', label: <Option>
    <OptionImg src='https://static.wixstatic.com/media/b00f6a_33d9b2dc534d415fafc24a9af26bdc85~mv2.png' />
    <OptionText>
      Acura
      </OptionText>
     </Option> },
    { value: 'Chevrolet', label: <Option>
      <OptionImg src='https://static.wixstatic.com/media/b00f6a_b64a3abcab8745aa9ee467ce9649fdd3~mv2.png' />
      <OptionText>
      Chevrolet
      </OptionText>
       </Option> },
    { value: 'Acura', label: <Option>
    <OptionImg src='https://static.wixstatic.com/media/b00f6a_33d9b2dc534d415fafc24a9af26bdc85~mv2.png' />
    <OptionText>
      Acura
      </OptionText>
     </Option> },
    { value: 'Chevrolet', label: <Option>
      <OptionImg src='https://static.wixstatic.com/media/b00f6a_b64a3abcab8745aa9ee467ce9649fdd3~mv2.png' />
      <OptionText>
      Chevrolet
      </OptionText>
       </Option> },
    { value: 'Acura', label: <Option>
    <OptionImg src='https://static.wixstatic.com/media/b00f6a_33d9b2dc534d415fafc24a9af26bdc85~mv2.png' />
    <OptionText>
      Acura
      </OptionText>
     </Option> },
    { value: 'Honda', label: <Option>
    <OptionImg src='https://static.wixstatic.com/media/b00f6a_7cd42245f1d54de1a531895b3eddcfe6~mv2.png' />
    <OptionText>
      Honda
      </OptionText>
     </Option> }
  ];

  const handleCarBrandChange = (category: any) => {
     console.log(category);
     setItem(category)
 }
  return (
    <Container>
    <Select
        value={item}
        onChange={handleCarBrandChange}
        options={options}
        isSearchable
        menuPlacement='top'
      />

        
    </Container>
  )
}


export default SelectCarBrand