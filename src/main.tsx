import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import MyThemeProvider from "./utils/MyThemeProvider"
import { RecoilRoot } from "recoil"
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react"
import "@icon-park/react/styles/index.css"

const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "icon" }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MyThemeProvider>
        <IconProvider value={IconConfig}>
          <App />
        </IconProvider>
      </MyThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
)
