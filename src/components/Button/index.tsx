import {
  FC,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  forwardRef
} from "react"
import styled from "styled-components"

interface IProps {
  children: ReactNode
  onClick?: MouseEventHandler
}

const Button: FC<IProps> = ({ children, onClick }) => {
  return (
    <MyButton onClick={onClick}>
      {children}
    </MyButton>
  )
}
export default Button

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
