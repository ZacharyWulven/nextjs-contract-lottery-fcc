// imports work with our front end
// require does not
// nodejs != ecmascript / javascript
// backendJS is a little different from front end JS

import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

// import 我们的 Header
//import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    // 这是它返回的 HTML
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Smart Contract Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {/* header / connect button / nav bar */}
            <LotteryEntrance />
        </div>
    )
}
