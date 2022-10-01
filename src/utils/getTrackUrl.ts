import { PlayListUrls, SongUrl, Track } from "../types"
import { request } from "./request"

export const getTrackUrl = async (value: Track): Promise<SongUrl> => {
  /* 请求歌曲播放链接 */
  return await request(
    "song/url/v1",
    "GET",
    `&id=${value.id}&level=exhigh`
  ).then((res: PlayListUrls) => {
    /* 如果返回的url是null，换一个链接播放 */
    if (res.data[0].url) {
      res.data[0].url = res.data[0].url.split(":", 2)[1]
    } else {
      res.data[0].url = `https://music.163.com/song/media/outer/url?id=${value.id}.mp3`
    }
    return res.data[0]
  })
}
