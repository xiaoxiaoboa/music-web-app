import {useRecoilState} from 'recoil'
import {state} from '../recoil'

interface Audio {
  audioElement: HTMLAudioElement
}


export default class audio implements Audio {
  audioElement: HTMLAudioElement

  constructor(src: string) {
    this.audioElement = new Audio(src)
  }

  get element(): HTMLAudioElement {
    return this.audioElement
  }

  play(F: Function): void {
    this.audioElement
      .play()
      .then(res => F(true))
      .catch(err => F(false))
  }

  pause(): void {
    this.audioElement.pause()
  }

  test(): void {
    this.audioElement.src = ''
  }
}
