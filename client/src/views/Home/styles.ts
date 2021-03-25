import styled from 'styled-components'

const headerHeight = 75
export const Container = styled.div`
  display: flex;
  height: calc(100vh - ${headerHeight}px);
  width: 100vw;
  justify-content: center;
  position: relative;
  margin-top: ${headerHeight}px;

`

export const FormArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: absolute;
  bottom: 20px;
  width: 350px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);

  @media(min-width: 500px) {
    width: 400px;
  }
`

export const ButtonStart = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 110px;
  margin-left: 1px;

  background-color: rgba(45,45,45, .6);
  color: #fff;
  font-size: 18px;
  
  cursor: pointer;
  border: none;
  border-radius: 0;
`

export const RefCarContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
`