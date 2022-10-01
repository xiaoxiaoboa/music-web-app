const imgSize = (url: string, w?: number, h?: number): string => {

  if (!url) {
    return ""
  } else if (w && h) {
    return url.split(':',2)[1] + `?param=${w}y${h}`
  } else {
    return url.split(":", 2)[1]
  }
}

export default imgSize
