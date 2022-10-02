import Image from "next/image";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef, useEffect } from 'react';
import { Flag } from "../interfaces";


export default function FlagBoard() {
    const [flags, setFlags] = useState<Flag[] | []>([])
    const [selectedFlag, setSelectedFlag] = useState< Flag | undefined >(undefined);
    const selectedFlagModal = useRef<HTMLDialogElement | undefined | null>(undefined);
    const flipButton = useRef<HTMLButtonElement | null | undefined>(undefined);

    function displayFlag(flag: Flag, id: number, country: string) {
        console.log(flag);
        setSelectedFlag(flag);
    }

    function removeFlagModalFromDom() {
        selectedFlagModal?.current?.close();
        setSelectedFlag(undefined);
    }

    function flipFlag() {
        console.log(`You flipped the flag!`)
    }

    function deselectFlag() {
        // selectedFlagModal?.current?.close();
        // debugger;
        // setSelectedFlag(undefined);
        removeFlagModalFromDom();
    }

    function eliminateFlag() {
        // TODO: 
        // needs logic to:
        // filter the gameFlags array
        // setGameFlags array to new value
        // either remove that flag from the DOM
        // or grey it out
        flags.filter(flag => {
            // eliminate logic will go here
            // something like this
            // if (flag.id !== passed.id) {
            //     return flag;
            // }
        })
        // selectedFlagModal?.current?.close();
        // debugger;
        // setSelectedFlag(undefined);
        removeFlagModalFromDom();
    }

    if (selectedFlagModal) {
        // this is no good
        // I will just change to have the modal always rendered
        // and research the conditional later
        // AT used the condition to replace the content in their input form
        // so maybe this isn't the best use case for adding/removing the element
        useEffect(() => {
            selectedFlagModal?.current?.showModal();
        });
    } 
    
    useEffect(() => {
        fetch("/api/flags/play")
        .then((res) => res.json())
        .then((json) => {
          setFlags(json.flagboard);
        })
    }, [])
    

    return (
        <>
            {selectedFlag && 
                <dialog
                    ref={selectedFlagModal}
                    className={styles.selected_flag_modal}
                    onClick={() => {
                        flipButton?.current?.focus();
                    }}
                    onKeyDown={(e) => {
                        // selectedFlagModal?.current?.close();
                        // setSelectedFlag(undefined);
                        if (e.key !== 'Escape') {
                            return;
                        } else {
                            removeFlagModalFromDom();
                        }
                    }}
                >
                    <div className={styles.selected_flag_image_container}>
                        <Image 
                            src={selectedFlag.image}
                            layout='fill'
                            objectFit='cover'
                            alt={`A large image of the ${selectedFlag.country} flag.`}
                        />
                    </div>
                    <p>You selected {selectedFlag.country}</p>
                    <button ref={flipButton} onClick={flipFlag}>Flip</button>
                    <button onClick={eliminateFlag}>Eliminate</button>
                    <button onClick={deselectFlag}>Back</button>
                </dialog>
            }
            <div className={styles.flags}>
                {flags?.map((flag) => (
                    <div 
                        key={flag.id}
                        onClick={() => {displayFlag(flag, flag.id, flag.country)}}
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