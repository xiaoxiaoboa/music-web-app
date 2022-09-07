const imgSize = (url: string, w?: number, h?: number): string => {
  if (!url) {
    return ""
  } else if (w && h) {
    return url + `?param=${w}y${h}`
  } else {
    return url
  }
}

export default imgSize
