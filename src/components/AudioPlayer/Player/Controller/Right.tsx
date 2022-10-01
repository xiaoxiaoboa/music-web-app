import React, { FC, ReactElement, memo } from "react"
import styled from "styled-components"
import { RiPlayListFill, RiHeart2Line } from "react-icons/ri"
// import { TiArrowShuffle } from "react-icons/ti"
import { TbRepeatOnce, TbRepeat, TbArrowsShuffle } from "react-icons/tb"
import Volume from "../../../Volume"
import Button from "../../../Button"
import { PlayMode } from "../../../../types"

interface IProps {
  media: HTMLMediaElement
  playMode: PlayMode
  clickIcon: () => void
  playListCount: number
}

const Right: FC<IProps> = ({
  media,
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

  return (
    <RightButton>
      <Button onClick={clickIcon}>{changeIcon()}</Button>
      <Button>
        <RiHeart2Line className="RiHeart2Line" />
      </Button>
      <Button>
        <RiPlayListFill className="RiPlayListFill" />
      </Button>
      <VolumeButtonBox>
        <Volume media={media} />
      </VolumeButtonBox>
    </RightButton>
  )
}

export default memo(Right)

const RightButton = styled.div`
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
`
const VolumeButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`
