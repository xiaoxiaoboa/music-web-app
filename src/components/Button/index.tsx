import { FC, MouseEventHandler, ReactNode,memo } from "react"
import styled from "styled-components"

interface IProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler
}

const Button: FC<IProps> = ({ children, onClick, className }) => {
  return <MyButton onClick={onClick} className={className} >{children}</MyButton>
}
export default memo(Button)

const MyButton = styled.button`
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: unset;
  cursor: pointer;
  color: inherit;

  &:hover {
    background-color: ${props => props.theme.hover_BgColor};
  }
`
