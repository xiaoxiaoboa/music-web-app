/* audio状态 */
interface AudioStateType {
  audio: HTMLMediaElement
  playIndex: number | null
  isPlaying: boolean
  playMode: PlayMode
  canPlay: boolean
}

enum PlayMode {
  SHUFFLE = "shuffle",
  LOOP = "loop",
  LISTLOOP = "listLoop"
}

export type { AudioStateType }
export { PlayMode }
