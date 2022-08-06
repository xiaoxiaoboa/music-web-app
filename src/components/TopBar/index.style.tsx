import styled from "styled-components"
import logoImg from "../../assets/logo.png"

/* TopBar容器 */
export const TopBarContainer = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: ${props => props.theme.primary_bgColor};
`

/* TopBar */
export const TopbarWarpper = styled.div`
  width: 80%;
  min-width: 56.25rem;
  display: flex;
  align-items: center;
`

/* Logo */
export const TopLogo = styled.div`
  width: 3.75rem;
  height: 3.75rem;
  background-image: url(${logoImg});
  background-size: cover;
  background-repeat: no-repeat;
`

/* 导航列表 */
export const Nav = styled.div`
  flex: 4;
`
export const Ul = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5625rem;
  font-size: 1.25rem;
  color: ${props => props.theme.primary_color};
  justify-content: center;
`
export const Li = styled.li`
  padding: 0.3125rem;
  user-select: none;
  cursor: pointer;
  border-radius: 0.375rem;

  &:hover {
    background-color: ${porps => porps.theme.hover_BgColor};
  }
`

/* 搜索框 */
export const SearchBar = styled.div`
  flex: 2.5;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.search_color};
`
export const InputBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.search_bgColor};
  border-radius: 0.5rem;
  padding: 0.3125rem 0.5rem;

  .searchIcon {
    display: flex;
    align-items: center;
    color: inherit;
    font-size: 1.25rem;
  }

  &:focus-within {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
  &:hover {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
`
export const Input = styled.input`
  width: 85%;
  background-color: inherit;
  border: none;
  outline: none;
  margin-left: .3125rem;
  padding: 0.1875rem;
  font-size: 0.875rem;
  color: inherit;
`

/* 头像 */
export const AvatarWrapper = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
`

export const ThemeButton = styled.div`
  flex: 0.5;
`
