import { atom } from "recoil";
import { Album } from "../../pages/Album/types";

const UserLikedAlbums = atom<Album[]>({
  key: "UserLikedAlbum",
  default: []
})


export default UserLikedAlbums