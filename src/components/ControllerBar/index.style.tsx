import styled from "styled-components"

export const ControllerBarContainer = styled.div`
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.0625rem solid #9370db;

`
export const ControllerWrapper = styled.div`
  display: flex;
  width: 90%;
`

export const SongCover = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & img {
    width: 3.75rem;
    border-radius: 0.3125rem;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;

    & span {
      font-size: 1.125rem;
      & ~ span {
        font-size: 0.875rem;
      }
    }
  }
`

export const MiddleButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  & svg {
    color: ${props => props.theme.controllerButton_color};
  }

  & .FaPlay {
    font-size: 28px;
  }
  & .FaStepBackward,
  .FaStepForward {
    font-size: 20px;
  }
`
export const RightButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;

  & div {
    display: flex;
    align-items: center;
  }

  & svg{
    font-size: 20px;
  }
`
export const Button = styled.button`
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: unset;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.hover_BgColor};
  }
`