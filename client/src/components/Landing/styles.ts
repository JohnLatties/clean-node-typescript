import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 85%;

  @media(min-width: 920px) {
    flex-direction: row;
  }
`

export const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 50%;
  width: 100%;

  @media(min-width: 920px) {
    width: 50%;
    height: 100%;
  }
`

export const ImageArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;

`

export const Image = styled.img`
  width: 100%;
  height: auto;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.secundary};
  font-size: 25px;
  font-weight: 800;
  text-align: center;

  @media(min-width: 520px) {
    font-size: 35px;
  }

  @media(min-width: 920px) {
    font-size: 85px;
    padding-top: 80px;
  }
`

export const SubTitle = styled.h3`
  color: ${({ theme }) => theme.color.aux.secundary};
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  padding-top: 20px;

  @media(min-width: 520px) {
    font-size: 25px;
  }

  @media(min-width: 920px) {
    font-size: 45px;
  }
`