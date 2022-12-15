import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    //
    /**
     * useMoralis 就是 react hook
     * 一种跟踪状态的方法
     */
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()
    // some button that connects us and changes connected to be true

    /**
     * useEffect
     * 第一个参数是一个函数
     * 
     * 第二个参数是可选的，一个依赖数组
     * case1: useEffect 会检查依赖数组中的值，一旦数组中的值由变化就调用参数一的函数
     * case2: 这里不需要给数组也行
     * 如果不传依赖数组，它会随时重新渲染
     * 你要小心，因为你会获得 circular render
     * case3: 如果依赖数组是一个空数组，它只会在加载时运行一次，只运行一次

     */
    // automatically run on load
    // then, it'll run checking the value
    useEffect(
        function () {
            // 如果已经连接钱包则 return
            if (isWeb3Enabled) return
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        },
        [isWeb3Enabled]
    )

    useEffect(function () {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                // 没有账户，表示断开了钱包，此时清理 localStorage key-value pair
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {/* 没有账户显示连接按钮，否则显示已连接 */}
            {/* address 显示为 0xec49...ad6d */}
            {/* 切换账户会自动显示 */}
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    // await enableWeb3() 连接钱包
                    onClick={async function () {
                        await enableWeb3()
                        // local storage
                        // 设置注入设置项，记录最近的交互
                        // 连接钱包，查看 application，local storage 能看到 connected inject
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
