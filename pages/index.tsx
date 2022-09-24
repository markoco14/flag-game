import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <Link href="/"><a>Home</a></Link>
        </nav>
      </header>
      <main className={styles.main}>
        <h1>Log In</h1>
        <p>This page will eventually be the log in page. You can just click &apos;Go!&apos; for now.</p>
        <form>
          <div>
            <label>email</label>
            <input type="text" />
          </div>
          <div>
            <label>password</label>
            <input type="text" />
          </div>
          <Link href="/teachers"><a>Go!</a></Link>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
