import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Home.module.css'

const FlagsHome: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <Link href="/"><a>Log Out</a></Link>
          <Link href="/teachers"><a>Dashboard</a></Link>
          <Link href="/teachers/flags"><a>Flags</a></Link>
        </nav>
      </header>
      <main className={styles.main}>
        <h1>Your Flags</h1>
        <p>Manage all your Flags here. Create, Edit, Delete, and Play all in one cozy interface.</p>
        <Link href="flags/play"><a>Play</a></Link>
      </main>
    </div>
  )
}

export default FlagsHome
