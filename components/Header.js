import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="p-5 border-b-2 flex flex-row">
            <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-4">
                {/* // moralisAuth false 不连接服务器 */}
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
