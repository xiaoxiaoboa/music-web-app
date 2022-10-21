import { atom } from "recoil";
import { playList } from "../../pages/Profile";

const UserPlayLists = atom<playList[]>({
  key: "UserPlayLists",
  default: [],
})



export default UserPlayLists