import { useLocation } from "react-router-dom"
import Player from "./Player"

const AudioPlayer = () => {
  const location = useLocation()
  return <>{/mvdetail/.test(location.pathname) ? <></> : <Player />}</>
}
export default AudioPlayer
