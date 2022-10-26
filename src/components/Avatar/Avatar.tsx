import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar.jpg"

interface IProps {
  src?: string
  size: string
}

const Avatar: FC<IProps> = ({ size, src = avatar }): ReactElement => {
  return (
    <Container>
      <Wrapper>
        <Img src={src} size={size} />
      </Wrapper>
    </Container>
  )
}

export default Avatar

const Container = styled.div`
  display: flex;
`

const Wrapper = styled.div`
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
