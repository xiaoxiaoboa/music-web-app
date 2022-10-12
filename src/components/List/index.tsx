import { FC, ReactElement, useEffect, useCallback } from "react"
import { ListContainer } from "./index.style"
import Item from "./Item"
import { SongListType, MvType, ArtistType, OtherMv, Albums } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"

interface IProps {
  datas: {
    type: string
    list: SongListType[] | MvType[] | ArtistType[] | OtherMv[] | Albums[]
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

  const toDetail = useCallback((id: number) => {
    navigate(datas.type, { state: { id } })
  }, [])

  return (
    <ListContainer amount={amount}>
      {datas.list.map(
        (obj: SongListType | MvType | ArtistType | OtherMv | Albums) => {
          return (
            <Item
              w={w}
              h={h}
              data={obj}
              key={obj.id}
              type={datas.type}
              borderRadius={borderRadius}
              alignItems={alignItems}
              toDetail={toDetail}
            />
          )
        }
      )}
    </ListContainer>
  )
}

export default List
