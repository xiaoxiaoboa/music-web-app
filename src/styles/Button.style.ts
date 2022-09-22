import styled from "styled-components";

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
