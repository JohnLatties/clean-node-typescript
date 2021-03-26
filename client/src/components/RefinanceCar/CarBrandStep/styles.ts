import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20px;
`

export const Image = styled.img`
  width: 30%;
  height: auto;
`
export const Name = styled.span`
  font-size: 30px;
  color: ${({ theme }) => theme.color.text.secundary}
`