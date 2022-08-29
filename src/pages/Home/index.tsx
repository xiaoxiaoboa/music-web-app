import { FC, ReactElement, useEffect } from "react"
import List from "../../components/List"
import styled from "styled-components"
import {get} from '../../utils/request'


const Home: FC = (): ReactElement => {

  // useEffect(() => {
  //   const res = get("top/song?type=7")
  //   res.then(res => console.log(res))
  // },[])


  const artist =
    "https://p2.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=512y512"

    const songList =
      "https://p2.music.126.net/_ybcEpYdUVxuCct1yQwpyg==/109951163093420045.jpg?param=512y512"

    const mvCover =
      "https://p1.music.126.net/KM6GD1xo8pU1KLzFDgktnw==/109951167666163933.jpg?param=464y260"
      
  return (
    <HomeContainer>
      <ListWrapper>
        <h2>收藏的歌单</h2>
        <List amount={5} src={songList} />
      </ListWrapper>
      <ListWrapper>
        <h2>推荐歌手</h2>
        <List
          amount={6}
          borderRadius={`50%`}
          alignItems={`center`}
          src={artist}
        />
      </ListWrapper>
      <ListWrapper>
        <h2>推荐MV</h2>
        <List
          amount={3}
          borderRadius={`1.25rem`}
          alignItems={`center`}
          src={mvCover}
        />
      </ListWrapper>
    </HomeContainer>
  )
}

export default Home


/* style */
export const HomeContainer = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
`
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.5rem;
`
