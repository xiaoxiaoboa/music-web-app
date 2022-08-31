import { FC, ReactElement } from "react"
import { ListContainer } from "./index.style"
import { ListTpye } from "../../types"
import Item from "./Item"

interface IProps {
  lists: ListTpye[]
  amount: number
  borderRadius?: string
  alignItems?: string
}

const List: FC<IProps> = ({
  lists,
  amount,
  borderRadius = `.625rem`,
  alignItems = `stretch`
}: IProps): ReactElement => {
  return (
    <ListContainer amount={amount}>
      {lists.map(obj => {
        return (
          <Item borderRadius={borderRadius} alignItems={alignItems} songList={obj} />
        )
      })}
    </ListContainer>
  )
}

export default List
