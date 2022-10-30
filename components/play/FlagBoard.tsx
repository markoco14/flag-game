import Image from "next/image";
import styles from '../../styles/Home.module.css'
import { useState, useRef } from 'react';
import { FlagSetTile } from '../../mirage/models';

type FlagBoardProps = {
    flagSet: FlagSetTile[],
    removeFlag: Function,
}


export default function FlagBoard(props: FlagBoardProps) {
    console.log(props.flagSet)

    const [selectedFlag, setSelectedFlag] = useState< FlagSetTile | undefined >(undefined);
    const [isBackSide, setIsBackSide] = useState<boolean>(false);
    const selectedFlagModal = useRef<HTMLDialogElement>(null);

    function displayFlag(flag: FlagSetTile) {
        setSelectedFlag(flag);
        selectedFlagModal?.current?.showModal();
    }

    function flipFlag() {
        isBackSide ? setIsBackSide(false) : setIsBackSide(true);
    }

    function deselectFlag(selectedFlag: FlagSetTile | undefined) {
        selectedFlagModal?.current?.close();
        setSelectedFlag(undefined);
        setIsBackSide(false);
        props.removeFlag(selectedFlag?.id);
    }    

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
                                src={selectedFlag.country.flag}
                                layout='fill'
                                objectFit='cover'
                                alt={`A large image of the ${selectedFlag?.country.name} flag.`}
                            />
                        </div>
                        <p className={styles.flag_country_name}>{selectedFlag?.country.name}</p>
                    </>
                )}
                {isBackSide && selectedFlag && (
                    <>
                        <div className={styles.selected_flag_image_container}>
                            <Image 
                                src='https://i.ytimg.com/vi/mRf3-JkwqfU/sddefault.jpg'
                                layout='fill'
                                objectFit='cover'
                                alt={`A large image of the ${selectedFlag?.country.name} flag.`}
                            />
                        </div>
                        <p style={{ textAlign: 'center'}}>{selectedFlag?.question.question}</p>
                        {selectedFlag.question.options ? (
                        <>
                            <div style={{ display: 'flex', gap: '1rem'}}>
                                <p style={{ width: '50%', textAlign: 'center'}}>{selectedFlag?.question.answer}</p>
                                <p style={{ width: '50%', textAlign: 'center'}}>{selectedFlag?.question.options[0].text}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem'}}>
                                <p style={{ width: '50%', textAlign: 'center'}}>{selectedFlag?.question.options[1].text}</p>
                                <p style={{ width: '50%', textAlign: 'center'}}>{selectedFlag?.question.options[2].text}</p>
                            </div>
                        </>
                        ) : (null)}
                    </>
                )}
                <button onClick={flipFlag}>Flip</button>
                <button onClick={() => {deselectFlag(selectedFlag)}}>Back</button>
            </dialog>
            <div className={styles.flags}>
                {props.flagSet?.map((flag) => (
                    <div 
                        key={flag.id}
                        onClick={() => {displayFlag(flag)}}
                    >
                        <div className={styles.flag_image_container}>
                            <Image 
                                src={flag.country.flag}
                                alt={`The flag of ${flag.country.name}`}
                                layout='fill'
                            />
                        </div>
                        <p className={styles.flag_country_name}>{flag.country.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
}