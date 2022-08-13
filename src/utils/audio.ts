export default class audio {
  private audioElement: HTMLAudioElement

  constructor(src: string) {
    this.audioElement = new Audio(src)
  }

  get value(): HTMLAudioElement {
    return this.audioElement as HTMLAudioElement
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

  /* 音量 */
  volume(value: number): void {
    this.audioElement.volume = value / 100
  }

  test(): void {
    this.audioElement.src = ""
  }
}
