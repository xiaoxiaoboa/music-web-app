/* 从数组中随机出n个元素 */

export const random = <T>(amount: number, arr: T[]): T[] => {
  const tempArr = arrRandom(arr)
  let result: T[] = []
  let numbers: number[] = []

  if (arr.length < amount) {
    result = arr
  } else {
    for (let i = 0; i < amount; i++) {
      /* 生成一个随机数 */
      const tempIndex: number = Math.floor(Math.random() * tempArr.length)
      /* 如果这个随机数已经存在，则i减去1，重新循环一次 */
      if (numbers.includes(tempIndex)) {
        i--
        continue
      } else {
        /* 随机数不存在，放进随机数数组中，把和随机数相应索引的tempArr的值放进结果数组 */
        numbers.push(tempIndex)
        result.push(tempArr[tempIndex])
      }
    }
  }
  return result
}

/* 用随机算法打乱数组顺序 */
const arrRandom = <T>(arr: T[]): T[] => {
  /*
    该随机算法参考自：
    https://oldj.net/article/2017/01/23/shuffle-an-array-in-javascript
  */

  let i = arr.length
  while (i) {
    let j = Math.floor(Math.random() * i--)
    ;[arr[j], arr[i]] = [arr[i], arr[j]]
  }

  return arr
}

export default random
