import { atom } from "recoil";



const UserLikedSongListsIds = atom<number[]>({
  key: "UserLikedIds",
  default: []
})


export default UserLikedSongListsIds