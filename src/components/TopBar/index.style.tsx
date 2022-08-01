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

  & ul {
    list-style: none;
    display: flex;
    gap: 25px;
    font-size: 20px;
    color: ${props => props.theme.primary_color};
    justify-content: center;

    & li {
      padding: 5px;
      user-select: none;
      cursor: pointer;
      border-radius: 5px;
    }
    & li:hover {
      /* background-color: #d6eaf8; */
      color: ${porps => porps.theme.nav_hoverColor};
    }
  }
`

/* 搜索框 */
export const SearchBar = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.search_color};

  & div {
    width: 80%;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.search_bgColor};
    border-radius: 0.5rem;
    padding: 0.3125rem 0.5rem;

    /* 搜索框图标 */
    & span {
      display: flex;
      align-items: center;
      color: inherit;
    }

    & input {
      width: 85%;
      background-color: inherit;
      border: none;
      outline: none;
      margin-left: 0.5rem;
      padding: 0.1875rem;
      font-size: 0.875rem;
      color: inherit;
    }
  }

  /* 搜索框容器的伪类属性 */
  & div:focus-within {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
  & div:hover {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
`

/* 头像 */
export const AvatarWrapper = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & :hover {
    box-shadow: ${props => props.theme.nav_boxShadow};
  }
`
