import { FC, ReactElement } from "react"
import SongList from "../../components/SongList"
import { HomeContainer, SongListWrapper } from "./index.style"

const Home: FC = (): ReactElement => {
  return (
    <HomeContainer>
      <SongListWrapper>
        <h2>收藏的歌单</h2>
        <SongList />
      </SongListWrapper>
      <SongListWrapper>
        <h2>收藏的歌单</h2>
        <SongList />
      </SongListWrapper>
      <SongListWrapper>
        <h2>收藏的歌单</h2>
        <SongList />
      </SongListWrapper>
      <SongListWrapper>
        <h2>收藏的歌单</h2>
        <SongList />
      </SongListWrapper>
    </HomeContainer>
  )
}

export default Home
