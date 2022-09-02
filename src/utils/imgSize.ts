export const imgSize = (url: string, w?: number, h?: number): string => {
  if (w && h) {
    return url + `?param=${w}y${h}`
  } else {
    return url
  }
}
