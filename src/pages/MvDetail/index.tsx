import React, { useRef } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import MvPlayer from "../../components/MvPlayer"

const MvDetail = () => {
  const location = useLocation()
  console.log(location)
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
          <div>许嵩</div>
        </Artist>
      </MvInfo>
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
