import { FC, ReactElement } from "react"
import { ItemContainer } from "./index.styled"
import { PlayOne } from '@icon-park/react'

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
    <ItemContainer borderRadius={borderRadius} alignItems={alignItems}>
      <img src={src} alt="" />
      <span>SongListItem</span>
      <div>
        <PlayOne  size="1.625rem" theme="filled"/>
      </div>
    </ItemContainer>
  )
}

export default Item
