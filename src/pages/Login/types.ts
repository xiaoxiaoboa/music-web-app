/* 登录状态类型 */
 interface LoginStatusType {
  data: {
    account: {
      anonimousUser: boolean
      ban: number
      baoyueVersion: number
      createTime: number
      donateVersion: number
      id: number
      paidFee: boolean
      status: number
      tokenVersion: number
      type: number
      userName: string
      vipType: number
      whitelistAuthority: number
    }
    code: number
    profile: {
      accountStatus: number
      accountType: number
      anchor: boolean
      authStatus: number
      authenticated: boolean
      authenticationTypes: number
      authority: number
      avatarDetail: null
      avatarImgId: number
      avatarUrl: string
      backgroundImgId: number
      backgroundUrl: string
      birthday: number
      city: number
      createTime: number
      defaultAvatar: boolean
      description: null
      detailDescription: null
      djStatus: number
      expertTags: null
      experts: null
      followed: boolean
      gender: number
      lastLoginIP: string
      lastLoginTime: number
      locationStatus: number
      mutual: boolean
      nickname: string
      province: number
      remarkName: null
      shortUserName: string
      signature: null
      userId: number
      userName: string
      userType: number
      vipType: number
      viptypeVersion: number
    }
  }
}




/* 二维码API返回类型 */
interface QRCOdeKeyType {
  code: number
  data: { code: number; unikey: string }
}
/* 二维码img返回类型 */
interface QRCodeImgType {
  code: number
  data: {
    qrimg: string
    qrurl: string
  }
}

/* 二维码状态 */
interface Waiting {
  code: number
  cookie: string
  message: string
}
interface Authorizing {
  avatarUrl: string
  code: number
  cookie: string
  message: string
  nickname: string
}
interface AuthSuccess {
  code: number
  cookie: string
  message: string
}

/* 二维码state类型(reducer) */
interface QRCodeState {
  key: string
  base64: string
  isLoading: boolean
  message: string
}
enum QrCodeType {
  KEY = "key",
  BASE64 = "base64",
  IS_LOADING = "isLoading",
  MESSAGE = "message",
  RESET = "reset"
}
interface QrCodeAction {
  type: QrCodeType
  payload: string | boolean | QRCodeState
}






export type {
  LoginStatusType,
  QRCOdeKeyType,
  QRCodeImgType,
  Waiting,
  Authorizing,
  AuthSuccess,
  QRCodeState,
  QrCodeAction
}

export { QrCodeType }