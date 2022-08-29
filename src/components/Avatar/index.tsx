import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar2.jpg"

interface IProps {
  size: string
}

const Avatar: FC<IProps> = ({ size }): ReactElement => {
  return (
    <AvatarContainer>
      <Img src={avatar} size={size} />
    </AvatarContainer>
  )
}

export default Avatar

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  
  &:hover {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
`
const Img = styled.img<IProps>`
  border-radius: 50%;
  object-fit: cover;
  width: ${props => props.size};
  height: ${props => props.size};
`
