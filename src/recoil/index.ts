import { atom } from "recoil"

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
})