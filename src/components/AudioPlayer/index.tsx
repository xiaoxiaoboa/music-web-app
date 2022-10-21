import { lazy } from "react"
import { useLocation } from "react-router-dom"
import Player from "./Player"

const AudioPlayer = () => {
  const location = useLocation()
  return (
    <>
      {/mv/.test(location.pathname) ? (
        <></>
      ) : (
        <>
            <Player />
        </>
      )}
    </>
  )
}
export default AudioPlayer
