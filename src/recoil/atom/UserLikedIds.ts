import { atom } from "recoil";



const UserLikedIds = atom<number[]>({
  key: "UserLikedIds",
  default: []
})


export default UserLikedIds