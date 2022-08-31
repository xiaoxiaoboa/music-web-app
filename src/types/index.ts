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

export interface ListTpye {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}