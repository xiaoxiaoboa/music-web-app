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

interface UserAccount {
  code: number
  account: {
    id: number
    userName: string
    type: number
    status: number
    whitelistAuthority: number
    createTime: number
    tokenVersion: number
    ban: number
    baoyueVersion: number
    donateVersion: number
    vipType: number
    anonimousUser: boolean
    paidFee: boolean
  }
  profile: {
  userId: number
  userType: number
  nickname: string
  avatarImgId: number
  avatarUrl: string
  backgroundImgId: number
  backgroundUrl: string
  signature: string
  createTime: number
  userName: string
  accountType: number
  shortUserName: string
  birthday: number
  authority: number
  gender: number
  accountStatus: number
  province: number
  city: number
  authStatus: number
  description: null
  detailDescription: null
  defaultAvatar: boolean
  expertTags: null
  experts: null
  djStatus: number
  locationStatus: number
  vipType: number
  followed: boolean
  mutual: boolean
  authenticated: boolean
  lastLoginTime: number
  lastLoginIP: string
  remarkName: null
  viptypeVersion: number
  authenticationTypes: number
  avatarDetail: null
  anchor: boolean
}
}

interface UserDetail {
  level: number
  listenSongs: number
  userPoint: {
    userId: number
    balance: number
    updateTime: number
    version: number
    status: number
    blockBalance: number
  }
  mobileSign: boolean
  pcSign: boolean
  profile: {
    privacyItemUnlimit: {
      area: boolean
      college: boolean
      gender: boolean
      age: boolean
      villageAge: boolean
    }
    avatarDetail: null
    backgroundImgIdStr: string
    avatarImgIdStr: string
    description: string
    userId: number
    nickname: string
    avatarUrl: string
    vipType: number
    userType: number
    createTime: number
    birthday: number
    mutual: boolean
    followed: boolean
    remarkName: null
    authStatus: number
    detailDescription: string
    experts: {}
    expertTags: null
    djStatus: number
    accountStatus: number
    gender: number
    province: number
    city: number
    defaultAvatar: boolean
    avatarImgId: number
    backgroundImgId: number
    backgroundUrl: string
    signature: string
    authority: number
    followeds: number
    follows: number
    blacklist: boolean
    eventCount: number
    allSubscribedCount: number
    playlistBeSubscribedCount: number
    avatarImgId_str: string
    followTime: null
    followMe: boolean
    artistIdentity: []
    cCount: number
    inBlacklist: boolean
    sDJPCount: number
    playlistCount: number
    sCount: number
    newFollows: number
  }
  peopleCanSeeMyPlayRecord: boolean
  bindings: {
    expired: boolean
    url: string
    userId: number
    expiresIn: number
    refreshTime: number
    bindingTime: number
    tokenJsonStr: null
    id: number
    type: number
  }[]
  adValid: boolean
  code: number
  newUser: boolean
  recallUser: boolean
  createTime: number
  createDays: number
  profileVillageInfo: {
    title: string
    imageUrl: string
    targetUrl: string
  }
}




export type {
  LoginStatusType,
  QRCOdeKeyType,
  QRCodeImgType,
  Waiting,
  Authorizing,
  AuthSuccess,
  QRCodeState,
  QrCodeAction,
  UserDetail,
  UserAccount,
}

export { QrCodeType }
