import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 75px;
  background-color: ${({ theme }) => theme.color.background.primary};
  box-shadow: -7px -8px 7px 6px royalblue;

  width: 100%;
  position: fixed;
  left: 0;
  z-index: 5;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1920px;
  height: 100%;
  width: 100%
`

export const SideContent = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

export const Logo = styled.span`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: 22px;
  padding-left: 20px;
`