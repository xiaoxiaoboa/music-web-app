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
      bottom: 0.625rem;
    }
  }
`
export const CoverImg = styled.img<CoverProps>`
  width: 100%;
  cursor: pointer;
  border-radius: ${props => props.borderRadius};
`


export const Title = styled.span`

  .name {
    font-weight: bold;
  }
`
