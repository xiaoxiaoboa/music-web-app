interface MProps {
  play: () => Promise<unknown>
  pause: () => void
}

export default class Media implements MProps {
  protected readonly _mediaElement: HTMLMediaElement

  protected constructor(arg: string | HTMLVideoElement) {
    if (typeof arg === "string") {
      this._mediaElement = new Audio(arg)
      // this._mediaElement.autoplay = true
    } else {
      this._mediaElement = arg
    }
  }

  /* 获取media元素 */
  get value() {
    return this._mediaElement
  }

  /* 播放 */
  play(): Promise<void> {
    return this._mediaElement.play()
  }

  /* 暂停 */
  pause(): void {
    this._mediaElement.pause()
  }

  /* 媒体正在处于什么状态：播放 | 暂停 */
  get paused(): boolean {
    return this._mediaElement.paused
  }

  get muted() {
    return this._mediaElement.muted
  }
  /* 静音 */
  set muted(isMuted: boolean) {
    this._mediaElement.muted = isMuted
  }

  /* 音量 */
  set volume(value: number) {
    this._mediaElement.volume = value / 100
  }

  /* 获取duration */
  get duration(): number {
    return this._mediaElement.duration
  }

  /* 获取当前播放时间 */
  get currentTime() {
    return this._mediaElement.currentTime
  }

  /* 设置duration */
  set currentTime(value: number) {
    this._mediaElement.currentTime = value
  }
}
