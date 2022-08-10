import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { Button } from "../index.style"
import {
  RiVolumeUpFill,
  RiPlayListFill,
  RiHeart2Line,
  RiVolumeMuteFill
} from "react-icons/ri"

interface IProps {
  isMuted: boolean
  handleMutedClick: () => void
}

const Right:FC<IProps> = (props):ReactElement => {
  const {isMuted, handleMutedClick} = props
  return (
    <RightButton>
      <Button>
        <RiHeart2Line className="RiHeart2Line" />
      </Button>
      <Button>
        <RiPlayListFill className="RiPlayListFill" />
      </Button>
      <VolumeButtonBox>
        <Button onClick={handleMutedClick}>
          {isMuted ? (
            <RiVolumeMuteFill className="RiVolumeMute" />
          ) : (
            <RiVolumeUpFill className="RiVolumeMute" />
          )}
        </Button>
        <span></span>
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
`
