/* 去除链接中http */
const getNewUrl = (url: string): string => {
  if (url.length < 1) {
    return ""
  } else {
    return url.split(":", 2)[1]
  }
}

export default getNewUrl
