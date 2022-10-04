import { atom } from "recoil"

/* 主题state */
const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
})
export default ThemeState
