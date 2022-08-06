import { FC, ReactElement } from "react"
import {
  ItemContainer,
  Cover,
  Title,
  PlayButton,
  CoverImg
} from "./index.styled"
import { BsFillPlayFill } from "react-icons/bs"

interface IProps {
  src: string
  borderRadius?: string
  alignItems?: string
}

const Item: FC<IProps> = ({
  borderRadius,
  alignItems,
  src
}: IProps): ReactElement => {
  return (
    <ItemContainer alignItems={alignItems}>
      <Cover>
        <CoverImg src={src} alt="" borderRadius={borderRadius} />
        <PlayButton>
          <BsFillPlayFill className="BsFillPlayFill" />
        </PlayButton>
      </Cover>
      <Title>SongListItem</Title>
    </ItemContainer>
  )
}

export default Item
