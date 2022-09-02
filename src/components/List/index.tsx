import { FC, ReactElement } from "react"
import { ListContainer } from "./index.style"
import Item from "./Item"
import { SongListType, MvType, ArtistType } from "../../types"

interface IProps {
  datas: SongListType[] | MvType[] | ArtistType[]
  amount: number
  borderRadius?: string
  alignItems?: string
  w?: number
  h?: number
}

const List: FC<IProps> = ({
  datas,
  amount,
  borderRadius = `.625rem`,
  alignItems = `stretch`,
  w,
  h
}: IProps): ReactElement => {
  return (
    <ListContainer amount={amount}>
      {datas.map((obj:any) => {
        return (
          <Item key={obj.id} borderRadius={borderRadius} alignItems={alignItems} data={obj} w={w} h={h} />
        )
      })}
    </ListContainer>
  )
}

export default List
