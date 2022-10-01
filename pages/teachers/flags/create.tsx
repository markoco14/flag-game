import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import DashboardNav from '../../../components/DashboardNav'
import FlagDetails from '../../../components/FlagDetails'
import FlagQuestionsList from '../../../components/FlagQuestionsList'

export default function PlayFlags() {
    return (
    <div>
        <Head>
        <title>Create Flags</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        </Head>
        <header>
        <nav className={`${styles.primary_nav}`}>
            <Link href="/"><a>Log Out</a></Link>
        </nav>
        </header>
        <main className={`${styles.flex} ${styles.dashboard}`}>
            <DashboardNav></DashboardNav>
            <section className={`${styles.flex} ${styles.create_flags_container}`}>
                <div className={styles.create_flags_interface}>
                    <h1>Create New Flag Set</h1>
                    <div className={`${styles.flex} ${styles.flex_between}`}>
                        <h2>New Flag Set</h2>
                        <span>Questions: 0</span>
                    </div>
                    <FlagDetails></FlagDetails>
                    <article>
                        <p>There are no questions in this flag set.</p>
                    </article>
                    <article className={`${styles.flex} ${styles.create_flags_bar}`}>
                        <p>Add question:</p>
                        <button className={styles.create_flags_button}>MC</button>
                        <button className={styles.create_flags_button}>Prompt</button>
                    </article>
                </div>
                <FlagQuestionsList></FlagQuestionsList>
            </section>
        </main>
    </div>
    )
}