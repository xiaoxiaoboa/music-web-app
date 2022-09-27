import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { RiPlayListFill, RiHeart2Line } from "react-icons/ri"
import Volume from "../../../Volume"
import Button from '../../../Button'

interface IProps {
  media: HTMLMediaElement
}

const Right: FC<IProps> = ({ media }): ReactElement => {
  return (
    <RightButton>
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

export default Right

const RightButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;

  .RiHeart2Line,
  .RiPlayListFill {
    font-size: 1.25rem;
  }
`
const VolumeButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`
