import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Home.module.css'
import FlagBoard from '../../../../components/play/FlagBoard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FlagSetTile } from '../../../../mirage/models';

export default function PlayFlags() {
    const router = useRouter()
    const [flagSet, setFlagSet] = useState([]);
    
    async function getFlagSet(id: string | string[] | undefined) {
        fetch(`/api/flags/play/${id}`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            setFlagSet(json.flagSet.flagSetTile)
        })
    }

    function handleRemoveFlag(selectedFlag: string) {
        const filteredFlags = flagSet.filter((flag: FlagSetTile) => {
            return flag.id !== selectedFlag
        });
        setFlagSet(filteredFlags);
    }

    useEffect(() => {
        if (router.isReady) {
            getFlagSet(router.query.id);
        }
    }, [router.isReady, router.query.id])

    return (
    <div>
        <Head>
        <title>Play Flags</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        
        </Head>
        <header className={`${styles.flags_navbar}`}>
            <Link href="/teachers/flags">
                <a>
                    <span 
                    className="material-symbols-outlined"
                    style={{ color: 'white', fontSize: '3rem'}}
                    >
                        arrow_back
                    </span>
                </a>
            </Link>
        </header>
        <main>
            <FlagBoard
                flagSet={flagSet}
                removeFlag={handleRemoveFlag}
            ></FlagBoard>
        </main>
    </div>
    )
}