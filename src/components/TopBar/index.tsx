import { FC, ReactElement } from "react"
import Avatar from "../Avatar"
import {
  TopBarContainer,
  TopbarWarpper,
  Nav,
  SearchBar,
  AvatarWrapper,
  TopLogo
} from "./index.style"
import ToggleTheme from "../ToggleTheme"
import { Search } from "@icon-park/react"

const TopBar: FC = (): ReactElement => {
  return (
    <TopBarContainer>
      <TopbarWarpper>
        <TopLogo />
        <Nav>
          <ul>
            <li>首页</li>
            <li>歌单</li>
            <li>新碟上架</li>
            <li>私人FM</li>
            <li>我的</li>
            <li>
              <ToggleTheme />
            </li>
          </ul>
        </Nav>
        <SearchBar>
          <div>
            <Search size="1.2rem" />
            <input type="text" placeholder="搜索" />
          </div>
        </SearchBar>
        <AvatarWrapper>
          <Avatar size={48} />
        </AvatarWrapper>
      </TopbarWarpper>
    </TopBarContainer>
  )
}

export default TopBar
