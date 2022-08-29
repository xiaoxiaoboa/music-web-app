import React from "react"
import styled, { keyframes } from "styled-components"

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingBody />
    </LoadingContainer>
  )
}

export default Loading

/* 动画keyframs */
const loading = (props: any) => keyframes`
  0%,
    80%,
    100% {
      height: 20px;
      box-shadow: 0 0 ${props.theme.secondary_color};
    }

    40% {
      height: 30px;
      box-shadow: 0 -20px ${props.theme.secondary_color};
    }
`

/* 样式组件 */
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingBody = styled.div`
  display: block;
  position: relative;
  width: 6px;
  height: 10px;

  animation: ${loading} infinite 1s ease-in-out -0.2s;

  background-color: ${props => props.theme.secondary_color};

  &::before,
  ::after {
    position: absolute;
    width: 6px;
    height: 10px;
    content: "";
    background-color: ${props => props.theme.secondary_color};
  }

  &::before {
    left: -14px;

    animation: ${loading} infinite 1s ease-in-out -0.4s;
  }

  &::after {
    right: -14px;

    animation: ${loading} infinite 1s ease-in-out;
  }
`
