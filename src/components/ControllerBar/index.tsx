import { FC, ReactElement } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  MiddleButton,
  SongCover,
  RightButton,
  Button
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
          <img
            src="http://p1.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg?param=130y130"
            alt=""
          />

          <div>
            <span>如果当时</span>
            <span>许嵩</span>
          </div>
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
            <RiHeart2Line />
          </Button>
          <Button>
            <RiPlayListFill />
          </Button>
          <div>
            <Button>
              <RiVolumeUpFill />
            </Button>
            <span></span>
          </div>
        </RightButton>
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}

export default ControllerBar
