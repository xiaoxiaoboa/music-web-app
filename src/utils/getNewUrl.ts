/* 去除链接中http */
const getNewUrl = (url?: string): string => {
  if (!url) {
    return ""
  } else {
    return url.split(":", 2)[1]
  }
}

export default getNewUrl
