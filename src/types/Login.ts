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

export type { LoginStatusType }