
/* 去除链接中http */
const getNewUrl = (url: string): string => {
  return url.split(":", 2)[1]
}

export default getNewUrl
