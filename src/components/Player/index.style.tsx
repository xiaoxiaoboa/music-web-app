import styled from "styled-components"

export const ControllerBarContainer = styled.div`
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.0625rem solid #9370db;
  user-select: none;
`
export const ControllerWrapper = styled.div`
  display: flex;
  width: 90%;
`

export const SongCover = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
export const SongCoverImg = styled.img`
  width: 3.75rem;
  border-radius: 0.3125rem;
`
export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`
export const SongTitle = styled.span`
  font-size: 1.125rem;
`
export const Artist = styled.span`
  font-size: 0.875rem;
`

// export const MiddleButton = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 15px;
// `

// export const RightButton = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: end;
// `
// export const VolumeButtonBox = styled.div`
//   display: flex;
//   align-items: center;
// `

export const Button = styled.button`
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: unset;
  cursor: pointer;

  .FaPlay,
  .FaPause,
  .FaStepBackward,
  .FaStepForward {
    color: ${props => props.theme.controllerButton_color};
  }

  .FaPlay,
  .FaPause {
    font-size: 1.75rem;
  }

  .FaStepBackward,
  .FaStepForward,
  .RiVolumeMute,
  .RiHeart2Line,
  .RiPlayListFill {
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${props => props.theme.hover_BgColor};
  }
`
