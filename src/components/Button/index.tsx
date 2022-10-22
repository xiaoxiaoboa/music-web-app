import { FC, MouseEventHandler, ReactNode, memo } from "react"
import styled from "styled-components"

interface IProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler
  title?: string
  disabled?: boolean
}

const Button: FC<IProps> = props => {
  const { children, onClick, className, title, disabled } = props
  return (
    <MyButton
      onClick={onClick}
      className={className}
      title={title}
      disabled={disabled}
    >
      {children}
    </MyButton>
  )
}
export default memo(Button)

interface ButtonProps {
  disalbed?: boolean
}

const MyButton = styled.button<ButtonProps>`
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: ${props =>
    props.disabled ? "#696969 !important" : "unset"};
  cursor: ${props => (props.disabled ? "unset" : "pointer")};
  color: ${props => (props.disabled ? "#A9A9A9 !important" : "inherit")};

  &:active {
    scale: ${props => (props.disabled ? "1" : "0.9")};
  }
`
