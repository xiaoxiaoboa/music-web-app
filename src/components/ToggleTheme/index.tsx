import { FC, ReactElement, useEffect } from "react"
import { useRecoilState } from "recoil"
import { ThemeState } from "../../recoil"
import { RiMoonClearLine, RiSunLine } from "react-icons/ri"
import styled from "styled-components"

const ToggleTheme: FC = (): ReactElement => {
  const [mode, setMode] = useRecoilState(ThemeState)

  const handleClick = () => {
    setMode(() => !mode)
  }
  return (
    <ThemeButton mode={`${mode}`} onClick={handleClick}>
      <div>{mode ? <RiMoonClearLine /> : <RiSunLine />}</div>
    </ThemeButton>
  )
}

export default ToggleTheme

interface BProps {
  mode: string
}
const ThemeButton = styled.button<BProps>`
  display: flex;
  width: 44px;
  height: 22px;
  justify-content: flex-start;
  border-radius: 11px;
  align-items: center;
  border: 1px solid ${props => props.theme.modeButton_BorderColor};
  background-color: ${props => props.theme.modeButton_BgColor};
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.modeButton_hover_BorderColor};
  }

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.primary_bgColor};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    transform: translate(${props => (props.mode === 'true' ? 22 : 0)}px);
    transition: all 0.2s linear;

    & svg {
      width: 15px;
      height: 15px;
    }
  }
`
