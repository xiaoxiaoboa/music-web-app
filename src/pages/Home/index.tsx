import { FC, ReactElement, useEffect, useState } from "react"
import List from "../../components/List"
import styled from "styled-components"
import useSongLists from "./Hooks/useSongLists"

const Home: FC = (): ReactElement => {
  const songLists = useSongLists()
  


  return (
    <HomeContainer>
      <ListWrapper>
        <h2>推荐歌单</h2>
        <List amount={5} lists={songLists} />
      </ListWrapper>
      {/* <ListWrapper>
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
      </ListWrapper> */}
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
