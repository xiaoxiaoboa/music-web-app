import React, { FC, ReactElement, memo, useMemo } from "react"
import styled from "styled-components"
import { RiPlayListFill, RiHeart2Line } from "react-icons/ri"
import { TbRepeatOnce, TbRepeat, TbArrowsShuffle } from "react-icons/tb"
import Volume from "../../../Volume"
import Button from "../../../Button"
import { PlayMode } from "../../../../types"

interface IProps {
  audio: HTMLAudioElement
  playMode: PlayMode
  clickIcon: () => void
  playListCount: number
}

const Right: FC<IProps> = ({
  audio,
  playMode,
  clickIcon,
  playListCount
}): ReactElement => {
  /* 改变图标 */
  const changeIcon = (): JSX.Element => {
    switch (playMode) {
      case PlayMode.LISTLOOP:
        return <TbRepeat className="TbRepeat" />
      case PlayMode.LOOP:
        return <TbRepeatOnce className="TbRepeatOnce" />
      case PlayMode.SHUFFLE:
        return <TbArrowsShuffle className="TbArrowsShuffle" />
      default:
        return <TbArrowsShuffle className="TbArrowsShuffle" />
    }
  }

  /* 音频音量改变时，触发本地存储 */
  audio.onvolumechange = () => {
    const localData = JSON.parse(localStorage.getItem("audiostate") as string)
    const result = { ...localData, ...{ volume: audio.volume } }
    localStorage.setItem("audiostate", JSON.stringify(result))
  }

  /* 初始化音量 */
  const getLocalVolume = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("audiostate") as string)?.volume * 100 ||
      0
    )
  }, [])

  return (
    <RightButton listLength={playListCount}>
      <Button onClick={clickIcon}>{changeIcon()}</Button>
      <Button>
        <RiHeart2Line className="RiHeart2Line" />
      </Button>
      <Button>
        <RiPlayListFill className="RiPlayListFill" />
      </Button>
      <VolumeButtonBox>
        <Volume media={audio} volume={getLocalVolume} />
      </VolumeButtonBox>
    </RightButton>
  )
}

export default memo(Right)

interface ButtonColor {
  listLength: number
}

const RightButton = styled.div<ButtonColor>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 6px;

  .RiHeart2Line,
  .RiPlayListFill,
  .TbArrowsShuffle,
  .TbRepeatOnce,
  .TbRepeat {
    font-size: 1.25rem;
  }

  .RiPlayListFill {
    color: ${props =>
      props.listLength > 0 ? props.theme.secondary_color : "inherit"};
  }
`
const VolumeButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`
