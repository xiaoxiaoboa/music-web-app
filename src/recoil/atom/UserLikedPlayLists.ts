import { atom } from "recoil";
import { SongList } from "../../pages/SongListDetail/types";

const UserLikedPlayLists = atom<SongList[]>({
  key: "UserPlayLists",
  default: []
})



export default UserLikedPlayLists