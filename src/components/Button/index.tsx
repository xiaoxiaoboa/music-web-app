import { FC, MouseEventHandler, ReactNode, memo } from "react"
import styled from "styled-components"

interface IProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler
}

const Button: FC<IProps> = ({ children, onClick, className }) => {
  return (
    <MyButton onClick={onClick} className={className}>
      {children}
    </MyButton>
  )
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


  &:active {
    scale: 0.9;
  }
`
const Shadow = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  border-radius:8px;
`
const Back = styled.div``
