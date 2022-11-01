import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import DashboardNav from '../../../components/DashboardNav'
import NewFlagSetDetails from '../../../components/create/NewFlagSetDetails'
import FlagQuestionsList from '../../../components/FlagQuestionsList'
import FlagSetQuestions from '../../../components/FlagSetQuestions'
import { useState } from 'react'
import { FlagSet, FlagSetTile, Country, Question, Options } from '../../../mirage/models/index'
import AddNewTile from '../../../components/AddNewTile'

export default function CreateFlags() {
    const [isTitleSet, setIsTitleSet] = useState<boolean>(false);
    const [flagSetTitle, setFlagSetTitle] = useState<string | undefined>(undefined);
    const [isSetCreated, setIsSetCreated] = useState<boolean>(false);
    
    const [newFlagSet, setNewFlagSet] = useState<FlagSet | undefined>(undefined);
    const [flagSetTiles, setFlagSetTiles] = useState<FlagSetTile[] | []>([]);

    const [isAddingTile, setIsAddingTile] = useState<boolean>(false);
    
    return (
    <div>
        <Head>
            <title>Create Flags</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
        <nav className={`${styles.primary_nav}`}>
          <Link href="/teachers/flags/#"><a>Profile</a></Link>
          <Link href="/"><a>Log Out</a></Link>
        </nav>
        </header>
        <main className={`${styles.dashboard}`}>
            <div className={`${styles.dashboard_content_wrapper}`}>
                <DashboardNav></DashboardNav>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem',}}>
                    <section className={`${styles.create_flags_container}`}>
                        <div className={styles.create_flags_interface}>
                            <h1>Create New Flag Set</h1>
                            <div 
                                className={`${styles.flex} ${styles.flex_between}`} 
                                style={{ padding: '0 1rem', marginBottom: '1rem'}}
                            >
                                <h2>Flagset Name: {flagSetTitle}</h2>
                                <span>Questions: {flagSetTiles.length}</span>
                            </div>
                            {!isTitleSet ? (
                                <NewFlagSetDetails 
                                    setIsTitleSet={setIsTitleSet}
                                    setFlagSetTitle={setFlagSetTitle}
                                    setNewFlagSet={setNewFlagSet}
                                    setIsFlagSetCreated={setIsSetCreated}
                                ></NewFlagSetDetails>
                            ) : (
                                <div>
                                    <p>Level: {newFlagSet?.level}</p>
                                    <p>Week: {newFlagSet?.week}</p>
                                    <p>Day: {newFlagSet?.day}</p>
                                    <p>Day of Week: {newFlagSet?.dayOfWeek}</p>
                                    <button onClick={() => {console.log('You clicked the update button')}}>Update</button>
                                </div>
                            )}
                            
                        </div>
                    </section>
                    {isAddingTile && (
                        <AddNewTile
                            setIsAddingTile={setIsAddingTile}
                            flagSet={newFlagSet}
                            setNewFlagSet={setNewFlagSet}
                            setFlagSetTiles={setFlagSetTiles}
                        ></AddNewTile>
                    )}
                    {isSetCreated && (
                        <section className={styles.create_flags_container}>
                            <div className={styles.create_flags_interface}>
                                <button onClick={() => {setIsAddingTile(true)}}>Add New Tile</button>
                                {flagSetTiles.length ? (
                                    <p>There are tiles in this flag set</p>
                                ) : (
                                    <p>There are no tiles in this flag set</p>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    </div>
    )
}