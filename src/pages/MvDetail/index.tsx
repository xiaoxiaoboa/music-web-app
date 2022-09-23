import React, { useRef } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import List from "../../components/List"
import MvPlayer from "../../components/MvPlayer"
import useMv from "../Home/Hooks/useMv"

const MvDetail = () => {
  const location = useLocation()
  const mvs = useMv(6)
  return (
    <Container>
      <MvPlayer />
      <MvInfo>
        <Title>幻听</Title>
        <Artist>
          <Avatar
            size={`40px`}
            src="https://p2.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=40y40"
          />
          <ArtiseName>许嵩</ArtiseName>
        </Artist>
      </MvInfo>
      <OtherMv>
        <h2>ta的MV</h2>
        <List
          amount={3}
          borderRadius={`1.25rem`}
          alignItems={`center`}
          datas={mvs}
          w={464}
          h={260}
        />
      </OtherMv>
    </Container>
  )
}

export default MvDetail

const Container = styled.div`
  padding: 0 calc(10% - 17px) 0 10%;
  /* padding: 0 calc(10%) 0 10%; */
  display: flex;
  flex-direction: column;
`
const MvInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* justify-content:center; */
`

const Title = styled.h1``

const Artist = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`
const ArtiseName = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline ${props => props.theme.secondary_color};
  }
`

const OtherMv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 20px;
`

const Recommended = styled.div`
  margin-top: 20px;
`
