import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Button } from "../index.style"
import { RiPlayListFill, RiHeart2Line } from "react-icons/ri"
import Media from "../../../utils/Media"
import Volume from "../../Volume"

interface IProps {
  mediaObject: Media
}

const Right: FC<IProps> = (props): ReactElement => {
  const { mediaObject } = props

  return (
    <RightButton>
      <Button>
        <RiHeart2Line className="RiHeart2Line" />
      </Button>
      <Button>
        <RiPlayListFill className="RiPlayListFill" />
      </Button>
      <VolumeButtonBox>
        <Volume mediaObject={mediaObject} Button={Button}/>
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
  gap: 0.3125rem;
`
