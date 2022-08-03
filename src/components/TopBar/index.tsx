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
import { Search } from "@icon-park/react"

const TopBar: FC = (): ReactElement => {
  return (
    <TopBarContainer>
      <TopbarWarpper>
        <TopLogo />
        <Nav>
          <Ul>
            <Li>首页</Li>
            <Li>歌单</Li>
            <Li>新碟上架</Li>
            <Li>私人FM</Li>
            <Li>我的</Li>
          </Ul>
        </Nav>
        <SearchBar>
          <InputBox>
            <Search className="searchIcon" />
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
