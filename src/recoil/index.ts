import {atom} from 'recoil'
import audio from '../utils/audio'

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: false
})

/* 音频DOM元素state */
export const AudioElementState = atom<audio | null>({
  key: "AudioElement",
  default: null
})
