import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 280px;
  min-width: 20px;
  position: relative;
  justify-content: center;
  align-items: center;

  &>div {
    width: 100%;
    &>div {
      background-color: rgba(30,30,30, 1);
      height: 70px;
      border: none;
      border-radius: 0;

      &>div {
        background-color: #222222;
        &>div:hover {
          background-color: #333 !important;
        }
      }

      &>div>div {
        width: 100%;
      }

    }
  }
`

export const Option = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%
`

export const OptionImg = styled.img`
  width: 55px;
  height: auto;
`

export const OptionText = styled.span`
  font-size: 18px;
  color: #ffff;
  padding-left: 5px;
`