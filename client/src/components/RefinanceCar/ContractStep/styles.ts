import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
`

export const Description = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.color.background.primary};
`

export const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;

  &>div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 140px;

  background-color: ${({ theme }) => theme.color.background.accent};
  color: ${({ theme }) => theme.color.text.primary};
  font-size: 16px;
  
  cursor: pointer;
  border: none;
  border-radius: 0;
`