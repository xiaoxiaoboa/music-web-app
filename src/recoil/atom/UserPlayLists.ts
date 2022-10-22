import { atom } from "recoil";
import { SongList } from "../../pages/SongListDetail/types";

const UserPlayLists = atom<SongList[]>({
  key: "UserPlayLists",
  default: [],
})



export default UserPlayLists