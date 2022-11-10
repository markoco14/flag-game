import Image from "next/image";
import styles from '../../styles/Home.module.css'
import { useState, useRef } from 'react';
import { FlagSetTile, Option } from '../../mirage/models';
import TileQuestionTypeSwitch from "./TileQuestionTypeSwitch";

type FlagBoardProps = {
    flagSet: FlagSetTile[],
    removeFlag: Function,
}


export default function FlagBoard(props: FlagBoardProps) {
    // console.log(props.flagSet)

    const [selectedFlag, setSelectedFlag] = useState< FlagSetTile | undefined >(undefined);
    const [isBackSide, setIsBackSide] = useState<boolean>(false);
    const selectedFlagModal = useRef<HTMLDialogElement>(null);

    const correct = {
        backgroundColor: 'rgb(94, 255, 94)',
    }

    const wrong = {
        backgroundColor: 'rgb(255,71,71)',
    }

    function displayFlag(flag: FlagSetTile) {
        setSelectedFlag(flag);
        // handleSetTileOptions(flag);
        selectedFlagModal?.current?.showModal();
    }

    function flipFlag() {
        isBackSide ? setIsBackSide(false) : setIsBackSide(true);
    }

    function deselectFlag(selectedFlag: FlagSetTile | undefined) {
        selectedFlagModal?.current?.close();
        setSelectedFlag(undefined);
        setIsBackSide(false);
        // props.removeFlag(selectedFlag?.id);
    }

    function completeFlag(selectedFlag: FlagSetTile | undefined) {
        selectedFlagModal?.current?.close();
        setSelectedFlag(undefined);
        setIsBackSide(false);
        props.removeFlag(selectedFlag?.id);
    }
    
    function handleCheckAnswer(e: any, option: Option) {
        if(option.id === selectedFlag?.question.answer) {
            // console.log('That is the right answer')
            e.target.style.backgroundColor = 'rgba(94, 255, 94, 0.7)';
            e.target.style.cursor = 'not-allowed';
            e.target.disabled = true;
            alert('Correct! Great job!')
        } else {
            // console.log('That is the wrong answer')
            e.target.style.backgroundColor = 'rgba(255,71,71, 0.7)';
            e.target.style.cursor = 'not-allowed';
            e.target.disabled = true;
            alert('No! That is NOT the correct!')
        }
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
                                className={styles.selected_flag_image}
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
                    {selectedFlag ? (
                        <TileQuestionTypeSwitch
                            tile={selectedFlag}
                            checkAnswer={handleCheckAnswer}
                        ></TileQuestionTypeSwitch>
                    ) : (null)}
                    </>
                )}
                <div className={styles.two_button_bar}>
                    <button className={styles.selected_flag_button} onClick={flipFlag}>Flip</button>
                    <button className={styles.selected_flag_button} onClick={() => {deselectFlag(selectedFlag)}}>Back</button>
                    {isBackSide ? (
                        <button className={styles.selected_flag_button} onClick={() => {completeFlag(selectedFlag)}}>Complete</button>
                    ) : (null)}
                </div>
            </dialog>
                {props.flagSet?.length > 0 ? (
                    <div className={styles.flags}>
                        {props.flagSet?.map((flag) => (
                            <div 
                                key={flag.id}
                                onClick={() => {displayFlag(flag)}}
                                className={styles.flag_board_tile}
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
                ) : (
                    <h2 
                        style={{
                            minHeight: '100vh', 
                            display: 'grid', 
                            gridTemplateColumns: '1/2', 
                            gridTemplateRows: '1/2', 
                            placeContent: 'center',
                            fontSize:'5rem',
                            textAlign: 'center'
                    }}>
                        No flags left. <br></br> Refresh to play again!
                    </h2>
                )}
        </>
    );
}