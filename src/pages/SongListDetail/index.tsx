import React,{useState} from "react"
import { FaPlay } from "react-icons/fa"
import styled from "styled-components"
import Avatar from "../../components/Avatar"

const SongListDetail = () => {

  const [state, setState] = useState<boolean>(false)

  return (
    <Container>
      <SongListInfo>
        <CoverImg>
          <img
            src="https://p1.music.126.net/sk3LdkrtlSV2c582A2FWpw==/109951166319907830.jpg?param=1024y1024"
            alt=""
          />
        </CoverImg>
        <Desc>
          <div className="title">想和你在一起很久很久</div>
          <Creator>
            <Avatar
              src="https://p2.music.126.net/RTB72JJJapo01l4XfVDAWQ==/109951166349819975.jpg?param=224y224"
              size={`2rem`}
            />
            <LinkFont>野原新之助</LinkFont>
            <LightFont>2022-09-02 创建</LightFont>
          </Creator>
          <Tag>
            <label>标签：</label>
            <LinkFont>流行</LinkFont>
            <LinkFont>华语</LinkFont>
          </Tag>
          <Count>
            <SongsCount>
              <label>歌曲：</label>
              <LightFont>255</LightFont>
            </SongsCount>
            <PlayCount>
              <label>播放：</label>
              <LightFont>5000万</LightFont>
            </PlayCount>
            <CollectCount>
              <label>收藏：</label>
              <LightFont>100万</LightFont>
            </CollectCount>
            <ShareCount>
              <label>分享：</label>
              <LightFont>1000万</LightFont>
            </ShareCount>
          </Count>
          <PlayButton>
            <Button>
              <FaPlay />
              播放全部
            </Button>
          </PlayButton>
          <Intro height={state ? '100%': '52px'} onClick={() => setState(!state)}>
            <IntroLightFont as="div">
              <label>简介：</label>
              “古风”是一类新型的文化。“古风”以中国的传统文化为基调，结合中国传统的文学、琴棋书画、诗词歌赋等，经过不断的发展磨合，形成了比较完备的音乐、文学、绘画等艺术形式。
              戏曲唱腔
              戏曲音乐是中国汉族戏曲中的音乐部分,包括声乐部分的唱腔、韵白和器乐部分的伴奏、开场及过场音乐。其中以唱腔为主，有独唱、对唱、齐唱和帮腔等演唱形式，是发展剧情、刻画人物性格的主要表现手段。唱腔的伴奏、过门和行弦起托腔保调、衬托表演的作用。开场、过场和武场所用的打击乐等则是喧染气氛、调节舞台节奏与戏曲结构的重要因素。
            </IntroLightFont>
          </Intro>
        </Desc>
      </SongListInfo>
      <Songs>
        <Song></Song>
      </Songs>
    </Container>
  )
}

export default SongListDetail

const LinkFont = styled.span`
  cursor: pointer;
  color: ${props => props.theme.secondary_color};

  &:hover {
    text-decoration: underline;
  }
`
const LightFont = styled.span`
  font-size: 14px;
  color: ${props => props.theme.light_color};
`

const Container = styled.div`
  /* padding: 0 calc(10% - 17px) 1.25rem 10%; */
  padding: 0 10% 1.25rem 10%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SongListInfo = styled.div`
  flex: 1;
  display: flex;
`
const CoverImg = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */

  & img {
    margin-top: 8px;
    width: 280px;
    height: 280px;
    border-radius: 10px;
  }
`
const Desc = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    font-size: 32px;
    font-weight: bold;
  }
`
const Creator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const Tag = styled.div`
  display: flex;
  gap: 4px;
`
const Count = styled.div`
  display: flex;
  gap: 18px;
`
const SongsCount = styled.span``
const PlayCount = styled.span``
const CollectCount = styled.span``
const ShareCount = styled.span``

const PlayButton = styled.div`
  display: flex;
  padding: 4px 0;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  gap: 8px;
  font-size: 16px;
  background-color: ${props => props.theme.secondary_color};
  color: white;
`

interface IntroLightFontProps {
  height: string
}
const Intro = styled.div<IntroLightFontProps>`
  display: flex;
  overflow: hidden;
  height: ${props => props.height};
  cursor: pointer;
`
const IntroLightFont = styled(LightFont)`
  line-height: 24px;

  & label {
    font-size: 16px;
    color: ${props => props.theme.primary_color};
  }
`


const Songs = styled.div`
  flex: 2;
`

const Song = styled.div``
