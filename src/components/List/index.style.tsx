import styled from "styled-components"

interface IProps {
  amount: number
  borderRadius?: string
  alignItems?: string
}


export const ListContainer = styled.div<IProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.amount}, 1fr);
  gap: 1.875rem 1.25rem;
`
