const url: string = import.meta.env.VITE_REACT_APP_NETEASEMUSIC_API


/* fetch请求 */
export const request = async (
  path: string,
  method: string,
  params?: string,
  headers?: HeadersInit,
  body?: BodyInit
) => {
  const totalUrl = url + path + `?timerstamp=${Date.now()}` + (params ? params : '')

  try {
    const res = await fetch(totalUrl, {
      method,
      headers,
      body,
      credentials: "include",
      cache:'default',
      mode: "cors"
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export default request