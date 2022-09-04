import { FC, MouseEventHandler, ReactElement, useRef } from "react"
import {
  ItemContainer,
  Cover,
  Title,
  PlayButton,
  CoverImg
} from "./index.styled"
import { BsFillPlayFill } from "react-icons/bs"
import { imgSize } from "../../../utils/imgSize"
import { SongListType, MvType, ArtistType } from "../../../types"

interface IProps {
  data: SongListType | MvType | ArtistType
  borderRadius?: string
  alignItems?: string
  w?: number
  h?: number
  toSongListDetail: (
    e: React.MouseEvent<Element, MouseEvent>,
    id: number,
    element: HTMLImageElement | HTMLSpanElement
  ) => void
}

const Item: FC<IProps> = ({
  borderRadius,
  alignItems,
  data,
  w,
  h,
  toSongListDetail
}: IProps): ReactElement => {
  const ItemRef = useRef<HTMLDivElement>(null)
  const CoverRef = useRef<HTMLImageElement>(null)
  const TitleRef = useRef<HTMLSpanElement>(null)
  const handleClick: MouseEventHandler = e => {
    if (e.target !== ItemRef.current) return
  }
  return (
    <ItemContainer alignItems={alignItems}>
      <Cover>
        <CoverImg
          src={imgSize(
            (data as SongListType).picUrl || (data as MvType).cover,
            w,
            h
          )}
          borderRadius={borderRadius}
          onClick={e => toSongListDetail(e, data.id, CoverRef.current!)}
          ref={CoverRef}
        />
        <PlayButton onClick={handleClick} ref={ItemRef}>
          <BsFillPlayFill className="BsFillPlayFill" />
        </PlayButton>
      </Cover>
      <Title
        onClick={e => toSongListDetail(e, data.id, TitleRef.current!)}
        ref={TitleRef}>
        {data.name}
      </Title>
    </ItemContainer>
  )
}

export default Item
