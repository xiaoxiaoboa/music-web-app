import { atom } from "recoil"
import Audio from '../utils/Audio'

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
})