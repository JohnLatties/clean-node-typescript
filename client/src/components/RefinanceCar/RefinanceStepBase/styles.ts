import styled, { keyframes } from 'styled-components'

const fade = keyframes`
  from {
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 0.6s ease-out, transform 1.2s ease-out;
    will-change: opacity, visibility;
  }

  to {
    transform: rotate(360deg);
    opacity: 1;
    transform: none;
    visibility: visible;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: auto;
  min-height: 80px;
  animation: ${fade} 0.8s;

  border-radius: 8px;
  border: 1.5px solid;
  border-color: ${({ theme }) => theme.color.secundary};
  background-color: #d4d4d4;
  padding: 5px 5px 28px 5px;
  
`

export const Title = styled.h1`
  font-size: 22px;
  color: ${({ theme }) => theme.color.text.secundary};
  text-align: left;
  margin-bottom: 5px;
`