import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Home.module.css'
import DashboardNav from '../../../components/DashboardNav'
import FlagDetails from '../../../components/FlagDetails'
import FlagQuestionsList from '../../../components/FlagQuestionsList'
import FlagSetQuestions from '../../../components/FlagSetQuestions'

export default function CreateFlags() {
    
    return (
    <div>
        <Head>
            <title>Create Flags</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
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
                    <FlagDetails></FlagDetails>
                    <FlagSetQuestions></FlagSetQuestions>
                </div> 
                <FlagQuestionsList></FlagQuestionsList>
            </section>
        </main>
    </div>
    )
}