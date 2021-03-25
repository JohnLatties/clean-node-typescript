import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  height: auto;

  @media(min-width: 768px) {
    width: 50%;
  }
`