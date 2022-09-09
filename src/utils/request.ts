const url = import.meta.env.VITE_REACT_APP_NETEASEMUSIC_API

/* fetch请求 */
export const request = async (
  path: string,
  method: string,
  params?: string,
  headers?: HeadersInit,
  body?: BodyInit
) => {
  const totalUrl = url + path + `?timerstamp=${Date.now()}` + params

  try {
    const res = await fetch(totalUrl, {
      method,
      headers,
      body,
      credentials: "include"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
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
