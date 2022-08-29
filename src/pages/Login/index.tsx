import { useEffect, useReducer, useState } from "react"
import styled from "styled-components"
import Loading from "../../components/Loading"
import {
  qrCodeKey,
  qrCodeImg,
  qrCodeCheck,
  getLoginStatus
} from "../../utils/request"
import { QRCodeState, qrCodeType, qrCodeAction } from "../../types"

const reducer = (state: QRCodeState, action: qrCodeAction): QRCodeState => {
  const { type, payload } = action
  switch (type) {
    case qrCodeType.KEY:
      return { ...state, ...{ key: payload as string } }

    case qrCodeType.BASE64:
      return { ...state, ...{ base64: payload as string } }

    case qrCodeType.IS_LOADING:
      return { ...state, ...{ isLoading: payload as boolean } }

    default:
      return state
  }
}
const initialState: QRCodeState = { key: "", base64: "", isLoading: false }

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(() => {
  //   /* 加载中 */
  //   dispatch({ type: qrCodeType.IS_LOADING, payload: true })

  //   /* 获取二维码key */
  //   qrCodeKey("login/qr/key")
  //     .then(res => {
  //       dispatch({ type: qrCodeType.KEY, payload: res.data.unikey })

  //       /* 获取二维码 */
  //       return qrCodeImg("login/qr/create", res.data.unikey)
  //     })
  //     .then(res => {
  //       dispatch({ type: qrCodeType.IS_LOADING, payload: false })

  //       dispatch({ type: qrCodeType.BASE64, payload: res.data.qrimg })

  //     })
  // }, [])

  // useEffect(() => {
  //   if (state.base64.length > 0) {
  //     qrCodeCheck("login/qr/check", state.key)
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  //   }
  // }, [state.base64])

  return (
    <LoginContainer>
      {state.isLoading ? (
        <Loading />
      ) : (
        <LoginWrapper>
          <ImgWrapper>
            <img src={state.base64} alt="" />
            {/* <NoticeMask>
              <span>二维码已过期</span>
              <span>点击刷新</span>
            </NoticeMask> */}
          </ImgWrapper>
          <span>网易云音乐APP扫码</span>
        </LoginWrapper>
      )}
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  padding: 0 10% 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`
const ImgWrapper = styled.div`
  position: relative;
  display: flex;
  /* padding: 30px 30px 10px 30px; */
`
const NoticeMask = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #cccccce8;
  width: 100%;
  height: 100%;
  color: black;
  font-weight: bold;
  gap: 8px;
  cursor: pointer;
`
