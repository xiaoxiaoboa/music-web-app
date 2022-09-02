const url = import.meta.env.VITE_REACT_APP_NETEASEMUSIC_API

/* login 二维码key */
export const qrCodeKey = async (path: string) => {
  const totalUrl = url + path + `?timerstamp=${Date.now()}`
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
    url + path + `?key=${key}&qrimg=${true}&timerstamp=${Date.now()}`
  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })
    return await res.json()
  } catch (err) {}
}

/* 获取登录状态 */
export const getLoginStatus = async (cookie: string) => {
  const totalUrl = url + "login/status" + `?timerstamp=${Date.now()}`
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
  const totalUrl = url + path + `?key=${key}&timerstamp=${Date.now()}`
  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/* 退出登录 */
export const logout = async () => {
  const totalUrl = url + `logout?timerstamp=${Date.now()}`

  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/* 获取账号信息 */
export const getUserInfo = async () => {
  const totalUrl = url + `user/account?timerstamp=${Date.now()}`

  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/* 首页推荐歌单 */
export const recommendedList = async (path: string, limit: number) => {
  const totalUrl = url + path + `?limit=${limit}&timerstamp=${Date.now()}`

  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/* 首页推荐歌手 */
export const recommendedArtist = async (path: string, type: number) => {
  const totalUrl = url + path + `?type=${type}&timerstamp=${Date.now()}`

  try {
    const res = await fetch(totalUrl, {
      method: "GET"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/* 首页推荐MV */
export const recommendedMv = async (path: string) => {
  const totalUrl = url + path + `?&timerstamp=${Date.now()}`

  try{
    const res = await fetch(totalUrl, {
      method:"GET"
    })

    return await res.json()
  }catch(err){ console.log(err)}
}
