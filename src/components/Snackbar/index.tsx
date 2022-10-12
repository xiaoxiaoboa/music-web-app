import { FC, ReactElement, useEffect, memo, useState } from "react"
import styled from "styled-components"
import Button from "../Button"
import { IoClose } from "react-icons/io5"
import { BiMessageDetail } from "react-icons/bi"

interface MessageType {
  id: string
  message: string
}

const initialValue = (): MessageType[] => {
  return []
}

/* 导出的API */
let addMessage: (value: string) => void

const Snackbar: FC = (): ReactElement => {
  const [message, setMessage] = useState<MessageType[]>(initialValue)

  useEffect(() => {
    if (message.length > 8) {
      const [firstMessage] = message
      deleteMessage(firstMessage.id)
    }
  }, [message])


  /* 添加消息 */
  addMessage = (value: string) => {
    const newMessage = { id: generateRandomStrig(), message: value }
    setMessage(prev => [newMessage, ...prev])

    const timer = setTimeout(() => {
      deleteMessage(newMessage.id)
      clearTimeout(timer)
    }, 3000)
  }


  /* 删除消息  */
  const deleteMessage = (value: string) => {
   setMessage(prev => prev.filter(({ id }) => id !== value))
  }

  /* 生成随机字符串 */
  const generateRandomStrig = (): string => {
    return Math.random().toString(36).slice(-8) + new Date()
  }

  return (
    <Container>
      {message.map(({ id, message }) => (
        <Item key={id}>
          <Icon>
            <BiMessageDetail className="BiMessageDetail" />
          </Icon>
          <Messages>{message}</Messages>
          <Button onClick={() => deleteMessage(id)}>
            <IoClose className="IoClose" />
          </Button>
        </Item>
      ))}
    </Container>
  )
}

export { addMessage }
export default memo(Snackbar)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 90px;
  right: 30px;
  color: ${props => props.theme.reverse_primary_color};
  align-items: flex-end;
  gap: 12px;
  z-index: 999;

  .BiMessageDetail,
  .IoClose {
    font-size: 20px;
    color: inherit;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.reverse_primary_bgColor};
  border-radius: 8px;
  gap: 0px;
  min-width: 200px;
  height: 50px;
`

const Icon = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 8px; */
  position: relative;
  width: 36px;
  height: 36px;

  .BiMessageDetail {
    position: absolute;
    top: 6px;
    margin: 4px;
  }
`
const Messages = styled.div`
  flex: 2;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
`
