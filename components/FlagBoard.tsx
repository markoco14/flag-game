import Image from "next/image";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef, useEffect } from 'react';
import { Flag } from "../interfaces";


export default function FlagBoard() {
    const [flags, setFlags] = useState<Flag[] | []>([])
    const [selectedFlag, setSelectedFlag] = useState< Flag | undefined >(undefined);
    const [isBackSide, setIsBackSide] = useState<boolean>(false);
    const selectedFlagModal = useRef<HTMLDialogElement>(null);

    function displayFlag(flag: Flag) {
        setSelectedFlag(flag);
        selectedFlagModal?.current?.showModal();
    }

    function flipFlag() {
        isBackSide ? setIsBackSide(false) : setIsBackSide(true);
    }

    function deselectFlag() {
        selectedFlagModal?.current?.close();
        setSelectedFlag(undefined);
        setIsBackSide(false);
    }

    useEffect(() => {
        fetch("/api/flags/play")
        .then((res) => res.json())
        .then((json) => {
          setFlags(json);
        })
    }, [])
    

    return (
        <>
            <dialog
                ref={selectedFlagModal}
                className={styles.selected_flag_modal}
            >
                {!isBackSide && selectedFlag && (
                    <>
                        <div className={styles.selected_flag_image_container}>
                            <Image 
                                src={selectedFlag.image}
                                layout='fill'
                                objectFit='cover'
                                alt={`A large image of the ${selectedFlag?.country} flag.`}
                            />
                        </div>
                        <p className={styles.flag_country_name}>{selectedFlag?.country}</p>
                    </>
                )}
                {isBackSide && selectedFlag && (

                    <>
                        <div className={styles.selected_flag_image_container}>
                            <Image 
                                src='https://i.ytimg.com/vi/mRf3-JkwqfU/sddefault.jpg'
                                layout='fill'
                                objectFit='cover'
                                alt={`A large image of the ${selectedFlag?.country} flag.`}
                            />
                        </div>
                        <p>Is this puppy cute?</p>
                        <div style={{ display: 'flex'}}>
                            <p>Yes!</p>
                            <p>Yes?</p>
                        </div>
                        <div style={{ display: 'flex'}}>
                            <p>Yes.</p>
                            <p>Waldo is not in the picture.</p>
                        </div>
                        {/* <p style={{ width: '100%', aspectRatio: '4/3'}}>You are looking at my backside</p> */}
                    </>
                )}
                <button onClick={flipFlag}>Flip</button>
                {/* <button onClick={eliminateFlag}>Eliminate</button> */}
                <button onClick={deselectFlag}>Back</button>
            </dialog>
            <div className={styles.flags}>
                {flags?.map((flag) => (
                    <div 
                        key={flag.id}
                        onClick={() => {displayFlag(flag)}}
                    >
                        <div className={styles.flag_image_container}>
                            <Image 
                                src={flag.image}
                                alt={`The flag of ${flag.country}`}
                                layout='fill'
                            />
                        </div>
                        <p className={styles.flag_country_name}>{flag.country}</p>
                    </div>
                ))}
            </div>
        </>
    );
}