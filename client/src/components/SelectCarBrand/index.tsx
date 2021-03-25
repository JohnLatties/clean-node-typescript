import React, { useEffect, useState } from 'react'
import { Container, Option, OptionImg, OptionText } from './styles'
import Select from 'react-select'
import { CarBrand } from '../../models/CarBrand'

interface Option {
  value: string
  label: any
}

interface SelectCarBrandProps {
  carBrands : CarBrand[],
  onSelectCarBrand: (carBrand: CarBrand) => void
}

function SelectCarBrand({ carBrands, onSelectCarBrand }:SelectCarBrandProps) {
  const [item, setItem] = useState<Option|null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    setOptions(mapCarBrandOptions(carBrands))
  },[carBrands] )

  function mapCarBrandOptions(carBrands : CarBrand[]) {
    return carBrands.map(item => ({
      value: item._id, label: <Option>
      <OptionImg src={item.image} />
        <OptionText>
          {item.name}
        </OptionText>
      </Option> 
    }))
  }

  const handleCarBrandChange = (seletedItem: any) => {
    setItem(seletedItem)
    const carBrand = carBrands.find(item => item._id === seletedItem.valeu)!
    onSelectCarBrand(carBrand)
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