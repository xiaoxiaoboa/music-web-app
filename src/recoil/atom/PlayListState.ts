import { atom } from "recoil"
import { Track } from "../../types"

/* 音频歌单 */
const PlayListState = atom<Track[]>({
  key: "PlayList",
  default: localStorage.getItem("audiolist")
    ? JSON.parse(localStorage.getItem("audiolist") as string)
    : []
  // effects: [
  //   ({ node, onSet }) => {
  //     onSet((newValue, oldValue) => {
  //       console.log(newValue)
  //     })
  //   }
  // ]
})
export default PlayListState
