interface Audio {
  audioElement: HTMLAudioElement
}

export default class audio implements Audio {
  audioElement: HTMLAudioElement

  constructor(src: string) {
    this.audioElement = new Audio(src)
  }

  /* 播放 */
  play(): Promise<void> {
    return this.audioElement.play()
  }

  /* 暂停 */
  pause(): void {
    this.audioElement.pause()
  }

  /* 静音 */
  muted(isMuted: boolean): void {
    this.audioElement.muted = isMuted
  }

  test(): void {
    this.audioElement.src = ""
  }
}
