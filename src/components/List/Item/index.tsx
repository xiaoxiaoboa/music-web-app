import { FC, ReactElement } from "react"
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
}

const Item: FC<IProps> = ({
  borderRadius,
  alignItems,
  data,
  w,
  h
}: IProps): ReactElement => {
  return (
    <ItemContainer alignItems={alignItems}>
      <Cover>
        <CoverImg
          src={imgSize(
            (data as SongListType).picUrl || (data as MvType).cover,
            w,
            h
          )}
          alt=""
          borderRadius={borderRadius}
        />
        <PlayButton>
          <BsFillPlayFill className="BsFillPlayFill" />
        </PlayButton>
      </Cover>
      <Title>{data.name}</Title>
    </ItemContainer>
  )
}

export default Item
