import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import List from "../../components/List"
import Loading from "../../components/Loading"
import SongsList from "../../components/SongsList"
import { useArtistMvs } from "../../Hooks"
import useArtistAlbum from "../../Hooks/useArtistAlbum"
import { LocationProps, Track, TopSong } from "../../types"
import { request } from "../../utils/request"

const ArtistDetail = () => {
  const location = useLocation() as LocationProps
  const [tracks, setTracks] = useState<Track[]>([])
  const albums = useArtistAlbum(location.state.id)
  const mvs = useArtistMvs(location.state.id, 6)

  useEffect(() => {
    request("artist/top/song", "GET", `&id=${location.state.id}`).then(
      (res: TopSong) => setTracks(res.songs)
    )
  }, [location.state.id])

  return (
    <>
      {tracks.length < 1 ? (
        <Loading />
      ) : (
        <Container>
          <ArtistIntro>
            <div title="点击关注">
              <Avatar
                size={`200px`}
                src={`https://p1.music.126.net/ATZ8-mOxophKXrLC0iXMZw==/109951163536269820.jpg?param=1024y1024`}
              />
            </div>
            <Name>许嵩</Name>
          </ArtistIntro>
          <Contents>
            {/* 单曲 */}
            <Songs>
              <label>
                <h1>热门单曲</h1>
              </label>
              <SongsList data={tracks} handleDbClick={() => {}} />
            </Songs>
            {/* 专辑 */}
            <Album>
              <label>
                <h1>专辑</h1>
              </label>
              <List datas={albums} amount={5} />
            </Album>
            {/* MV */}
            <Mvs>
              <label>
                <h1>MV</h1>
              </label>
              <List
                datas={mvs}
                amount={3}
                borderRadius={`1.25rem`}
                alignItems={`center`}
                w={464}
                h={260}
              />
            </Mvs>
          </Contents>
        </Container>
      )}
    </>
  )
}

export default ArtistDetail

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  /* padding: 0 calc(10%) 1.25rem 10%; */
  display: flex;
  flex: 1;
  flex-direction: column;
`

const ArtistIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Name = styled.div`
  font-size: 40px;
`
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Songs = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;
`

const Album = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Mvs = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
