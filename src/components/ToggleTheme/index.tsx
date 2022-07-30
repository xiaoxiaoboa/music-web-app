import { FC, ReactElement, useEffect } from "react"
import { useRecoilState } from "recoil"
import { state } from "../../recoil"

const ToggleTheme:FC = ():ReactElement => {
  const [mode, setMode] = useRecoilState(state)

  // useEffect(() => {
  //  const colorMode =  window.matchMedia("(prefers-color-scheme: dark)")
  //  setMode(() => colorMode.matches)
  // },[])


  const handleClick = () => {
    setMode(() => !mode)
  }
  return <button onClick={handleClick}>{mode ? "light" : "dark"}</button>
}

export default ToggleTheme
