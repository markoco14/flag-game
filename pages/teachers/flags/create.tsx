import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import DashboardNav from '../../../components/DashboardNav'
import FlagDetails from '../../../components/SetNewFlagsetTitle'
import FlagQuestionsList from '../../../components/FlagQuestionsList'
import FlagSetQuestions from '../../../components/FlagSetQuestions'
import { FormEvent, useEffect, useState } from 'react'
import { parseISO, isTuesday, isSaturday, isSunday } from 'date-fns'
import { Flag, IFlagSet, IFlagsetQuestion } from '../../../interfaces'
import { FlagSet, FlagSetTile } from '../../../mirage/models/index'


export default function CreateFlags() {
    const [isTitleSet, setIsTitleSet] = useState<boolean>(false);
    const [availableFlags, setAvailableFlags] = useState<Flag[] | []>([]);
    const [selectedFlags, setSelectedFlags] = useState<Flag[] | []>([]);
    const [flagsName, setFlagsName] = useState<string | undefined>(undefined);

    const [isSetCreated, setIsSetCreated] = useState<FlagSet | undefined>(undefined);
    const [flagsetQuestions, setFlagsetQuestions] = useState<IFlagsetQuestion[] | undefined>(undefined);

    function createNewFlagset(e: FormEvent, levelNumber: string, weekNumber: string, dayNumber: string, dayOfWeek: string, date: string) {
        console.log(date);
        console.log(parseISO(date));
        const parsedDate: Date = parseISO(date);
        e.preventDefault();
        if (levelNumber === '' || weekNumber === '' || dayNumber === '' || dayOfWeek === '' || date === '') {
            alert('You forget to set the flag set title');
            return;
        }

        if (isTuesday(parsedDate) || isSaturday(parsedDate) || isSunday(parsedDate)) {
            alert('You need to choose a Monday, Wednesday, Thursday, or Friday');
            return;
        }
        const title = `L${levelNumber} W${weekNumber} D${dayNumber} ${dayOfWeek} (${date})`
        fetch('/api/flags/flagSet/create', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                level: levelNumber,
                week: weekNumber,
                date: date,
                status: 'WIP',
            }),
        })
        .then((res)=> res.json())
        .then((json) => {
            setIsSetCreated(json);
        })
        setIsTitleSet(true);
        setFlagsName(title)
    }

    function addTileToFlagSet(flag: Flag) {
        console.log('You are adding a tile!')
        console.log(flag);
        // fetch("/api/flags/flagSet/updateTiles", {
        //     method: "PATCH",
        //     body: JSON.stringify(
        //         {
        //             title: 'hello',
        //             level: '1',
        //             week: '1',
        //             date: '7',
        //             status: 'WIP',
        //             flagSetTile: [...flagSetTiles, '1']
        //         }
        //     )
        // })
        // fetch('/api')
        // if (!selectedFlags.find((selectedFlag) => {
        //     return selectedFlag.id === flag.id;
        // })) {
            fetch('/api/flags/flagSetTile/create', {
                method: "POST",
                body: JSON.stringify({
                    flagSetId: isSetCreated?.id,
                    countryId: '1',
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                // console.log('flagset id', json.flagSetId, 'tile id', json.id)
                // updateFlagSetTiles(json);
            });
        //     setSelectedFlags([...selectedFlags, flag])
        // } else {
        //     alert('That flag is already selected')
        // }
    }

    function updateFlagSetTiles(json) {
    //    console.log(json);
        // console.log(isSetCreated);
        fetch(`/api/flags/flagsets/${json.flagSetId}`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            console.log(isSetCreated)
            // console.log(json.flagSet.flagSetTile)
            // let flagSetIds = json.flagSet.flagSetTile;
            // console.log(flagSetIds);
            // flagSetIds = [...flagSetIds, newFlagSetTile];
            // console.log(flagSetIds);
        })

        let payload = {
            date: isSetCreated?.date,
            title: isSetCreated?.title,
            level: isSetCreated?.level,
            status: isSetCreated?.status,
            week: isSetCreated?.week,
        }

        console.log(payload)
        // let newFlagSetTile = json.id;
        // console.log('logging new tile id', newFlagSetTile)
        // fetch(`/api/flags/flagsets/${json.flagSetId}`)
        // .then((res) => res.json())
        // .then((json) => {
        //     // console.log(json.flagSet.flagSetTile)
        //     let flagSetIds = json.flagSet.flagSetTile;
        //     console.log(flagSetIds);
        //     flagSetIds = [...flagSetIds, newFlagSetTile];
        //     console.log(flagSetIds);
        // })
    }

    function deleteFlagsetQuestion(flag: Flag) {
        // print flag to check it's the right flag
        // console.log(flag);
        // fetch(`/api/flags/flagSetTile/delete/${flag.id}`, {method: 'DELETE'})
        const updatedFlags = selectedFlags.filter((selectedFlag) => {
            // console.log(selectedFlag.id);
            // console.log(flag.id);
            // console.log(selectedFlag.id === flag.id);
            return selectedFlag.id !== flag.id;
        })
        // console.log("updated flags:", updatedFlags);
        setSelectedFlags(updatedFlags);
    }

    // create flag set question functions

    


    useEffect(() => {
        fetch('/api/flags/countries')
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            setAvailableFlags(json)
        })
    
    }, [])
    
    return (
    <div>
        <Head>
            <title>Create Flags</title>
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
        <main className={`${styles.dashboard}`}>
            <div className={`${styles.dashboard_content_wrapper}`}>
                <DashboardNav></DashboardNav>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem',}}>
                    <section className={`${styles.create_flags_container}`}>
                        <div className={styles.create_flags_interface}>
                            <h1>Create New Flag Set</h1>
                            <FlagDetails 
                                createFlagSet={createNewFlagset}
                                isTitleSet={isTitleSet}   
                                title={flagsName}
                            ></FlagDetails>
                        </div>
                    </section>
                    {isSetCreated && (
                    <>
                    <section className={`${styles.create_flags_container}`}>
                        <div className={styles.create_flags_interface}>
                            <h2>Choose your flags</h2>
                            <div style={{ display: 'flex', }}>
                                <div style={{ overflow: 'hidden', minWidth: '30%' }}>
                                    <p>Selected Flags: {selectedFlags.length ? selectedFlags.length : 0}</p>
                                    {(selectedFlags?.length > 0) && (
                                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                                            <ul>
                                            {selectedFlags.map((flag: Flag) => (
                                                <li 
                                                    style={{background: 'WhiteSmoke', borderRadius: '5px', padding: '0.5rem 1rem',}}
                                                    key={`selected-flag-${flag.id}`}
                                                    onClick={() => {deleteFlagsetQuestion(flag)}}
                                                >{flag.country}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div style={{ overflow: 'hidden', maxHeight: '40vh'}}>
                                    <article style={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
                                        {(availableFlags?.length > 0) ? (
                                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', overflowY: 'scroll'}}>
                                                {availableFlags.map((flag: Flag) => (
                                                    <div 
                                                        key={`available-flag-${flag.id}`}
                                                        style={{ position: 'relative', width: '100px', aspectRatio: '1 / 1'}}
                                                        onClick={() => {addTileToFlagSet(flag)}}
                                                    >
                                                        <Image
                                                            alt={`An image of the ${flag.country} country flag.`}
                                                            src={flag.image}
                                                            layout='fill'
                                                            objectFit='cover'
                                                        ></Image>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>Loading....</p>
                                        )}
                                    </article>
                                </div>
                            </div>
                            <button onClick={() => {console.log('You clicked save flags')}}>Save</button>
                        </div>
                    </section>
                    {/* {(selectedFlags.length > 0) && (
                        <section className={`${styles.create_flags_container}`}>
                            <div className={styles.create_flags_interface}>
                                <h2>Add Your Questions</h2>
                                {selectedFlags.map((flag) => (
                                    <article key={`flag-${flag.id}`}>
                                        <button onClick={() => {deleteFlagsetQuestion(flag)}}>Delete</button>
                                        <button onClick={() => {() => {console.log('edit flag')}}}>Edit</button>
                                        <div
                                    className={`${styles.flex} ${styles.flex_gap} ${styles.flex_between}`}>
                                        
                                        <div style={{width: '30%', border: 'solid 2px black'}}>
                                            <h3 style={{textAlign: 'center'}}>Front side</h3>
                                            <div>{flag.country}</div>
                                        </div>
                                        <div style={{width: '70%', border: 'solid 2px black'}}>
                                            <h3 style={{textAlign: 'center'}}>Back side</h3>
                                        </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )} */}
                    </>
                    )}
                </div>
            </div>
        </main>
    </div>
    )
}