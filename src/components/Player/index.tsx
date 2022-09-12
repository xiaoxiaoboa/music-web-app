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
import { continuousWayEnum, TrackAndUrl } from "../../types"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"
import { useRecoilState } from "recoil"
import { AudioState } from "../../recoil/atom"
import imgSize from "../../utils/imgSize"

const Player: FC = (): ReactElement => {
  const [state, setState] = useRecoilState(AudioState)

  useEffect(() => {
    console.log(state.playList)
    switch (state.continuousWay) {
      case continuousWayEnum.ORDER:
        return orderPlay()
      case continuousWayEnum.SHUFFLE:
        return
      case continuousWayEnum.LOOP:
        return
      case continuousWayEnum.LISTLOOP:
        return

      default:
        break
    }
    // if (state.playList[state.playIndex]?.trackUrl.url.length) {
    //   state.audio.element.src = state.playList[state.playIndex]?.trackUrl.url
    //   handlePlay()
    // }
  }, [state.playList])

  useEffect(() => {
    state.audio.element.src = state.playList[state.playIndex]?.trackUrl.url
  },[state.playIndex])

  state.audio.element.onended = () => {
    next()
  }

  /* 开始 */
  const handlePlay = (): void => {
    state.audio
      .play()
      .then(() =>
        setState(prev => ({
          ...prev,
          ...{ isPlaying: !state.audio.element.paused }
        }))
      )
      .catch(err => handlePause())
  }

  /* 暂停 */
  const handlePause = (): void => {
    state.audio.pause()
    setState(prev => ({
      ...prev,
      ...{ isPlaying: !state.audio.element.paused }
    }))
  }

  /* 下一首 */
  const next = ():void => {
    if(state.playIndex + 1 >= state.playList.length) return handlePause()
    setState((prev) =>  ({...prev, ...{playIndex: prev.playIndex + 1}}))
  }

  /* 顺序播放 */
  const orderPlay = (): void => {
    state.audio.element.src = state.playList[state.playIndex]?.trackUrl.url
    handlePlay()
  }
  /* 随机播放 */
  const shufflePlay = () => {
    const arr:number[] = state.playList.map((obj) => obj.trackUrl.id)
    let i = arr.length
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]]
    }
  }

  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src={imgSize(
              state.playList[state.playIndex]?.track.al.picUrl,
              60,
              60
            )}
          />
          <SongDetails>
            <SongTitle title={state.playList[state.playIndex]?.track.name}>
              {state.playList[state.playIndex]?.track.name}
            </SongTitle>
            <Artist>{state.playList[state.playIndex]?.track.ar[0].name}</Artist>
          </SongDetails>
        </SongCover>
        <Middle handlePlay={handlePlay} handlePause={handlePause} />
        <Right mediaObject={state.audio!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
