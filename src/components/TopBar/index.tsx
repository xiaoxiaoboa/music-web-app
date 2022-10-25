import {
  FC,
  ReactElement,
  memo,
  useEffect,
  useState,
  KeyboardEventHandler,
  FocusEventHandler,
  MouseEventHandler
} from "react"
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
  Li,
  HistoryBox,
  Item,
  Words,
  BottomButton
} from "./index.style"
import ToggleTheme from "../ToggleTheme"
import { BiSearchAlt } from "react-icons/bi"
import { NavLink, Router, useNavigate } from "react-router-dom"
import { FontColor, RouterPath } from "../../types"
import { request } from "../../utils/request"
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil"
import { UserLikedAlbums, UserLikedSongListsIds, UserState } from "../../recoil"
import { addMessage } from "../Snackbar"
import { userPlayList } from "../../pages/Profile"
import { UserLikedPlayLists } from "../../recoil"
import { LikedAlbums } from "../../pages/Album/types"
import { useRef } from "react"
import SpecialFont from "../SpecialFont"
import Button from "../Button"

interface KeyWordsType {
  id: string
  words: string
}

const initialKeyWords = (): KeyWordsType[] => {
  return JSON.parse(localStorage.getItem("searchkeywords")!) || []
}

const TopBar: FC = (): ReactElement => {
  const [userInfo, setUserInfo] = useRecoilState(UserState)
  const reSetUserLikedIds = useResetRecoilState(UserLikedSongListsIds)
  const setUserPlayLists = useSetRecoilState(UserLikedPlayLists)
  const setUserLikedAlbums = useSetRecoilState(UserLikedAlbums)
  const [keyWords, setKeyWords] = useState<KeyWordsType[]>(initialKeyWords)
  const [openHistory, setOpenHistory] = useState<boolean>(false)
  const navigate = useNavigate()
  const historyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* 获取用户歌单和专辑 */
  useEffect(() => {
    if (userInfo) {
      request("user/playlist", "GET", `&uid=${userInfo.id}`).then(
        (res: userPlayList) => setUserPlayLists(res.playlist)
      )

      request("album/sublist", "GET").then((res: LikedAlbums) =>
        setUserLikedAlbums(res.data)
      )
    }
  }, [userInfo])

  useEffect(() => {
    localStorage.setItem("searchkeywords", JSON.stringify(keyWords))
  }, [keyWords])

  /* 退出账号 */
  const handlelogout = () => {
    request("logout", "GET").then(() => {
      localStorage.removeItem("user")
      setUserInfo(null)
      reSetUserLikedIds()
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

  /* 搜索输入 */
  const handleInput: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key !== "Enter") return
    const words = e.target.value.trim()

    const repeat = keyWords.filter(obj => obj.words === words)
    if (repeat.length > 0) {
      setKeyWords(prev => [
        ...repeat,
        ...prev.filter(obj => obj.words !== words)
      ])
    } else {
      const newKeyWords = {
        id: generateRandomStrig(),
        words: words
      }
      setKeyWords(prev => [newKeyWords, ...prev])
    }

    navigate(RouterPath.SEARCH, { state: { value: words } })
    setOpenHistory(false)
  }

  /* 搜索框聚焦时 */
  const handleFocus: FocusEventHandler = e => {
    setOpenHistory(true)
  }

  /* 关闭搜索记录 */
  document.onclick = e => {
    const clickedElement = e.target as Element
    if (
      clickedElement.isEqualNode(historyRef.current) ||
      clickedElement.parentElement?.isEqualNode(historyRef.current) ||
      clickedElement.isEqualNode(inputRef.current)
    )
      return

    setOpenHistory(false)
    document.onclick = null
  }

  /* 点击搜索历史关键词 */
  const handleClick: MouseEventHandler = e => {
    const words = e.target as Element
    navigate(RouterPath.SEARCH, { state: { value: words.innerHTML } })
    setOpenHistory(false)
  }

  /* 生成随机字符串 */
  const generateRandomStrig = (): string => {
    return Math.random().toString(36).slice(-8) + Date.now()
  }

  /* 清除搜索历史 */
  const handleClearHistory = () => {
    setKeyWords([])
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
        <SearchBar onFocus={handleFocus}>
          <InputBox>
            <BiSearchAlt className="searchIcon" />
            <Input
              type="text"
              placeholder="搜索"
              onKeyDown={handleInput}
              onChange={handleInput}
              ref={inputRef}
            />
          </InputBox>
          <HistoryBox open={openHistory} ref={historyRef}>
            <Words>
              {keyWords.map(obj => (
                <Item key={obj.id} onClick={handleClick}>
                  {obj.words}
                </Item>
              ))}
            </Words>
            <BottomButton>
              {keyWords.length < 1 ? (
                <SpecialFont color={FontColor.LIGHTCOLOR}>
                  无搜索历史~
                </SpecialFont>
              ) : (
                <Button onClick={handleClearHistory}>
                  <SpecialFont color={FontColor.LIGHTCOLOR}>
                    清除历史
                  </SpecialFont>
                </Button>
              )}
            </BottomButton>
          </HistoryBox>
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
