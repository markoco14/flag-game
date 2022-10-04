import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import FlagCalendar from '../../../components/FlagCalendar'
import FlagList from '../../../components/FlagList'
import DashboardNav from '../../../components/DashboardNav'

const FlagsHome: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Flag Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className={`${styles.primary_nav}`}>
          {/* <Link href="/teachers"><a>Dashboard</a></Link> */}
          {/* <Link href="/teachers/flags"><a>Flags</a></Link> */}
          <Link href="/teachers/flags/#"><a>Profile</a></Link>
          <Link href="/"><a>Log Out</a></Link>
        </nav>
      </header>
      <main className={`${styles.flex} ${styles.dashboard}`}>
        <DashboardNav></DashboardNav>
        <section className={`${styles.dashboard_content}`}>
          <h1>Welcome Back, Teacher Mark</h1>
          <FlagCalendar></FlagCalendar>
          <div className={`${styles.flex} ${styles.flex_between} ${styles.flex_grow} ${styles.flex_gap}`}>
            <FlagList></FlagList>
            <article className={`${styles.card}`}>
              <div className={`${styles.dashboard_image_container}`}>
                <Image 
                  className={styles.stacked_img}
                  src="/images/flags_ui_screenshot.jpg"
                  layout='fill'
                  objectFit='cover'
                  alt="An image of a flagboard"
                  // width={100} 
                  // height={100}
                />
              </div>
                <h2>
                  <Link href="flags/create"><a>Create</a></Link>
                </h2>
            </article>
            <article className={`${styles.card}`}>
              <h2>
                <Link href="#"><a>All Teacher&apos;s Flags</a></Link>
              </h2>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FlagsHome
