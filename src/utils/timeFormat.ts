
const format = (duration: number): string => {
  if (duration === 0) return "0:00"
  const minute = Math.floor(duration / 60)
  const second = Math.floor(duration - minute * 60)
  return minute + ":" + ("0" + second).slice(-2)
}

export default format