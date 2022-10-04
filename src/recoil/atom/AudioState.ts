import { atom } from "recoil"
import { AudioStateType, PlayMode } from "../../types"

/* 音频播放器state */
const AudioState = atom<AudioStateType>({
  key: "playerState",
  default: {
    audio: new Audio(),
    playIndex: localStorage.getItem("audiostate")
      ? JSON.parse(localStorage.getItem("audiostate") as string).playIndex
      : null,
    isPlaying: false,
    canPlay: false,
    playMode: localStorage.getItem("audiostate")
      ? JSON.parse(localStorage.getItem("audiostate") as string).playMode
      : PlayMode.LISTLOOP
  }
  // effects: [
  //   ({ node, onSet }) => {
  //     onSet((newValue, oldValue) => {
  //       console.log(newValue)
  //     })
  //   }
  // ]
})

export default AudioState