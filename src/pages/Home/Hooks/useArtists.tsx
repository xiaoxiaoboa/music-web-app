import React, { useEffect } from 'react'
import { recommendedArtist } from "../../../utils/request"

const useArtists = () => {


  useEffect(() => {
    
    // recommendedArtist("toplist/artist", 1)
    // .then(res => console.log(res))
  },[])



  return (
    <div>useArtists</div>
  )
}

export default useArtists