/* 生成随机数 */
const random = (
  min: number,
  max: number,
  amount?: number
): number[] | number => {
  if (amount) {
    let numberArr: number[] = []
    for (let i = 0; i < amount; i++) {
      const temNum = Math.floor(Math.random() * (max - min + 1)) + min
      const sameNum = numberArr.find((num: number) => num === temNum)
      if (sameNum) {
        i--
        continue
      } else {
        numberArr.push(temNum)
      }
    }
    return numberArr
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default random
