const url = import.meta.env.VITE_REACT_APP_NETEASEMUSIC_API

/* get */
export const get = async (path: string) => {
  try {
    const res = await fetch(url + path, {
      method: "GET"
    })
    return await res.json()
  } catch (err) {
    console.log("请求失败", err)
  }
}

/* login 二维码key */
export const qrCodeKey = async (path: string) => {
  const totalUrl = url + path + `?timestamp=${Date.now()}`
  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })
    return await res.json()
  } catch (err) {
    console.log("二维码Key获取失败", err)
  }
}

/* 二维码 */
export const qrCodeImg = async (path: string, key: string) => {
  const totalUrl =
    url + path + `?key=${key}&qrimg=${true}&timestamp=${Date.now()}`
  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })
    return await res.json()
  } catch (err) {}
}

/* 获取登录状态 */
export const getLoginStatus = async (cookie: string) => {
  const totalUrl = url + "login/status" + `?timestamp=${Date.now()}`
  try {
    const res = await fetch(totalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cookie })
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/* 轮询二维码状态 */
export const qrCodeCheck = async (path: string, key: string) => {
  const totalUrl = url + path + `?key=${key}&timestamp=${Date.now()}`
  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })

    const json =  await res.json()


    // if (json.code === 800) {
    // } else if (json.code === 801) {
    //   // setTimeout(() => {}, 1000)
    //   await qrCodeCheck(path, key)
    // } else if (json.code === 802) {
    //   await qrCodeCheck(path, key)
    // } else if (json.code === 803) {
    //   return '登录成功'
    // }
  } catch (err) {
    console.log(err)
  }
}
