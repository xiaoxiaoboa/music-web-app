import { FC, ReactElement, useEffect, useReducer, useState,memo } from "react"
import styled from "styled-components"
import Loading from "../../components/Loading"
import { request } from "../../utils/request"
import {
  QRCodeState,
  QrCodeType,
  QrCodeAction,
  QRCOdeKeyType,
  QRCodeImgType,
  Waiting,
  Authorizing,
  AuthSuccess,
  UserDetail,
  UserAccount
} from "./types"
import { User } from "../../types"
import { useSetRecoilState } from "recoil"
import { UserState } from "../../recoil"
import { addMessage } from "../../components/Snackbar"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "../../types"

const reducer = (state: QRCodeState, action: QrCodeAction): QRCodeState => {
  const { type, payload } = action
  switch (type) {
    case QrCodeType.KEY:
      return { ...state, ...{ key: payload as string } }

    case QrCodeType.BASE64:
      return { ...state, ...{ base64: payload as string } }

    case QrCodeType.IS_LOADING:
      return { ...state, ...{ isLoading: payload as boolean } }

    case QrCodeType.MESSAGE:
      return { ...state, ...{ message: payload as string } }
    case QrCodeType.RESET:
      return payload as QRCodeState
    default:
      return state
  }
}
const initialState: QRCodeState = {
  key: "",
  base64: "",
  message: "",
  isLoading: false
}

const Login: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [reset, setReset] = useState<boolean>(false)
  const setUser = useSetRecoilState(UserState)
  const navigate = useNavigate()

  useEffect(() => {
    /* 加载中 */
    dispatch({ type: QrCodeType.IS_LOADING, payload: true })

    /* 获取二维码key */
    request("login/qr/key", "GET")
      .then((res: QRCOdeKeyType) => {
        dispatch({ type: QrCodeType.KEY, payload: res.data.unikey })

        /* 获取二维码 */
        return request(
          "login/qr/create",
          "GET",
          `&key=${res.data.unikey}&qrimg=true`
        )
      })
      .then((res: QRCodeImgType) => {
        dispatch({ type: QrCodeType.IS_LOADING, payload: false })

        dispatch({ type: QrCodeType.BASE64, payload: res.data.qrimg })
      })
      .catch(() =>
        dispatch({ type: QrCodeType.MESSAGE, payload: "二维码初始化失败" })
      )
  }, [reset])

  useEffect(() => {
    if (state.base64.length < 0) return
    const timer = setInterval(() => {
      request("login/qr/check", "GET", `&key=${state.key}`).then(
        async (status: Waiting | Authorizing | AuthSuccess) => {
          if (status.code === 800) {
            dispatch({ type: QrCodeType.MESSAGE, payload: status.message })
            clearInterval(timer)
          } else if (status.code === 802) {
            dispatch({ type: QrCodeType.MESSAGE, payload: status.message })
          } else if (status.code === 803) {
            clearInterval(timer)
            dispatch({ type: QrCodeType.MESSAGE, payload: status.message })

            /* 把用户信息存到本地 */
            request("user/account", "GET").then((useraccount: UserAccount) => {
              if (useraccount.profile) {
                request(
                  "user/detail",
                  "GET",
                  `&uid=${useraccount.account.id}`
                ).then((UserDetail: UserDetail) => {
                  saveUser(UserDetail, useraccount.account.id)
                  navigate(RouterPath.PROFILE, { replace: true })
                })
              } else {
                addMessage("未登录成功，请重试！")
              }
            })
          }
        }
      )
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [state.base64])

  /* 重置二维码 */
  const handleReSet = (): void => {
    dispatch({ type: QrCodeType.RESET, payload: initialState })
    setReset(!reset)
  }

  /* 把用户信息存入本地 */
  const saveUser = (value: UserDetail, id: number): void => {
    const userData: User = {
      id: id,
      nickName: value.profile.nickname,
      avatar: value.profile.avatarUrl,
      level: value.level,
      follows: value.profile.follows,
      followeds: value.profile.followeds,
      createTime: value.createTime
    }
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(() => userData)
  }

  return (
    <>
      {state.isLoading ? (
        <Loading />
      ) : (
        <LoginContainer>
          <LoginWrapper>
            <ImgWrapper>
              <img src={state.base64} />
              {state.message.length > 0 ? (
                <NoticeMask>
                  <span>{state.message}</span>
                  {/过期/.test(state.message) ? (
                    <span className="reset" onClick={handleReSet}>
                      点击刷新
                    </span>
                  ) : (
                    <></>
                  )}
                </NoticeMask>
              ) : (
                <></>
              )}
            </ImgWrapper>
            <span>网易云音乐APP扫码</span>
          </LoginWrapper>
        </LoginContainer>
      )}
    </>
  )
}

export default memo(Login)

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

  & img {
    border-radius: 10px;
  }
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
  border-radius: 10px;

  .reset {
    cursor: pointer;
  }
`
