import { atom } from "recoil"

/* 主题state */
const ThemeState = atom<boolean>({
  key: "Theme",
  default: JSON.parse(localStorage.getItem("colorMode")!)
    ? JSON.parse(localStorage.getItem("colorMode")!) === "dark"
      ? true
      : false
    : true
})
export default ThemeState
