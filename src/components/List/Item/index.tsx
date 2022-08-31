import { FC, ReactElement } from "react"
import {
  ItemContainer,
  Cover,
  Title,
  PlayButton,
  CoverImg
} from "./index.styled"
import { BsFillPlayFill } from "react-icons/bs"
import { ListTpye } from "../../../types"

interface IProps {
  songList: ListTpye
  borderRadius?: string
  alignItems?: string
}

const Item: FC<IProps> = ({
  borderRadius,
  alignItems,
  songList
}: IProps): ReactElement => {
  return (
    <ItemContainer alignItems={alignItems}>
      <Cover>
        <CoverImg src={songList.picUrl} alt="" borderRadius={borderRadius} />
        <PlayButton>
          <BsFillPlayFill className="BsFillPlayFill" />
        </PlayButton>
      </Cover>
      <Title>{songList.name}</Title>
    </ItemContainer>
  )
}

export default Item
