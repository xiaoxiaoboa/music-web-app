import { FC, ReactElement, useCallback } from "react"
import { ListContainer } from "./index.style"
import Item from "./Item"
import { useNavigate } from "react-router-dom"

interface KeyProps {
  id: number
}

interface IProps<T extends KeyProps> {
  datas: {
    type: string
    list: T[]
  }
  amount: number
  borderRadius?: string
  alignItems?: string
  w?: number
  h?: number
}

const List = <T extends KeyProps>({
  datas,
  amount,
  borderRadius = `.625rem`,
  alignItems = `stretch`,
  w,
  h
}: IProps<T>): ReactElement => {
  const navigate = useNavigate()

  const toDetail = useCallback((id: number) => {
    navigate(datas.type, { state: { id } })
  }, [])

  return (
    <ListContainer amount={amount}>
      {datas.list.map((obj: T) => {
        return (
          <Item
            key={obj.id + datas.list.indexOf(obj)}
            w={w}
            h={h}
            data={obj}
            type={datas.type}
            borderRadius={borderRadius}
            alignItems={alignItems}
            toDetail={toDetail}
          />
        )
      })}
    </ListContainer>
  )
}

export default List
