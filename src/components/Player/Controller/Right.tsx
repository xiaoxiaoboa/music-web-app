import React, { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import { Button } from "../index.style"
import {
  RiVolumeUpFill,
  RiPlayListFill,
  RiHeart2Line,
  RiVolumeMuteFill
} from "react-icons/ri"
import Slider from "../../Slider"

interface IProps {
  isMuted: boolean
  handleMuted: () => void
  handleVolume: (value: number) => void
}

const Right: FC<IProps> = (props): ReactElement => {
  const { isMuted, handleMuted, handleVolume } = props
  return (
    <RightButton>
      <Button>
        <RiHeart2Line className="RiHeart2Line" />
      </Button>
      <Button>
        <RiPlayListFill className="RiPlayListFill" />
      </Button>
      <VolumeButtonBox>
        <Button onClick={handleMuted}>
          {isMuted ? (
            <RiVolumeMuteFill className="RiVolumeMute" />
          ) : (
            <RiVolumeUpFill className="RiVolumeMute" />
          )}
        </Button>
        <Slider
          sWidth={`6.25rem`}
          sPadding={`.5rem 0`}
          getSliderValue={handleVolume}
          isMuted={isMuted}
        />
      </VolumeButtonBox>
    </RightButton>
  )
}

export default Right

const RightButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
`
const VolumeButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: .3125rem;
`
