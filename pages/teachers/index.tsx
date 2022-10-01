import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import DashboardNav from '../../components/DashboardNav'

const TeachersHome: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sky Teachers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className={`${styles.primary_nav}`}>
          <Link href="/"><a>Log Out</a></Link>
          <Link href="/teachers"><a>Dashboard</a></Link>
          <Link href="/teachers/flags"><a>Flags</a></Link>
        </nav>
      </header>
      <main className={`${styles.flex} ${styles.dashboard}`}>
        <DashboardNav></DashboardNav>
        <section className={`${styles.flex} ${styles.flex_column}`}>
          <h1>Welcome back, Teacher Teacher!</h1>
          <p>This is your main dashboard. Keep track of everything you need to do today and throughout the week.</p>
          <p>Today&apos;s schedule</p>
          <p>Absent Today</p>
          <p>Flags</p>
          <p>Flags</p>
        </section>
      </main>
    </div>
  )
}

export default TeachersHome
