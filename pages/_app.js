import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

// _app.js 就是程序入口
function MyApp({ Component, pageProps }) {
    return (
        /**
         * 程序需要被 MoralisProvider 包裹起来，即所谓的 react 提供者
         * 这将成为我们的 context provider
         *
         * initializeOnMount 是可选 hook，进入服务器以向我们网站添加更多功能
         * 这里我们不想链接服务器，不需要额外功能
         *
         * MoralisProvider 就是 hook，
         * hook 允许函数组件访问状态和 react 功能
         */
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp
