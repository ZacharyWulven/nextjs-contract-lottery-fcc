// have a function to call the lottery
import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    console.log(chainId)

    // use State for entranceFee
    // useState("0") 设置初始值为 0
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    /**
     * 这个 dispatch (调度) 使用通知返回
     */
    const dispatch = useNotification()

    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // 这是我们发送交易的方式
    // 运行函数可以同时交易和读取状态
    // 可以发送交易也可以发送函数

    // 如果正在交易或加载 isLoading isFetching is true
    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getNumberOfPlayers",
        params: {},
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        setEntranceFee(entranceFeeFromCall)
        console.log(`fee is ${entranceFeeFromCall}`)

        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        setNumberOfPlayers(numPlayersFromCall)
        console.log(`numPlayersFromCall is ${numPlayersFromCall}`)

        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setRecentWinner(recentWinnerFromCall)
        console.log(`recentWinnerFromCall is ${recentWinnerFromCall}`)
    }

    useEffect(
        function () {
            if (isWeb3Enabled) {
                // try to read the raffle entrance fee
                updateUI()
            }
        },
        [isWeb3Enabled]
    )

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = async (tx) => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            Hi from LotteryEntrance!
            {raffleAddress ? (
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 round ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => {
                                    console.log(error)
                                },
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <div>Entrance Fee is: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                    <div>Number Of Players: {numberOfPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Deteched</div>
            )}
        </div>
    )
}
