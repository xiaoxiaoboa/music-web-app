import { PlayListUrls, SongUrl, Track, TrackAndUrl } from "../types"
import { request } from "./request"

export const getTrackUrl = (
  value: Track | Track[],
  F: (val: SongUrl) => void
) => {
  if (Array.isArray(value)) {
    const ids: number[] = value.map(obj => obj.id)
    request("song/url/v1", "GET", `&id=${ids}&level=exhigh`).then(
      (res: PlayListUrls) => {
        /* 判断是否有空的url */
        for (let i = 0; i < res.data.length; i++) {
          if (!res.data[i].url) {
            res.data[i].url = `https://music.163.com/song/media/outer/url?id=${value[i].id}.mp3`
          }
        }

        /* 组合新数组 */
        const newArr: TrackAndUrl[] = []
        for (let i = 0; i < value.length; i++) {
          const newObj: TrackAndUrl = { track: value[i], trackUrl: res.data[i] }
          newArr.push(newObj)
        }
        // F(newArr)
      }
    )
  } else {
    /* 请求歌曲播放链接 */
    request("song/url/v1", "GET", `&id=${value.id}&level=exhigh`).then(
      (res: PlayListUrls) => {
        /* 如果返回的url是null，换一个链接播放 */
        if (!res.data[0].url) {
          res.data[0].url = `https://music.163.com/song/media/outer/url?id=${value.id}.mp3`
        }
        // const newObj: TrackAndUrl = { track: value, trackUrl: res.data[0] }
        F(res.data[0])
      }
    )
  }
}
