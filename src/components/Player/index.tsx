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
import imgSize from "../../utils/imgSize"

const Player: FC = (): ReactElement => {
  const playList = useRecoilValue(PlayListState)
  const audioElement = useRef(new MyAudio(""))
  const setIsPlaying = useSetRecoilState(isPlayingState)

  useEffect(() => {
      if (playList[playList.length - 1]?.trackUrl.url.length) {
        audioElement.current.element.src =
          playList[playList.length - 1]?.trackUrl.url
        handlePlay()
      }
  }, [playList])

  /* 播放控制 */
  const handlePlay = (): void => {
    audioElement.current
      .play()
      .then(() => setIsPlaying(() => !audioElement.current?.paused))
      .catch(err => handlePause())
  }

  /* 暂停控制 */
  const handlePause = (): void => {
    audioElement.current.pause()
    setIsPlaying(() => !audioElement.current?.paused)
  }

  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src={imgSize(
              playList[playList.length - 1]?.track.al.picUrl,
              60,
              60
            )}
          />
          <SongDetails>
            <SongTitle title={playList[playList.length - 1]?.track.name}>
              {playList[playList.length - 1]?.track.name}
            </SongTitle>
            <Artist>{playList[playList.length - 1]?.track.ar[0].name}</Artist>
          </SongDetails>
        </SongCover>
        <Middle
          audioObject={audioElement.current!}
          handlePlay={handlePlay}
          handlePause={handlePause}
        />
        <Right mediaObject={audioElement.current!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
