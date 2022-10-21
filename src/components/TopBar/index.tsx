import { FC, ReactElement, memo, useEffect } from "react"
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
import { NavLink, Router, useNavigate } from "react-router-dom"
import { RouterPath } from "../../types"
import { request } from "../../utils/request"
import { useRecoilState, useResetRecoilState } from "recoil"
import { UserLikedIds, UserPlayLists, UserState } from "../../recoil/atom"
import { addMessage } from "../Snackbar"

const TopBar: FC = (): ReactElement => {
  const [userInfo, setUserInfo] = useRecoilState(UserState)
  const reSetUserPlayLists = useResetRecoilState(UserPlayLists)
  const reSetUserLikedIds = useResetRecoilState(UserLikedIds)
  const navigate = useNavigate()

  /* 退出账号 */
  const handlelogout = () => {
    request("logout", "GET").then(() => {
      localStorage.removeItem("user")
      setUserInfo(null)
      reSetUserLikedIds()
      reSetUserPlayLists()
      addMessage("退出成功")
      navigate(RouterPath.HOME, { replace: true })
    })
  }

  /* 跳转到登录页面 */
  const toLogin = (): void => {
    if (userInfo) {
      addMessage("账号已登录...")
    } else {
      navigate(RouterPath.LOGIN, { replace: true })
    }
  }

  return (
    <TopBarContainer>
      <TopbarWarpper>
        <TopLogo />
        <Nav>
          <Ul>
            <NavLink to={RouterPath.HOME}>
              <Li>首页</Li>
            </NavLink>
            <NavLink to={RouterPath.SONGLISTS}>
              <Li>歌单</Li>
            </NavLink>
            <NavLink to={userInfo ? RouterPath.PROFILE : RouterPath.LOGIN}>
              <Li>我的</Li>
            </NavLink>
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
        <AvatarWrapper
          onClick={() => (userInfo ? handlelogout() : toLogin())}
          title={userInfo ? "点我退出登录" : "点我去登录"}
        >
          <Avatar size={`3rem`} src={userInfo?.avatar} />
        </AvatarWrapper>
      </TopbarWarpper>
    </TopBarContainer>
  )
}

export default memo(TopBar)
