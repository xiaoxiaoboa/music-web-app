import { FC, ReactElement, useRef } from "react"
import List from "../../components/List"
import styled from "styled-components"
import { useArtists, useMv, useSongLists } from "../../Hooks"
import Loading from "../../components/Loading"

const Home: FC = (): ReactElement => {
  const testRef = useRef<HTMLDivElement>(null)
  const songLists = useSongLists(10)
  const artists = useArtists()
  const mvs = useMv(3)


  return (
    <>
      {songLists.list.length  < 1 ? (
        <Loading />
      ) : (
        <HomeContainer>
          <ListWrapper>
            <h1>推荐歌单</h1>
            <List amount={5} datas={songLists} w={300} h={300}/>
          </ListWrapper>
          <ListWrapper>
            <h1>推荐歌手</h1>
            <List
              amount={6}
              borderRadius={`50%`}
              alignItems={`center`}
              datas={artists}
              w={400}
              h={400}
            />
          </ListWrapper>
          <ListWrapper ref={testRef}>
            <h1>推荐MV</h1>
            <List
              amount={3}
              borderRadius={`1.25rem`}
              alignItems={`center`}
              datas={mvs}
              w={464}
              h={260}
            />
          </ListWrapper>
        </HomeContainer>
      )}
    </>
  )
}

export default Home

/* style */
const HomeContainer = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.5rem;
`
