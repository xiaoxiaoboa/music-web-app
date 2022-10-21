import { atom } from "recoil"
import { User } from "../../types/User"

const UserState = atom<User | null>({
  key: "UserState",
  default: JSON.parse(localStorage.getItem("user")!)
    ? JSON.parse(localStorage.getItem("user")!)
    : null
})



export default UserState 
