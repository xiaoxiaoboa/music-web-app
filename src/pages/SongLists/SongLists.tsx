import { FC, ReactElement, memo, useState, useMemo } from "react"
import styled from "styled-components"
import useSongLists from "./useSongLists"
import { CategoryType } from "./types"
import List from "../../components/List"
import { addMessage } from "../../components/Snackbar"
import Button from "../../components/Button"

const categoryArr: string[] = [
  CategoryType.ALL,
  CategoryType.BALLAD,
  CategoryType.CANTONESE,
  CategoryType.CHINESE,
  CategoryType.CLASSICAL,
  CategoryType.EAA,
  CategoryType.LIGHTMUSIC,
  CategoryType.POPULAR
]

const SongLists: FC = (): ReactElement => {
  const [page, setPage] = useState<number>(1)
  const [category, setCategory] = useState<string>(CategoryType.ALL)
  const playLists = useSongLists(page, category, 20)

  const updateCategory = useMemo(
    () => (value: string) => {
      if (category === value) return
      setCategory(() => value)
    },
    [category]
  )

  return (
    <Container>
      <Category>
        {categoryArr.map(str => (
          <Item
            key={categoryArr.indexOf(str)}
            onClick={() => updateCategory(str)}
            visited={category === str ? true : false}
          >
            {str}
          </Item>
        ))}
      </Category>
      <Content>
        <List amount={5} datas={playLists} w={300} h={300} />
      </Content>

      <Bottom>
        {playLists.list.length < 1 ? (
          <></>
        ) : (
          <Button
            className="loadmore"
            onClick={() => setPage(prev => prev + 1)}
          >
            加载更多
          </Button>
        )}
      </Bottom>
    </Container>
  )
}

export default memo(SongLists)

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 20px;
  gap: 40px;
`

const Category = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`

interface ItemProps {
  visited: boolean
}
const Item = styled.div<ItemProps>`
  font-size: 20px;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${props =>
    props.visited ? props.theme.hover_BgColor : "unset"};
  color: ${props => (props.visited ? props.theme.secondary_color : "inherit")};

  &:hover {
    background-color: ${props => props.theme.hover_BgColor};
  }
`

const Content = styled.div`
  display: flex;
`

const Bottom = styled.div`
  display: flex;
  justify-content: center;

  .loadmore {
    background-color: ${props => props.theme.hover_BgColor};
    color: inherit;
  }
`
