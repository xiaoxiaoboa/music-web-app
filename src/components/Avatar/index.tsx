import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar2.jpg"

interface IProps {
  size: number
}

const Avatar: FC<IProps> = ({size}): ReactElement => {
  return (
    <AvatarContainer size={size}>
      <img src={avatar}  />
    </AvatarContainer>
  )
}

export default Avatar

const AvatarContainer = styled.div<IProps>`
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;

  & img {
    border-radius: 50%;
    object-fit: cover;
    width: ${props => props.size / 16}rem;
    height: ${props => props.size / 16}rem;
  }
`
