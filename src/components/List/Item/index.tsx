import { FC, ReactElement, useRef, useEffect } from "react"
import {
  ItemContainer,
  Cover,
  Title,
  CoverImg
} from "./index.styled"
import { BsFillPlayFill } from "react-icons/bs"
import imgSize from "../../../utils/imgSize"
import {
  SongListType,
  MvType,
  ArtistType,
  OtherMv,
  Albums,
  FontColor
} from "../../../types"
import getNewUrl from "../../../utils/getNewUrl"
import SpecialFont from "../../SpecialFont"

interface IProps {
  w?: number
  h?: number
  type: string
  alignItems?: string
  borderRadius?: string
  data: SongListType | MvType | ArtistType | OtherMv | Albums
  toDetail: (id: number) => void
}

const Item: FC<IProps> = (props): ReactElement => {
  const { borderRadius, alignItems, data, type, w, h, toDetail } = props
  const CoverRef = useRef<HTMLImageElement>(null)
  const TitleRef = useRef<HTMLSpanElement>(null)

  return (
    <ItemContainer alignItems={alignItems}>
      <Cover>
        <CoverImg
          src={getNewUrl(
            imgSize(
              (data as SongListType).picUrl ||
                (data as MvType).cover ||
                (data as OtherMv).imgurl,
              w,
              h
            )
          )}
          borderRadius={borderRadius}
          onClick={() => toDetail(data.id)}
          ref={CoverRef}
        />
      </Cover>
      <Title ref={TitleRef}>
        <span className="name">
          <SpecialFont link to={{ path: type, id: data.id }}>
            {data.name}
          </SpecialFont>
        </span>
        {(data as MvType).artistName ? (
          <>
            <span> - </span>
            <SpecialFont
              link
              size={`12px`}
              color={FontColor.LIGHTCOLOR}
              to={{ path: "/artistdetail", id: (data as OtherMv)?.artist?.id }}
            >
              {(data as MvType).artistName}
            </SpecialFont>
          </>
        ) : (
          <></>
        )}
      </Title>
    </ItemContainer>
  )
}

export default Item
