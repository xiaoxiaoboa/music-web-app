import styled, { keyframes } from "styled-components"

interface IProps {
  borderRadius?: string
  alignItems?: string
}



/* Item组件 > div */
export const ItemContainer = styled.div<IProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: ${props => props.alignItems};

  /* Item组件 > div:hover */
  &:hover {
    & div {
      opacity:1;
      bottom: 2.5rem;
    }
  }

  /* Item组件 > div > img */
  & img {
    width: 100%;
    border-radius: ${props => props.borderRadius};
  }

  /* Item组件 > div > div */
  & div {
    opacity: 0;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0.625rem;
    bottom: 1.5rem;
    border-radius: 50%;
    background-color: #f9f3f3;
    padding: 0.625rem;
    cursor: pointer;
    transition: all .2s linear;

    /* Item组件 > div > div:hover */
    &:hover {
      & span {
        color: ${props => props.theme.nav_hoverColor};
      }
    }

    /* Item组件 > div > div > icon */
    & span {
      display: flex;
      color: black;
    }
  }
`
