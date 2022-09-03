import { FC, ReactElement, useEffect, useState } from "react"
import List from "../../components/List"
import styled from "styled-components"
import useSongLists from "./Hooks/useSongLists"
import useArtists from "./Hooks/useArtists"
import useMv from "./Hooks/useMv"
import Loading from '../../components/Loading'

const Home: FC = (): ReactElement => {
  const [loaded,setLoaded] = useState<boolean>(false)
  const songLists = useSongLists()
  // const artists = useArtists()
  const mvs = useMv()

  useEffect(() => {
    if (songLists.length > 0 && mvs.length > 0) {
      setLoaded(() => true)
    }
  }, [songLists,mvs])

  return (
    <HomeContainer>
      {loaded === false ? (
        <Loading />
      ) : (
        <>
          <ListWrapper>
            <h2>推荐歌单</h2>
            <List amount={5} datas={songLists} />
          </ListWrapper>
          {/* <ListWrapper>
            <h2>推荐歌手</h2>
            <List
              amount={6}
              borderRadius={`50%`}
              alignItems={`center`}
              datas={artists}
              w={400}
              h={400}
            />
          </ListWrapper> */}
          <ListWrapper>
            <h2>推荐MV</h2>
            <List
              amount={3}
              borderRadius={`1.25rem`}
              alignItems={`center`}
              datas={mvs}
              w={464}
              h={260}
            />
          </ListWrapper>
        </>
      )}
    </HomeContainer>
  )
}

export default Home

/* style */
export const HomeContainer = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  flex: 1;
`
export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.5rem;
`
