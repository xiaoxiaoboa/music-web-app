import React, { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import List from "../../components/List"
import Loading from "../../components/Loading"
import MvPlayer from "../../components/MvPlayer"
import { LocationProps, MvDataType, Data, MvUrl } from "../../types"
import { request } from "../../utils/request"
import useArtistMvs from "./Hooks/useArtistMvs"


interface StateType {
  detail: Data
  url: MvUrl
}

const MvDetail = () => {
  const location = useLocation() as LocationProps
  const [state, setState] = useState<StateType>({} as StateType)
  const mvs = useArtistMvs(state?.detail?.artistId, location.state.id, 3)


  useEffect(() => {
    request("mv/detail", "GET", `&mvid=${location.state.id}`).then(
      (res: MvDataType) =>
        setState(prev => ({ ...prev, ...{ detail: res.data } }))
    )
  }, [location.state.id])

  useEffect(() => {
    if (state.detail === undefined) return
    request("mv/url", "GET", `&id=${location.state.id}`).then((res: MvUrl) =>
      setState(prev => ({ ...prev, ...{ url: res } }))
    )
  }, [state.detail])

  return (
    <>
      {state?.url?.data.url && mvs.list.length > 0 ? (
        <Container>
          <MvPlayer src={state?.url?.data.url} poster={state?.detail.cover} />
          <MvInfo>
            <Title>{state.detail?.name}</Title>
            <Artist>
              <Avatar size={`40px`} src={state?.detail?.artists[0].img1v1Url} />
              <ArtiseName>{state?.detail?.artists[0].name}</ArtiseName>
            </Artist>
          </MvInfo>
          <OtherMv>
            <h2>其他MV</h2>
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
      ) : (
        <Loading />
      )}
    </>
  )
}

export default MvDetail

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.875rem 10%;
  display: flex;
  flex-direction: column;
`
const MvInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

const Title = styled.h1``

const Artist = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
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
  margin-top: 1.25rem;
`
