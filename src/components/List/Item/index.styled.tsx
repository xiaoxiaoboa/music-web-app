import styled from "styled-components"

interface ItemProps {
  alignItems?: string
}
interface CoverProps {
  borderRadius?: string
}

/* Item组件 > div */
export const ItemContainer = styled.div<ItemProps>`
  
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: ${props => props.alignItems};
`

/* 封面容器 */
export const Cover = styled.div`
  display: flex;
  position: relative;

  &:hover {
    & div {
      opacity: 1;
      bottom: .625rem;
    }
  }
`
export const CoverImg = styled.img<CoverProps>`
  width: 100%;
  cursor: pointer;
  border-radius: ${props => props.borderRadius};
`

export const PlayButton = styled.div`
  opacity: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0.625rem;
  bottom: .25rem;
  border-radius: 50%;
  background-color: rgb(238 233 233 / 30%);
  backdrop-filter: blur(10px);
  padding: 0.625rem;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    .BsFillPlayFill {
      color: ${props => props.theme.secondary_color};
    }
  }
  .BsFillPlayFill {
    display: flex;
    color: #ffffffcc;
    font-size: 1.625rem;
  }
`

export const Title = styled.span`
  /* &:hover {
    text-decoration: underline #9370db;
    cursor: pointer;
  } */

  .name {
    font-weight: bold;
  }
  .artist {
    font-size: 12px;
    color: ${props => props.theme.light_color};
  }

  .name:hover,
  .artist:hover {
    text-decoration: underline ${props => props.theme.secondary_color};
    cursor: pointer;
  }
`
