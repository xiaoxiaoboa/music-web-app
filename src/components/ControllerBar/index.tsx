import { FC, ReactElement } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  MiddleButton,
  SongCover,
  RightButton,
  Button,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist,
  VolumeButtonBox
} from "./index.style"
import { Player } from "../../utils/Player"

import { FaPlay, FaStepForward, FaStepBackward } from "react-icons/fa"

import { RiVolumeUpFill, RiPlayListFill, RiHeart2Line } from "react-icons/ri"

const ControllerBar: FC = (): ReactElement => {
  return (
    <ControllerBarContainer>
      <Player />
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src="http://p1.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg?param=130y130"
            alt=""
          />

          <SongDetails>
            <SongTitle>如果当时</SongTitle>
            <Artist>许嵩</Artist>
          </SongDetails>
        </SongCover>
        <MiddleButton>
          <Button>
            <FaStepBackward className="FaStepBackward" />
          </Button>
          <Button>
            <FaPlay className="FaPlay" />
          </Button>
          <Button>
            <FaStepForward className="FaStepForward" />
          </Button>
        </MiddleButton>
        <RightButton>
          <Button>
            <RiHeart2Line className="RiHeart2Line" />
          </Button>
          <Button>
            <RiPlayListFill className="RiPlayListFill" />
          </Button>
          <VolumeButtonBox>
            <Button>
              <RiVolumeUpFill className="RiVolumeUpFill" />
            </Button>
            <span></span>
          </VolumeButtonBox>
        </RightButton>
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}

export default ControllerBar
