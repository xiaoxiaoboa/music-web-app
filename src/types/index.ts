export interface QRCodeState {
  key: string
  base64: string
  isLoading: boolean
}


export enum qrCodeType {
  KEY = "key",
  BASE64 = "base64",
  IS_LOADING = 'isLoading'
}

export interface qrCodeAction{
  type: qrCodeType
  payload: string | boolean
}