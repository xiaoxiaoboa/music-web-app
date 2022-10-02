import { FC, ReactElement, useEffect,memo } from "react"
import styled from "styled-components"
import Button from "../Button"
import { IoClose } from "react-icons/io5"
import { BiMessageDetail } from "react-icons/bi"

interface IProps {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const Snackbar: FC<IProps> = ({ message, setMessage }): ReactElement => {
  useEffect(() => {
    if (message.length > 0) {
      const timer = setTimeout(() => {
        setMessage("")
        clearTimeout(timer)
      }, 3000)
    }
  }, [message])

  return (
    <>
      {message.length > 0 ? (
        <Container open={message.length > 0 ? true : false}>
          <Icon>
            <BiMessageDetail className="BiMessageDetail" />
          </Icon>
          <Messages>{message}</Messages>
          <Button onClick={() => setMessage('')}>
            <IoClose className="IoClose" />
          </Button>
        </Container>
      ) : (
        <></>
      )}
    </>
  )
}
export default memo(Snackbar)

interface ContainerProps {
  open: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  position: absolute;
  top: 90px;
  background-color: ${props => props.theme.reverse_primary_bgColor};
  color: ${props => props.theme.reverse_primary_color};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 50px;
  opacity: ${props => (props.open ? 1 : 0)};
  transition: opacity 0.5s linear;

  .BiMessageDetail,
  .IoClose {
    font-size: 20px;
    color: inherit;
  }
`
const Icon = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`
const Messages = styled.div`
  flex: 2;
  white-space: nowrap;
  font-size: 14px;
  font-weight: bold;
`
