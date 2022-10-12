import { FC, ReactElement } from "react"
import Avatar from "../Avatar"
import {
  TopBarContainer,
  TopbarWarpper,
  Nav,
  SearchBar,
  AvatarWrapper,
  TopLogo,
  ThemeButton,
  InputBox,
  Input,
  Ul,
  Li
} from "./index.style"
import ToggleTheme from "../ToggleTheme"
import { BiSearchAlt } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { addMessage } from "../Snackbar"

const TopBar: FC = (): ReactElement => {
  // const setMessage = useSetRecoilState(SnackBarState)

  return (
    <TopBarContainer>
      <TopbarWarpper>
        <TopLogo />
        <Nav>
          <Ul>
            <NavLink to={"/"}>
              <Li>首页</Li>
            </NavLink>
            <Li>歌单</Li>
            <Li>新碟上架</Li>
            <Li>私人FM</Li>
            <Li>我的</Li>
          </Ul>
        </Nav>
        <SearchBar>
          <InputBox>
            <BiSearchAlt className="searchIcon" />
            <Input type="text" placeholder="搜索" />
          </InputBox>
        </SearchBar>
        <ThemeButton>
          <ToggleTheme />
        </ThemeButton>
        <AvatarWrapper>
          <Avatar size={`3rem`} />
        </AvatarWrapper>
      </TopbarWarpper>
    </TopBarContainer>
  )
}

export default TopBar
