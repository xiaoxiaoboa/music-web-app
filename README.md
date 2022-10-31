

**本项目只为学习使用！**

本项目是一个音乐网站 **音乐数据采用：** **[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)** 感谢大佬！！ 

UI部分参考了：[YesPlayMusic](https://github.com/qier222/YesPlayMusic) 感谢大佬！！ 

源码放在了Github上，和API部分一块部署在Vercel，所以数据响应有点慢

演示：**[Music](https://m.freezxb.cc)**

源码：**[music-web-app](https://github.com/xiaoxiaoboa/music-web-app)**

# 技术栈

- **[Vite](https://github.com/vitejs/vite)**
- **[React](https://github.com/facebook/react)**
- **[TypeScript](https://github.com/microsoft/TypeScript-Website)**
- **[React-Router](https://github.com/remix-run/react-router)**
- **[Recoil](https://github.com/facebookexperimental/Recoil)**
- **[Styled-Components](https://github.com/styled-components/styled-components)**
- **[React-Icons](https://github.com/react-icons/react-icons)**

本项目的组件大部分是自己写的！参考大佬的代码的部分都做了标注！

# 跑起来

先clone或者下载代码

在env文件中修改你的API链接：

```
VITE_REACT_APP_NETEASEMUSIC_API = http://example.com/
```

安装依赖：

```
yarn
```

本地运行：

```
yarn vite 
```

构建：

```
yarn vite build
```



# 组件

## Slider

![image](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/image.3vxfnl6dzde0.png) 

Slider本身由三个div元素组成，外层还有个wrapper

白色底部track，紫色划过部分slid，滑块thumb

wrapper为relative，其余三个元素都为absolute

想要把thumb的中心和slid最右侧对齐，需要把thumb的位置左移自身半径的距离

### 移动

现在样式有了，下一步鼠标点击track时，thumb和slid跟随移动

想要元素跟随鼠标，其一元素需要有定位，其二需要获得鼠标的位置，

定位已经有了，现在需要先获得鼠标到track左侧的距离，而不是到body的距离 

```
鼠标到track左侧的距离 = 鼠标到body左侧的距离  - track到body左侧的距离
```

#### track到body左侧的距离

Element对象有个原生API，可以直接获取到**track到body左侧的距离** 

```js
 trackElement.getBoundingClientRect()

 //Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
```

![image](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/image.4arp7x270qy0.png)
![image](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/image.5lzvmjzjsgg0.png)
上图是它的返回结果，其中x/left就是我们想要的值

#### 鼠标到body左侧的距离

点击事件中可以通过e.clientX获取到 

```html
<style>
    .box{
        width: 300px;

        height: 300px;

        background-color: red;

      }

</style>

<script>

    const element = document.querySelector(".box")

    element.addEventListener("click", e => {

      console.log("e.clientX:",e.clientX)

    })

  </script>
```

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/1.7krmugzto4k0.gif)
两个重要的值已经拿到，可以通过点击移动元素了。不过还不能拖拽 

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/2.588zxyqkds00.gif)

### 拖拽

有了上面的基础，拖拽就简单了。

通过document的move事件来监听，获取鼠标在整个body内的位置。

鼠标移动过程中持续获取位置，即可实现推拽

鼠标松开，清除事件 

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/3.5fpszhlnh6o0.gif)

不过最后还是计算一下百分比比较好 

```js
const percentCalculate =(value: number, htmlElement: HTMLDivElement): number => {

   const rel = Math.round((value / htmlElement.clientWidth) * 100)

   console.log(rel)

    return rel > 100 ? 100 : rel < 0 ? 0 : rel

}  
```

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/4-tuya.3febgohnj800.gif)

### 进度条

Slider做好了，接下来可以把组件应用到音乐、视频、音量中了

#### 音乐、视频

音乐和视频元素的都有获得currentTime和duration的接口 

```js
mediaElement.ontimeupdate
//用此事件即可获取currentTIme
mediaElement.oncanplay
//用此事件即可获取duration
```

获取到currentTime和duration后，将数字型的毫秒值转换成字符串型的分钟  

```js
//currentTime
const toMinute = () => {

    //2:06
    return (

      ("" + (Math.floor(currentTime / 60) % 60)).slice(-2) +

      ":" +

      ("0" + (currentTime % 60)).slice(-2)

    )

  }
  
```

```js
//duration
const format = (duration: number): string => {

  if (duration === 0) return "0:00"

  const minute = Math.floor(duration / 60)

  const second = Math.floor(duration - minute * 60)

  return minute + ":" + ("0" + second).slice(-2)

}
```

有了currentTime后，Slider需要和currentTime同步

1. 首先需要一个变量**isInterActive**，表示是否在交互中

2. 其次需要将currentTime的毫秒值，通过计算转换成Slider的值：
   
    用duration / 100 ：将duration分为100份儿(上面设计的是Slider的值最高为100)，拿到一份儿的值
   
    用currentTime / 一份儿的值： 表示现在的currentTime占了几份儿，也就是在Slider中占的百分比

```js
 const tempValue =   currentTime / (Math.floor(duration) / 100).toFixed(1)

 parseFloat(tempValue) //最终的交给Slider的值
```

在isInterActive为false，也就是未交互的状态下，currentTime根据媒体的时间变化而变化；currentTime通过计算转换成Slider的值，Slider的值根据currentTime的变化而变化
同步完成！

有了未交互状态就有交互状态，也就是用户操作Slider时。
交互状态下，切断currentTime和Slider的同步，当用户拖拽Thumb时，根据Slider的位置将值转换为相应的currentTime。 

```js
//dragging
consst SliderValueToCurrentTime = Math.floor(SliderValue * (duration / 100)) 
//上面说到Slider的值表示几份儿，duration / 100 表示一份儿的值
//这里得到的值经过上面currentTime的转换函数后就得到了字符串类型的值
```

交互结束后也该有后续操作，在媒体中表现就是快进了
所以结束交互后(松开了鼠标按键),应该把上面得到的SliderValueToCurrentTime的值赋给media

最后是这样子的： 

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/5.3benqn0w6hu0.gif)

视频同理

#### 音量

```
MDN:
HTMLMediaElement.volume 属性可设置媒体播放时的音量。
取值为 0 到 1 的双精度值。0 为静音，1 为音量最大时的值。
```

取值范围是0-1的双精度值。例：0.25

根据上面设计的Slider的值最大为100，最小为1。

```js
    SliderValue / 100
```

计算后的值，正好可以赋值给媒体元素

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/6.6hm7y8tpah00.gif)

### 逻辑

Slider props

```ts
interface SliderProps {
  //样式
  styles: { width: string; padding: string }
  //媒体元素
  media?: HTMLMediaElement
  //是否静音
  isMuted?: boolean
  //是否点击了音量组件的喇叭按钮
  clicked?:boolean
  //音量
  volume?: number
  //媒体的currentTime
  currentTime?: { num: number; str: string }
  //媒体的duration
  duration?: { num: number; str: string }
  //父组件获取SliderValue
  getSliderValue?: (value: number, isInterActive?: boolean) => void
  //父组件获取isInterActiveValue
  getisInterActiveValue?: React.Dispatch<React.SetStateAction<boolean>>
}
```

#### 媒体

利用useEffect
当媒体存在且是未交互状态下，依赖变化时把媒体currentTime经过计算赋值给Slider

```js
useEffect(() => {
    if (isInterActive === false && props.media) {
      const temp =
        props.currentTime?.num! / (Math.floor(props?.duration?.num!) / 100)
      setSliderValue(() => parseFloat(temp.toFixed(1)))
    }
  }, [props.currentTime?.num!])
```

利用useEffect，依赖变化时判断媒体是否存在，如果存在则把isInterActive传递过去
还判断isInterActive是否为false，false则把SliderValue经过计算后赋值给媒体的currentTime（媒体快进）

```js
useEffect(() => {
    /* 如果是Media类型的Slider，就可以获取isInterActive的值 */
    if (props.media) {
      props.getisInterActiveValue!(isInterActive)
    }
    /* isInterActive为false并且类型是Media时， */
    if (isInterActive === false && props.media) {
      const currentTime = Math.floor(
        (sliderValue * props?.duration?.num!) / 100
      )
      props.media.currentTime = currentTime
    }
  }, [isInterActive])
```

利用useEffect，依赖变化时，把sliderValue，isInterActive(可选)传递过去

```js
useEffect(() => {
    if (props.getSliderValue) {
      props.getSliderValue(sliderValue, isInterActive)
    }
  }, [sliderValue])
```

#### 音量

利用useEffect， 依赖变化时：

1. 判断isMuted是否为true，是则把sliderValue更新为0，静音时音量为0
2. 同时利用利用useEffect返回的函数(这个函数内获取到的变量为上一次的值)，判断上一次isMuted是否为true，并且sliderValue是否大于0，都为真时，把上次的sliderValue，更新到sliderValue中
3. 用clicked作为依赖是因为这个函数功能是为音量按钮服务的，和操作音量条无关
   
   ```js
   useEffect(() => {
       /* 当静音时，音量条应该为0 */
       if (props.isMuted) {
         setSliderValue(0)
       }
       return () => {
         /*
           当取消静音时，音量条应该恢复静音前的值
           但是当之前的值为0时，则不需要恢复
          */
         if (props.isMuted && sliderValue !== 0) {
           setSliderValue(sliderValue)
         }
       }
     }, [props.clicked])
   ```
   
   具体实现是这样的：

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/8.5lpfvysemr80.gif)

#### Hooks

处理拖拽

```tsx
import { MouseEventHandler, useEffect, useMemo, useState } from "react"

interface IProps {
  trackElement: HTMLDivElement
  setSliderValue: React.Dispatch<React.SetStateAction<number>>
}

export default function useDrag({
  trackElement,
  setSliderValue
}: IProps): [boolean, MouseEventHandler] {
  /* 鼠标距文档左侧X轴距离 */
  const [mouseX, setMouseX] = useState<number>(0)

  /* Slider是否在交互中 */
  const [isInterActive, setIsInterActive] = useState<boolean>(false)

  /* track左边到浏览器左边缘的距离 */
  const offSetLeft: number = useMemo(
    () => Math.round(trackElement?.getBoundingClientRect().x),
    [trackElement?.getBoundingClientRect().x]
  )

  /* 鼠标位置改变时，计算成百分比后更新state */
  useEffect(() => {
    if (offSetLeft === undefined || mouseX === 0) return
    setSliderValue(() => percentCalculate(mouseX - offSetLeft, trackElement))
  }, [mouseX])


  const startDrag: MouseEventHandler = e => {
    /* 鼠标单击落下时 */
    const handleMouseDown = () => {
      e.preventDefault()
      setIsInterActive(true)
      setMouseX(() => e.clientX)
    }

    /* 拖拽鼠标时 */
    const handleMouseDrag = (e: globalThis.MouseEvent) => {
      e.preventDefault()
      setMouseX(() => e.clientX)
    }

    /* 松开鼠标时 */
    const handleMouseUp = () => {
      setIsInterActive(false)
      document.onmousedown = null
      document.onmousemove = null
      document.onmouseup = null
    }
    
    document.onmousedown = handleMouseDown
    document.onmousemove = handleMouseDrag
    document.onmouseup = handleMouseUp
  }

  /* 百分比计算 */
  const percentCalculate = useMemo(
    () =>
      (value: number, htmlElement: HTMLDivElement): number => {
        const rel = Math.round((value / htmlElement?.clientWidth) * 100)
        return rel > 100 ? 100 : rel < 0 ? 0 : rel
      },
    [mouseX]
  )



  return [isInterActive, startDrag]

}
```

## Snackbar 消息通知

此组件参考自：[基于 React, 如何实现全局提示？](https://zhuanlan.zhihu.com/p/261782576)

首先messages是一个对象组成的数组，对象包含id和message字符串。使用map方法把数组中的message渲染出来。

除了导出组件本身外，还导出了一个addMessage函数。该函数用来添加message，接收一个字符串，和一个随机字符串一起组成一个对象,存储到messages状态中,同时开启一个计时器，3秒后清除message和计时器

每次添加新消息时，都会判断消息数量是否大于某个值，一旦超过就删除开头的消息

不过组件未添加动画，看起来不是很舒服

```tsx
import { FC, ReactElement, useEffect, memo, useState } from "react"
import styled from "styled-components"
import Button from "../Button"
import { IoClose } from "react-icons/io5"
import { BiMessageDetail } from "react-icons/bi"

interface MessageType {
  id: string
  message: string
}

/* 导出的API */
let addMessage: (value: string) => void


const Snackbar: FC = (): ReactElement => {
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    if (messages.length > 8) {
      const [firstMessage] = messages
      deleteMessage(firstMessage.id)
    }
  }, [messages])

  /* 添加消息 */
  addMessage = (value: string) => {
    const newMessage = { id: generateRandomStrig(), message: value }
    setMessages(prev => [newMessage, ...prev])

    const timer = setTimeout(() => {

      deleteMessage(newMessage.id)

      clearTimeout(timer)

    }, 3000)

  }


  /* 删除消息  */

  const deleteMessage = (value: string) => {
   setMessages(prev => prev.filter(({ id }) => id !== value))
  }

  /* 生成随机字符串 */
  const generateRandomStrig = (): string => {
    return Math.random().toString(36).slice(-8) + new Date()
  }

  return (
    <Container>
      {messages.map(({ id, message }) => (
        <Item key={id}>
          <Icon>
            <BiMessageDetail className="BiMessageDetail" />
          </Icon>
          <Messages>{message}</Messages>
          <Button onClick={() => deleteMessage(id)}>
            <IoClose className="IoClose" />
          </Button>
        </Item>
      ))}
    </Container>
  )
}

export { addMessage }
export default memo(Snackbar)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 90px;
  right: 30px;
  color: ${props => props.theme.reverse_primary_color};
  align-items: flex-end;
  gap: 12px;
  z-index: 999;

  .BiMessageDetail,
  .IoClose {
    font-size: 20px;
    color: inherit;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.reverse_primary_bgColor};
  border-radius: 8px;
  gap: 0px;
  min-width: 200px;
  height: 50px;
`

const Icon = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 36px;
  height: 36px;

  .BiMessageDetail {
    position: absolute;
    top: 6px;
    margin: 4px;
  }
`

const Messages = styled.div`
  flex: 2;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
`
```

![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/9.ggh2q87kk9c.gif)

## AudioPlayer

![player播放流程](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/player播放流程.4kq3xydbg9i0.svg)

```tsx
import { FC, ReactElement, useCallback, useEffect, useState, memo } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  SongCover,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist
} from "./index.style"

import {
  CheckMusic,
  FontColor,
  PlayListUrls,
  PlayMode,
  Track
} from "../../../types"

import Middle from "./Controller/Middle"
import Right from "./Controller/Right"
import { useRecoilState, useRecoilValue} from "recoil"
import { AudioState, PlayListState } from "../../../recoil"
import imgSize from "../../../utils/imgSize"
import { addMessage } from "../../Snackbar"
import { request } from "../../../utils/request"
import getNewUrl from "../../../utils/getNewUrl"
import SpecialFont from "../../SpecialFont"
import styled from "styled-components"

const Player: FC = (): ReactElement => {
  const [state, setState] = useRecoilState(AudioState)
  const [indexCache, setIndexCache] = useState<number | null>(null)
  const playList = useRecoilValue(PlayListState)

  /* 组件卸载时，歌曲要暂停 */
  useEffect(() => {
    /*
      canplay的作用是，audioplayer组件如果已经渲染出来了，则音乐可以播放，反之如果组件已经卸载则不允许播放
    */
    
    /* 渲染后 */
    setState(prev => ({ ...prev, ...{ canPlay: true } }))

    return () => {
      /* 卸载前 */
      setState(prev => ({ ...prev, ...{ canPlay: false } }))
      handlePause()
    }
  }, [])

  /* 播放索引更新，则请求链接，播放 */
  useEffect(() => {
    if (state.playIndex !== null && state.canPlay) {
      checkMusic(playList[state.playIndex].id).then(() => {
        changeUrl(state.playIndex!, true)
      })
    }
  }, [state.playIndex])

  /* 打开页面后，播放列表内有上次的歌曲，就先请求链接，但不播放 */
  useEffect(() => {
    if (state.playIndex !== null && state.audio.src === "") {
      checkMusic(playList[state.playIndex].id).then(() => {
        changeUrl(state.playIndex!, false)
      })
    }
  }, [])

  /* playlist和state更新时，存入localStorage */
  useEffect(() => {
    localStorage.setItem("audiolist", JSON.stringify(playList))
  }, [playList])
  useEffect(() => {
    const tempData = JSON.parse(localStorage.getItem("audiostate") as string)
    const newData = {
      playIndex: state.playIndex,
      playMode: state.playMode
    }
    const result = { ...tempData, ...newData }
    localStorage.setItem("audiostate", JSON.stringify(result))
  }, [state.playIndex, state.playMode])

  /* 开始 */
  const handlePlay = (): void => {
    state.audio
      .play()
      .then(() =>
        setState(prev => ({
          ...prev,
          ...{ isPlaying: !state.audio.paused }
        }))
      )
      .catch(err => {
        handlePause()
        addMessage("歌曲播放失败，准备下一首...")
        // console.log("播放失败", err)
        next()
      })
  }

  /* 暂停 */
  const handlePause = (): void => {
    state.audio.pause()
    setState(prev => ({
      ...prev,
      ...{ isPlaying: !state.audio.paused }
    }))
  }

  /* 选择播放模式 */
  const selectMode = () => {
    switch (state.playMode) {
      case PlayMode.SHUFFLE:
        return shufflePlay()
      case PlayMode.LOOP:
        return loop()
      case PlayMode.LISTLOOP:
        return listLoop()
      default:
        return
    }
  }

  /* 一首歌播放结束时触发 */
  state.audio.onended = () => {
    setIndexCache(state.playIndex) 
    selectMode()
  }

  /* 下一首 */
  const next = useCallback((): void => {
    if (playList.length <= 1) return
    setIndexCache(state.playIndex)
    selectMode()
  }, [state])

  /* 上一首 */
  const prev = useCallback((): void => {
    if (indexCache !== null) {
      setState(prev => ({ ...prev, ...{ playIndex: indexCache } }))
    }
  }, [indexCache])

  /**
   * 获取歌曲url，开始播放
   * @param index 歌曲在播放列表中的数组下标索引
   * @param isPlay 拿到url后是否立即播放
   */
  const changeUrl = async (index: number, isPlay: boolean) => {
    await request(
      "song/url/v1",
      "GET",
      `&id=${playList[index].id}&level=exhigh`
    ).then((res: PlayListUrls) => {
      /* 如果返回的url是null，换一个链接播放 */
      let url: string = ""
      if (res.data[0].url) {
        url = getNewUrl(res.data[0].url)
      } else {
        url = `//music.163.com/song/media/outer/url?id=${playList[index].id}.mp3`
      }

      state.audio.src = url
      if (isPlay) handlePlay()
    })
  }

  /**
   * 检测歌曲是否能播放
   * @param id 歌曲id
   */
  const checkMusic = async (id: number) => {
    return await request("check/music", "GET", `&id=${id}`)
      .then((res: CheckMusic) => {
        if (res.success) {
          return res
        } else {
          addMessage(res.message + ",准备下一首...")
          selectMode()
        }
      })
      .catch(() => {
        addMessage("歌曲检测失败，准备下一首...")
        selectMode()
      })
  }

  /* 单曲循环 */
  const loop = (): void => {
    handlePause()
    handlePlay()
  }
  
  /* 列表循环 */
  const listLoop = (): void => {
    let index: number = state.playIndex === null ? 0 : state.playIndex! + 1
    if (index >= playList.length)
      return setState(prev => ({ ...prev, ...{ playIndex: 0 } }))
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
    // changeUrl(index)
  }

  /* 随机播放 */
  const shufflePlay = () => {
    /* 保存最后要播放的索引 */
    let index: number = 0
    let tempArr: Track[] = []

    /* 除去正在播放的那首歌，其余的保存在临时数组中 */
    if (state.playIndex) {
      tempArr = playList.filter(obj => obj.id !== playList[state.playIndex!].id)
    } else {
      tempArr = [...playList]
    }
    
    /* 如果还有其余的歌曲，（播放列表大于1） */
    if (tempArr.length > 0) {
      /* 在临时数组中随机出一首歌 */
      const random = tempArr[Math.floor(Math.random() * tempArr.length)]
      /* 在播放列表中找出这首歌的索引 */
      index = playList.findIndex(obj => obj.id === random.id)
    } else if (state.audio.paused) {
      /* 如果临时数组中没有其他歌曲同时播放已经暂停了，就继续播放这一首 */
      handlePlay()
    }
    /* 更新播放索引 */
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
  }

  /* 改变播放模式图标 */
  const handleClickIcon = useCallback(() => {
    switch (state.playMode) {
      case PlayMode.LISTLOOP:
        return setState(prev => ({ ...prev, ...{ playMode: PlayMode.LOOP } }))
      case PlayMode.LOOP:
        return setState(prev => ({
          ...prev,
          ...{ playMode: PlayMode.SHUFFLE }
        }))
      case PlayMode.SHUFFLE:
        return setState(prev => ({
          ...prev,
          ...{ playMode: PlayMode.LISTLOOP }
        }))
    }
  }, [state.playMode])

  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src={getNewUrl(
              imgSize(playList[state.playIndex!]?.al.picUrl, 60, 60)
            )}
          />
          <SongDetails>
            <SongTitle title={playList[state.playIndex!]?.name}>
              {playList[state.playIndex!]?.name}
            </SongTitle>
            <Artist>
              <SpecialFont
                link
                color={FontColor.LINKCOLOR}
                to={{
                  path: "/artistdetail",
                  id: playList[state.playIndex!]?.ar[0].id
                }}
              >
                {playList[state.playIndex!]?.ar[0].name}
              </SpecialFont>
            </Artist>
          </SongDetails>
        </SongCover>
        <Middle
          handlePlay={handlePlay}
          handlePause={handlePause}
          prev={prev}
          next={next}
        />
        <Right
          audio={state.audio!}
          playMode={state.playMode}
          clickIcon={handleClickIcon}
          playListCount={playList.length}
          playingId={playList[state.playIndex!]?.id}
        />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default memo(Player)

export const ControllerBarContainer = styled.div`
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.0625rem solid #9370db;
  user-select: none;
`

export const ControllerWrapper = styled.div`
  display: flex;
  width: 90%;
`

export const SongCover = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const SongCoverImg = styled.img`
  width: 3.75rem;
  border-radius: 0.3125rem;
`

export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  max-width: 260px;
  overflow: hidden;
`

export const SongTitle = styled.span`
  display: flex;
  font-size: 1.125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Artist = styled.span`
  display: flex;
  font-size: 0.875rem;
`
```

## 网站颜色-styled-components

项目中使用了styled-components来做CSS部分，一种csss in js 方案。

```jsx
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

<Title>当做一个组件来调用</Title>
```

### 主题

它可以创建全局的颜色，来实现网站`light` `dark`切换

首先创建一个声明文件

```js
import 'styled-components';

declare module 'styled-components' {

  export interface DefaultTheme {
    primaryColor: string
    secondaryColor: string
  }

}
```

接着可以写具体颜色了：

```js
import { createGlobalStyle, DefaultTheme } from "styled-components"

//明亮模式
export const LightTheme: DefaultTheme = {
    primaryColor: #black,
    secondaryColor: #gray
}
//暗黑模式
export const DarkTheme: DefaultTheme = {
    primaryColor: #white,
    secondaryColor: #lightgray,
}

export const GlobalStyle = createGlobalStyle`
    //可以写一些全局样式
`
```

调用之前需要有一个ThemeProvider包裹跟组件

```jsx
import { ThemeProvider } from "styled-components"
import { LightTheme, DarkTheme, GlobalStyle } from "."

const MyThemeProvider = ({ children }) => {

  const themeMode = useRecoilValue(ThemeState)

  return (

    <ThemeProvider theme={themeMode ? DarkTheme : LightTheme} >

      <GlobalStyle />

      {children}

    </ThemeProvider>

  )

}
```

调用：

```js
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.theme.primaryColor};
  // 会根据主题的切换而切换相应的颜色
`;
```

最后增加一个开关来控制主题的变化：

由于gif图片大小限制，只能把浏览器窗口缩小进行录制
![gif](https://cdn.staticaly.com/gh/xiaoxiaoboa/blog-pic@main/7.5ez3s7o6nvs.gif)

# 路由

路由使用React-Router

使用useRoutes构建路由表：

```jsx
import { lazy } from "react"
import { useRoutes } from "react-router-dom"

const ArtistDetail = lazy(() => import("../pages/ArtistDetail"))
const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const MvDetail = lazy(() => import("../pages/MvDetail"))
const SongListDetail = lazy(() => import("../pages/SongListDetail"))
const Album = lazy(() => import("../pages/Album"))
const SongLists = lazy(() => import("../pages/SongLists"))
const Profile = lazy(() => import("../pages/Profile"))
const Search = lazy(() => import("../pages/Search/Search"))


const Routes = () => {

  const element = useRoutes([

    {
      index: true,
      path: "/",
      element: <Home />
    },

    {
      path: "login",
      element: <Login />
    },

    {
      path: "mv",
      element: <MvDetail />
    },

    {
      path: "artist",
      element: <ArtistDetail />
    },

    {
      path: "album",
      element: <Album />
    },

    {
      path: "songlists",
      element: <SongLists />
    },

    {
      path: "songlist",
      element: <SongListDetail />
    },

    {
      path: "profile",
      element: <Profile />
    },

    {
      path: "search",
      element: <Search />
    }

  ])
  return element

}
export default Routes
```

把这个组件渲染到你想要的位置

```jsx
<div>
    <Routes />
</div>
```

项目中使用了两种路由跳转的方式：

```jsx
//函数式导航
import { useNavigate } from "react-router-dom"
const navigate = useNavigate()
navigate('/')

//NavLink
import { NavLink } from "react-router-dom"
<NavLink to={'/'} >
  <Li>首页</Li>
</NavLink>
```

# 状态

项目中少量使用了Recoil做管理状态

主要使用了atom：

```js
import { atom } from "recoil"

const numbers = atom({
  key: "numbers",  //是这个atom的唯一标识
  default: []      //默认值
})
```

调用：

```js
//常用的三个方法
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import numberState from './numbers'

//只读取值
const state = useRecoilValue(numberState)
//只更新值
const setState = useSetRecoilState(numberState)
//同时使用
const [state,setState] = useRecoilState(numberState)
```
