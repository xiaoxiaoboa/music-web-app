import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  SongCover,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist
} from "./index.style"
import { continuousWayEnum  } from "../../../types"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"
import { useRecoilState, useRecoilValue } from "recoil"
import { AudioState, PlayListState } from "../../../recoil/atom"
import imgSize from "../../../utils/imgSize"
import { getTrackUrl } from "../../../utils/getTrackUrl"

const Player: FC = (): ReactElement => {
  const [state, setState] = useRecoilState(AudioState)
  const [indexCache, setIndexCache] = useState<number | null>(null)
  const playList = useRecoilValue(PlayListState)

  useEffect(() => {
    if (state.playIndex !== null) {
      changeUrl(state.playIndex)
    }
  }, [state.playIndex])

  /* 开始 */
  const handlePlay = (): void => {
    state.audio
      .play()
      .then(() =>
        setState(prev => ({
          ...prev,
          ...{ isPlaying: !state.audio.paused }
        }))
      )
      .catch(err => {
        handlePause()
        console.log("播放失败", err)
      })
  }

  /* 暂停 */
  const handlePause = (): void => {
    state.audio.pause()
    setState(prev => ({
      ...prev,
      ...{ isPlaying: !state.audio.paused }
    }))
  }

  /* 选择播放模式 */
  const selectMode = () => {
    switch (state.continuousWay) {
      case continuousWayEnum.ORDER:
        return orderPlay()
      case continuousWayEnum.SHUFFLE:
        return shufflePlay()
      case continuousWayEnum.LOOP:
        return loop()
      case continuousWayEnum.LISTLOOP:
        return listLoop()

      default:
        return
    }
  }

  /* 一首歌播放结束时触发 */
  state.audio.onended = () => {
    setIndexCache(state.playIndex)

    selectMode()
  }

  /* 下一首 */
  const next = useCallback((): void => {
    if(playList.length <= 1) return
    setIndexCache(state.playIndex)
    selectMode()
  }, [state])

  /* 上一首 */
  const prev = useCallback((): void => {
    if (indexCache !== null) {
      // changeUrl(indexCache)
      setState(prev => ({ ...prev, ...{ playIndex: indexCache } }))
    }
  }, [indexCache])

  const changeUrl = (index: number) => {
    getTrackUrl(playList[index], val => {
      state.audio.src = val.url
      handlePlay()
      // setState(prev => ({ ...prev, ...{ playIndex: index } }))
    })
  }

  /* 顺序播放 */
  const orderPlay = (): void => {
    let index: number = state.playIndex === null ? 0 : state.playIndex! + 1
    if (index >= playList.length) return handlePause()
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
    // changeUrl(index)
  }
  /* 单曲循环 */
  const loop = (): void => {
    handlePause()
    handlePlay()
  }
  /* 列表循环 */
  const listLoop = (): void => {
    let index: number = state.playIndex === null ? 0 : state.playIndex! + 1
    if (index >= playList.length)
      return setState(prev => ({ ...prev, ...{ playIndex: 0 } }))
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
    // changeUrl(index)
  }

  /* 随机播放 */
  const shufflePlay = () => {
    /* 保存最后要播放的索引 */
    let index: number = 0

    /* 除去正在播放的那首歌，其余的保存在临时数组中 */
    const tempArr = playList.filter(
      obj => obj.id !== playList[state.playIndex!].id
    )
    /* 如果还有其余的歌曲，（播放列表大于1） */
    if (tempArr.length > 0) {
      /* 在临时数组中随机出一首歌 */
      const random = tempArr[Math.floor(Math.random() * tempArr.length)]
      /* 在播放列表中找出这首歌的索引 */
      index = playList.findIndex(obj => obj.id === random.id)
    } else if (state.audio.paused) {
      /* 如果临时数组中没有其他歌曲同时播放已经暂停了，就继续播放这一首 */
      handlePlay()
    }
    /* 更新播放索引 */
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
  }

  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src={imgSize(playList[state.playIndex!]?.al.picUrl, 60, 60)}
          />
          <SongDetails>
            <SongTitle title={playList[state.playIndex!]?.name}>
              {playList[state.playIndex!]?.name}
            </SongTitle>
            <Artist>{playList[state.playIndex!]?.ar[0].name}</Artist>
          </SongDetails>
        </SongCover>
        <Middle
          handlePlay={handlePlay}
          handlePause={handlePause}
          prev={prev}
          next={next}
        />
        <Right media={state.audio!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
