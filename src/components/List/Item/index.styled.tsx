import styled from "styled-components"

interface ItemProps {
  alignItems?: string
}
interface CoverProps {
  borderRadius?: string
}

/* Item组件 > div */
export const ItemContainer = styled.div<ItemProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: ${props => props.alignItems};
`

/* 封面容器 */
export const Cover = styled.div`
  display: flex;

  &:hover {
    & div {
      opacity: 1;
      bottom: 2.5rem;
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
  bottom: 2.25rem;
  border-radius: 50%;
  background-color: #f9f3f3;
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
    color: black;
    font-size: 1.625rem;
  }
`

export const Title = styled.span`
  &:hover {
    text-decoration: underline #9370db;
    cursor: pointer;
  }
`
