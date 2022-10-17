import React, { FC, ReactElement, useEffect } from "react"
import { BsFolderPlus } from "react-icons/bs"
import { Location, useLocation } from "react-router-dom"
import styled from "styled-components"
import Button from "../../components/Button"
import List from "../../components/List"
import Loading from "../../components/Loading"
import SongsList from "../../components/SongsList"
import useAlbum from "../../Hooks/useAlbum"
import useArtistAlbum from "../../Hooks/useArtistAlbum"
import { LocationProps, SongDetailType } from "../../types"
import getNewUrl from "../../utils/getNewUrl"
import imgSize from "../../utils/imgSize"

const Album: FC = (): ReactElement => {
  const location = useLocation() as LocationProps
  const albumData = useAlbum(location.state.id)
  const albums = useArtistAlbum(albumData.album.artistId)

  return (
    <>
      {albums.list.length > 0 ? (
        <Container>
          {/* 专辑介绍 */}
          <Intro>
            <Cover>
              <img
                src={getNewUrl(imgSize(albumData.album.picUrl, 300, 300))}
                className="img"
              />
            </Cover>
            <Info>
              <Name title={albumData.album.name}>{albumData.album.name}</Name>
              <Artist>{albumData.album.artistName}</Artist>
              <Buttons>
                <Button className="collectbutton">
                  <BsFolderPlus className="BsFolderPlus" />
                  收藏专辑
                </Button>
              </Buttons>
            </Info>
          </Intro>
          {/* 专辑内歌曲 */}
          <Songs>
            <SongsList data={albumData.songs} />
          </Songs>
          {/* 此歌手其他专辑推荐 */}
          <Albums>
            <h1>其他专辑</h1>
            <List datas={albums} amount={5} w={300} h={300} />
          </Albums>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Album

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 40px;
`
const Intro = styled.div`
  display: flex;
  gap: 54px;
  overflow: hidden;
`
const Cover = styled.div`
  flex: 1;
  display: flex;
  width: 300px;
  height: 300px;

  .img {
    border-radius: 6px;
  }
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 3;
  gap: 20px;
  overflow: hidden;
`

const Name = styled.h1`
  font-size: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Artist = styled.div`
  font-size: 20px;
`
const Buttons = styled.div`
  display: flex;

  .BsFolderPlus {
    font-size: 18px;
  }

  .collectbutton {
    padding: 10px;
    border-radius: 10px;
    gap: 8px;
    background-color: ${props => props.theme.secondary_color};
    color: white;
    font-size: 16px;
  }
`
const Songs = styled.div`
  /* margin-top:20px; */
`
const Albums = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
