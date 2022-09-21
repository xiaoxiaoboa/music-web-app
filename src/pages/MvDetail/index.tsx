import React, { useRef } from "react"
import styled from "styled-components"
import MvPlayer from "../../components/MvPlayer"

const MvDetail = () => {
  return (
    <Container>
      <MvPlayer />
    </Container>
  )
}

export default MvDetail

const Container = styled.div`
  /* padding: 0 calc(10% - 17px) 1.25rem 10%; */
  padding: 0 calc(10%) 0 10%;
  display: flex;
  flex-direction: column;
`
