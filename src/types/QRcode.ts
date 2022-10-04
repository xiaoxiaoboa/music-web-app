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
  QRCOdeKeyType,
  QRCodeImgType,
  Waiting,
  Authorizing,
  AuthSuccess,
  QRCodeState,
  QrCodeAction
}

export { QrCodeType }
