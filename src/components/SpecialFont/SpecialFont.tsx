import React, { FC, ReactElement, memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FontColor, LocationProps } from "../../types"
import { addMessage } from "../Snackbar"

interface IProps {
  children: string
  color?: string
  link?: boolean
  size?: string
  className?: string
  to?: { path: string; id: number }
}

const SpecialFont: FC<IProps> = (props): ReactElement => {
  const { children, size, link, color, to ,className} = props
  const navigate = useNavigate()
  const location = useLocation() as LocationProps

  const handleNavigate = () => {
    const { pathname, state } = location
    const { path, id } = to!

    if (pathname === path && state?.id === id)
      return addMessage("你已经在这里了")

    navigate(path, { state: { id } })
  }

  return (
    <Font
      link={link}
      size={size}
      color={color}
      className={className}
      onClick={link ? handleNavigate : undefined}
    >
      {children}
    </Font>
  )
}

export default memo(SpecialFont)

interface Styles {
  link?: boolean
  light?: boolean
  size?: string
  color?: string
}
const Font = styled.span<Styles>`
  cursor: ${props => (props.link ? "pointer" : "unset")};
  font-size: ${props => (props.size ? props.size : "inherit")};
  color: ${props => {
    switch (props.color) {
      case FontColor.LIGHTCOLOR:
        return props.theme.light_color
      case FontColor.LINKCOLOR:
        return props.theme.secondary_color
      case FontColor.UNSET:
        return FontColor.UNSET
      default:
        return FontColor.UNSET
    }
  }};

  &:hover {
    text-decoration: ${props =>
      props.link ? `underline ${props.theme.secondary_color}` : "unset"};
  }
`
