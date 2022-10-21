import { atom } from "recoil"
import { AudioStateType, PlayMode } from "../../types"

/* 音频播放器state */
const AudioState = atom<AudioStateType>({
  key: "playerState",
  default: {
    audio: new Audio(),
    playIndex: JSON.parse(localStorage.getItem("audiostate")!)
      ? JSON.parse(localStorage.getItem("audiostate")!).playIndex
      : null,
    isPlaying: false,
    canPlay: false,
    playMode: JSON.parse(localStorage.getItem("audiostate")!)
      ? JSON.parse(localStorage.getItem("audiostate")!).playMode
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