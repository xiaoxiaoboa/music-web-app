import { FC, MouseEventHandler, ReactElement, useRef, useEffect } from "react"
import {
  ItemContainer,
  Cover,
  Title,
  PlayButton,
  CoverImg
} from "./index.styled"
import { BsFillPlayFill } from "react-icons/bs"
import imgSize from "../../../utils/imgSize"
import { SongListType, MvType, ArtistType, OtherMv } from "../../../types"

interface IProps {
  data: SongListType | MvType | ArtistType | OtherMv
  borderRadius?: string
  alignItems?: string
  w?: number
  h?: number
  toDetail: (
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
  toDetail
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
            (data as SongListType).picUrl ||
              (data as MvType).cover ||
              (data as OtherMv).imgurl,
            w,
            h
          )}
          borderRadius={borderRadius}
          onClick={e => toDetail(e, data.id, CoverRef.current!)}
          ref={CoverRef}
        />
        <PlayButton onClick={handleClick} ref={ItemRef}>
          <BsFillPlayFill className="BsFillPlayFill" />
        </PlayButton>
      </Cover>
      <Title ref={TitleRef}>
        <span
          className="name"
          onClick={e => toDetail(e, data.id, TitleRef.current!)}>
          {data.name}
        </span>
        {(data as MvType).artistName ? (
          <>
            <span> - </span>
            <span className="artist">{(data as MvType).artistName}</span>
          </>
        ) : (
          <></>
        )}
      </Title>
    </ItemContainer>
  )
}

export default Item
