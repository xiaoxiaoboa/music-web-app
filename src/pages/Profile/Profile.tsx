import { FC, ReactElement, useMemo,memo } from "react"
import { useRecoilValue } from "recoil"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import { UserLikedAlbums, UserLikedPlayLists, UserState } from "../../recoil"
import getNewUrl from "../../utils/getNewUrl"
import List from "../../components/List"
import { RouterPath } from "../../types"

const Profile: FC = (): ReactElement => {
  const userInfo = useRecoilValue(UserState)
  const userPlayLists = useRecoilValue(UserLikedPlayLists)
  const userLikedAlbums = useRecoilValue(UserLikedAlbums)

  /* 计算日期 */
  const getDate = useMemo(
    () =>
      (value?: number): string => {
        const date = new Date(value!)
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        const yearsAgo = Math.floor(
          (Date.now() - value!) / 1000 / 60 / 60 / 24 / 365
        )

        return `${yearsAgo}年 (${year}年${month}月)`
      },
    [userInfo]
  )

  return (
    <Container>
      <UserInfo>
        <Avatar size={"140px"} src={getNewUrl(userInfo?.avatar)} />
        <Name>{userInfo?.nickName}</Name>
        <Info>
          <span>{userInfo?.follows} 关注</span>
          <span className="division">|</span>
          <span>{userInfo?.followeds} 粉丝</span>
          <span className="division">|</span>
          <span>Lv.{userInfo?.level}</span>
          <span className="division">|</span>
          <span>{getDate(userInfo?.createTime)}</span>
        </Info>
      </UserInfo>
      <Content>
        <SongLists>
          {userPlayLists.length < 1 ? <></> : <h1>我收藏的歌单</h1>}

          <List
            datas={{
              type: RouterPath.SONGLIST,
              list: userPlayLists
            }}
            amount={5}
            w={300}
            h={300}
          />
        </SongLists>
        <Albums>
          {userLikedAlbums.length < 1 ? <></> : <h1>我收藏的专辑</h1>}

          <List
            datas={{ type: RouterPath.ALBUM, list: userLikedAlbums }}
            amount={5}
            w={300}
            h={300}
          />
        </Albums>
      </Content>
    </Container>
  )
}

export default memo(Profile)

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 30px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`
const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  .division {
    color: #7b7b7b7a;
  }
`
const Name = styled.h1``

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const SongLists = styled(Content)`
  gap:20px;
`
const Albums = styled(Content)`
  gap:20px;
`
