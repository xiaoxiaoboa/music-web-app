import { FC, ReactElement, useRef, memo } from "react"
import { ItemContainer, Cover, Title, CoverImg } from "./index.styled"
import { BsFillPlayFill } from "react-icons/bs"
import imgSize from "../../../utils/imgSize"
import { FontColor, RouterPath } from "../../../types"
import getNewUrl from "../../../utils/getNewUrl"
import SpecialFont from "../../SpecialFont"

interface Something {
  picUrl?: string
  cover?: string
  imgurl?: string
  name?: string
  artistName?: string
  coverImgUrl?:string
  id?: number
  artist?: { id: number }
  artistId?: number
}

interface IProps<T extends Something> {
  w?: number
  h?: number
  type: string
  alignItems?: string
  borderRadius?: string
  data: T
  toDetail: (id: number) => void
}

const Item = <T extends Something>(props: IProps<T>): ReactElement => {
  const { borderRadius, alignItems, data, type, w, h, toDetail } = props
  const CoverRef = useRef<HTMLImageElement>(null)
  return (
    <ItemContainer alignItems={alignItems}>
      <Cover>
        <CoverImg
          src={getNewUrl(
            imgSize(
              data.picUrl! || data.cover! || data.imgurl! || data.coverImgUrl!,
              w,
              h
            )
          )}
          borderRadius={borderRadius}
          onClick={() => toDetail(data.id!)}
          ref={CoverRef}
        />
      </Cover>
      <Title>
        <span className="name">
          <SpecialFont link to={{ path: type, id: data.id! }}>
            {data.name!}
          </SpecialFont>
        </span>
        {data.artistName ? (
          <>
            <span> - </span>
            <SpecialFont
              link
              size={`12px`}
              color={FontColor.LIGHTCOLOR}
              to={{
                path: RouterPath.ARTIST,
                id: data?.artist!?.id! || data?.artistId!
              }}
            >
              {data.artistName}
            </SpecialFont>
          </>
        ) : (
          <></>
        )}
      </Title>
    </ItemContainer>
  )
}

export default memo(Item)
