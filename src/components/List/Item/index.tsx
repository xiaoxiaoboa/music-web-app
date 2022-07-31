import { FC, ReactElement } from "react"
import { ItemContainer, Cover, Title } from "./index.styled"
import { PlayOne } from "@icon-park/react"

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
      <Cover borderRadius={borderRadius}>
        <img src={src} alt="" />
        <div>
          <PlayOne size="1.625rem" theme="filled" />
        </div>
      </Cover>
      <Title>SongListItem</Title>
    </ItemContainer>
  )
}

export default Item
