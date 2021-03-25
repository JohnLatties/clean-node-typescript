import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 280px;
  width: 100%;
`

export const ContainerScroll = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.color.background.accent};

  width: calc(100% - 30px);
  height: 180px;

  white-space: nowrap;
  overflow-x: auto;

  flex-wrap: nowrap;
  overflow-x: auto;
  padding-right: 30px;

  -webkit-overflow-scrolling: touch;
`

interface CardProp {
  isSeleted: boolean
}

export const Card = styled.div<CardProp>`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 250px;
  border-radius: 4px;
  background-color: ${({ isSeleted, theme }) => isSeleted ? theme.color.background.secundary : theme.color.primary};

  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;

  h3 {
    color:  ${({ theme }) => theme.color.text.primary};
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 220px;
    overflow: hidden;
  }
`

interface CarImageProps {
  src: string
}
export const CarImage = styled.div<CarImageProps>`
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: contain;
  height: 60%;
  width: 60%;
`

export const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 5px 0px;
`

export const SlectedCarDescription = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.secundary};
  text-align: center;

  span {
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.color.text.accent};
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 140px;
  margin-top: 3px;

  background-color: ${({ theme }) => theme.color.background.accent};
  color: ${({ theme }) => theme.color.text.primary};
  font-size: 16px;
  
  cursor: pointer;
  border: none;
  border-radius: 0;
`
