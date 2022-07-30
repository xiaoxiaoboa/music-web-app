import { FC, ReactElement } from "react"
import { ListContainer } from "./index.seyle"

import Item from "./Item"

interface IProps {
  src: string
  amount: number
  borderRadius?: string
  alignItems?: string
}

const List: FC<IProps> = ({
  src,
  amount,
  borderRadius = `.625rem`,
  alignItems = `stretch`
}: IProps): ReactElement => {
  return (
    <ListContainer amount={amount}>
      <Item borderRadius={borderRadius} alignItems={alignItems} src={src} />
      <Item borderRadius={borderRadius} alignItems={alignItems} src={src} />
      <Item borderRadius={borderRadius} alignItems={alignItems} src={src} />
      <Item borderRadius={borderRadius} alignItems={alignItems} src={src} />
      <Item borderRadius={borderRadius} alignItems={alignItems} src={src} />
    </ListContainer>
  )
}

export default List

