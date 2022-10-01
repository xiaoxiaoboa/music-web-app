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
import { PlayMode, Track } from "../../../types"
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

  /* 组件卸载时，歌曲要暂停 */
  useEffect(() => {
    /* 
      canplay的作用是，audioplayer组件如果已经渲染出来了，则音乐可以播放，反之如果组件已经卸载则不允许播放 
    */
    return () => {
      setState(prev => ({ ...prev, ...{ canPlay: !prev.canPlay } }))
      handlePause()
    }
  }, [])

  /* 播放索引更新，则请求链接，播放 */
  useEffect(() => {
    if (state.playIndex !== null && state.canPlay) {
      changeUrl(state.playIndex, true)
    }
  }, [state.playIndex])

  /* 打开页面后，播放列表内有上次的歌曲，就先请求链接，但不播放 */
  useEffect(() => {
    if (state.playIndex !== null && state.audio.src === "") {
      changeUrl(state.playIndex, false)
    }
  }, [])

  /* playlist和state更新时，存入localStorage */
  useEffect(() => {
    localStorage.setItem("audiolist", JSON.stringify(playList))
  }, [playList])
  useEffect(() => {
    const tempData = JSON.parse(localStorage.getItem("audiostate") as string)
    const newData = { playIndex: state.playIndex, playMode: state.playMode }
    const result = { ...tempData, ...newData }

    localStorage.setItem("audiostate", JSON.stringify(result))
  }, [state.playIndex, state.playMode])

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
    switch (state.playMode) {
      case PlayMode.SHUFFLE:
        return shufflePlay()
      case PlayMode.LOOP:
        return loop()
      case PlayMode.LISTLOOP:
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
    console.log(playList.length)
    if (playList.length <= 1) return
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

  /* 获取歌曲url，开始播放 */
  const changeUrl = (index: number, isPlay: boolean) => {
    getTrackUrl(playList[index]).then(res => {
      state.audio.src = res.url
      isPlay ? handlePlay() : undefined
    })
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
    let tempArr: Track[] = []

    /* 除去正在播放的那首歌，其余的保存在临时数组中 */
    if (state.playIndex) {
      tempArr = playList.filter(obj => obj.id !== playList[state.playIndex!].id)
    } else {
      tempArr = [...playList]
    }
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

  /* 改变播放模式图标 */
  const handleClickIcon = useCallback(() => {
    switch (state.playMode) {
      case PlayMode.LISTLOOP:
        return setState(prev => ({ ...prev, ...{ playMode: PlayMode.LOOP } }))
      case PlayMode.LOOP:
        return setState(prev => ({
          ...prev,
          ...{ playMode: PlayMode.SHUFFLE }
        }))
      case PlayMode.SHUFFLE:
        return setState(prev => ({
          ...prev,
          ...{ playMode: PlayMode.LISTLOOP }
        }))
    }
  }, [state.playMode])

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
        <Right
          media={state.audio!}
          playMode={state.playMode}
          clickIcon={handleClickIcon}
          playListCount={playList.length}
        />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
