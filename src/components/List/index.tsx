import { FC, ReactElement, useEffect } from "react"
import { ListContainer } from "./index.style"
import Item from "./Item"
import { SongListType, MvType, ArtistType } from "../../types"
import { useNavigate } from "react-router-dom"

interface IProps {
  datas: {
    type: string
    list: SongListType[] | MvType[] | ArtistType[]
  }
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
  const navigate = useNavigate()

  const toSongListDetail = (
    e: React.MouseEvent,
    id: number,
    element: HTMLImageElement | HTMLSpanElement,
    type: string
  ) => {
    if (e.target !== element) return
    navigate(type, { state: { id } })
  }


  return (
    <ListContainer amount={amount}>
      {datas.list.map((obj: any) => {
        return (
          <Item
            key={obj.id}
            borderRadius={borderRadius}
            alignItems={alignItems}
            data={obj}
            type={datas.type}
            w={w}
            h={h}
            toSongListDetail={toSongListDetail}
          />
        )
      })}
    </ListContainer>
  )
}

export default List
