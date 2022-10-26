import React, { FC, ReactElement, memo } from "react"
import { BsFolderPlus } from "react-icons/bs"
import { Location, useLocation } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import Button from "../../components/Button"
import List from "../../components/List"
import Loading from "../../components/Loading"
import { addMessage } from "../../components/Snackbar"
import SongsList from "../../components/SongsList"
import useAlbum from "./useAlbum"
import useArtistAlbum from "../../Hooks/useArtistAlbum"
import { UserLikedAlbums, UserState } from "../../recoil"
import { LocationProps, SongDetailType } from "../../types"
import { request } from "../../utils"
import getNewUrl from "../../utils/getNewUrl"
import imgSize from "../../utils/imgSize"

const Album: FC = (): ReactElement => {
  const location = useLocation() as LocationProps
  const albumData = useAlbum(location.state.id)
  const albums = useArtistAlbum(albumData.album?.artist?.id)
  const userInfo = useRecoilValue(UserState)
  const [userLikedAlbums, setUserLikedAlbums] = useRecoilState(UserLikedAlbums)



  /* 处理收藏和取消收藏专辑 */
  const handleLike = () => {
    if(!userInfo) return addMessage("请先登录！！")
    const isLiked = userLikedAlbums.findIndex(
      obj => obj.id === albumData.album.id
    )
    const rel = isLiked === -1 ? 1 : 0 // 1:收藏 0:取消收藏
    request("album/sub", "GET", `&id=${albumData.album.id}&t=${rel}`).then(
      res => {
        if (res.code === 200) {
          if (rel === 1) {
            setUserLikedAlbums(prev => [...prev, albumData.album])
            addMessage("收藏专辑成功")
          } else {
            setUserLikedAlbums(prev =>
              prev.filter(obj => obj.id !== albumData.album.id)
            )
            addMessage("取消收藏")
          }
        }
      }
    )
    .catch(err => {
      addMessage('操作失败')
      console.log(err)
    })
  }

  return (
    <>
      {albums.list.length > 0 ? (
        <Container>
          <Intro>
            <Cover>
              <img
                src={getNewUrl(imgSize(albumData.album.picUrl, 300, 300))}
                className="img"
              />
            </Cover>
            <Info>
              <Name title={albumData.album.name}>{albumData.album.name}</Name>
              <Artist>{albumData.album.artist.name}</Artist>
              <Buttons>
                <Button className="collectbutton" onClick={handleLike}>
                  <BsFolderPlus className="BsFolderPlus" />
                  {userLikedAlbums.findIndex(
                    obj => obj.id === albumData.album.id
                  ) === -1
                    ? "收藏专辑"
                    : "取消收藏"}
                </Button>
              </Buttons>
            </Info>
          </Intro>
          <Songs>
            <SongsList data={albumData.songs} />
          </Songs>
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

export default memo(Album)

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
