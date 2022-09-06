import { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  SongCover,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist
} from "./index.style"

import MyAudio from "../../utils/MyAudio"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { PlayListState, isPlayingState } from "../../recoil"

const Player: FC = (): ReactElement => {
  const playList = useRecoilValue(PlayListState)
  const audioElement = useRef(new MyAudio(""))
  const setIsPlaying = useSetRecoilState(isPlayingState)

  useEffect(() => {
    audioElement.current.element.src = playList[playList.length - 1]?.trackUrl.url
    if (playList.length !== 0) {
      audioElement.current
        .play()
        .then(() => setIsPlaying(() => !audioElement.current?.paused))
        .catch(err => console.log(err))
    }
  }, [playList])

  // useEffect(() => {
  //   audioElement.current.element.src =
  //     "http://m701.music.126.net/20220906230849/99a5086995db0769233ceb0a042f9cf0/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096481316/6260/9f53/8ce4/79d04efb812e87223bd236c3b6748484.mp3"
  // },[])

  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg src={playList[playList.length - 1]?.track.al.picUrl} />
          <SongDetails>
            <SongTitle>{playList[playList.length - 1]?.track.name}</SongTitle>
            <Artist>{playList[playList.length - 1]?.track.ar[0].name}</Artist>
          </SongDetails>
        </SongCover>
        <Middle audioObject={audioElement.current!} />
        <Right mediaObject={audioElement.current!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
