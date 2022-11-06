import styles from '../styles/Home.module.css'
import NewTileFlagSelector from './NewTileFlagSelector';
import NewTileQuestionDetails from './NewTileQuestionDetails';
import { useState } from 'react';
import { Country, FlagSet, Option, Question } from '../mirage/models';
import Image from 'next/image';

type AddNewTileProps = {
    setIsAddingTile: Function,
    flagSet: FlagSet | undefined,
    setNewFlagSet: Function,
    setFlagSetTiles: Function,
}

export default function AddNewTile( props: AddNewTileProps ) {
    const [isFlagConfirmed, setIsFlagConfirmed] = useState<boolean>(false);
    const [isQuestionConfirmed, setIsQuestionConfirmed] = useState<boolean>(false);

    const [newTileSelectedCountry, setNewTileSelectedCountry] = useState<Country | undefined>(undefined);
    const [newTileQuestionDetails, setNewTileQuestionDetails] = useState<Question | undefined>(undefined);

    async function addTile() {
        const options = newTileQuestionDetails?.options.map((option, index) => {
            return {id: index+1, text: option.text, image: option.image}
        })
        console.log(options)
        // return;
        
        try {
            switch(newTileQuestionDetails?.type) {
                case '1':
                    await fetch(`/api/question/confirm/${props.flagSet?.id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            question: {
                                type: 'Prompt',
                                image: newTileQuestionDetails?.image,
                                question: newTileQuestionDetails?.question,
                            },
                            countryId: newTileSelectedCountry?.id,
                            flagSetId: props.flagSet?.id
                        })
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json);
                        props.setNewFlagSet(json.flagSet);
                        props.setFlagSetTiles(json.flagSet.flagSetTile);
                        props.setIsAddingTile(false);
                        setIsFlagConfirmed(false);
                        setIsQuestionConfirmed(false);
                    });
                    return;
                case '2':
                    await fetch(`/api/question/confirm/${props.flagSet?.id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            question: {
                                type: 'Image MC',
                                image: null,
                                question: newTileQuestionDetails?.question,
                                answer: newTileQuestionDetails?.answer,
                                options: options
                            },
                            countryId: newTileSelectedCountry?.id,
                            flagSetId: props.flagSet?.id
                        })
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json);
                        props.setNewFlagSet(json.flagSet);
                        props.setFlagSetTiles(json.flagSet.flagSetTile);
                        props.setIsAddingTile(false);
                        setIsFlagConfirmed(false);
                        setIsQuestionConfirmed(false);
                    })
                    return;
                default:
                    await fetch(`/api/question/confirm/${props.flagSet?.id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            question: {
                                type: 'MC',
                                image: newTileQuestionDetails?.image,
                                question: newTileQuestionDetails?.question,
                                answer: newTileQuestionDetails?.answer,
                                options: options
                            },
                            countryId: newTileSelectedCountry?.id,
                            flagSetId: props.flagSet?.id
                        })
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json);
                        props.setNewFlagSet(json.flagSet);
                        props.setFlagSetTiles(json.flagSet.flagSetTile);
                        props.setIsAddingTile(false);
                        setIsFlagConfirmed(false);
                        setIsQuestionConfirmed(false);
                    })
                    return;
            }   
        } catch (error) {
            console.log(error);
        } finally {
            alert('Question added to flag set!')
        }
    }

    return (
        <section className={styles.create_flags_container}>
            <div className={styles.create_flags_interface}>
                <article className={styles.add_new_question_container}>
                    <div style={{position: 'relative'}}>

                        <p style={{textAlign: 'center'}}>Welcome to adding a new question</p>
                        <button style={{position: 'absolute', right: '0', top: '0'}}onClick={() => {
                            props.setIsAddingTile(false);
                            setIsFlagConfirmed(false);
                            setIsQuestionConfirmed(false);
                            setNewTileSelectedCountry(undefined)
                            setNewTileQuestionDetails(undefined)
                        }}>
                            Cancel
                        </button>
                    </div>
                    {!isFlagConfirmed && (
                        <div className={`${styles.add_new_question_step_container}`}>
                        <NewTileFlagSelector 
                            updateId={setNewTileSelectedCountry}
                        ></NewTileFlagSelector>
                        <div>
                            <p>Selected Flag: {newTileSelectedCountry?.name}</p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={() => {setIsFlagConfirmed(true)}}>Next Step</button>
                        </div>
                    </div>
                    )}
                    {isFlagConfirmed && !isQuestionConfirmed && (
                        <div className={`${styles.add_new_question_step_container}`}>
                        <h3 style={{textAlign: 'center'}}>Make Question</h3>
                        <NewTileQuestionDetails 
                            setDetails={setNewTileQuestionDetails} 
                            setQuestionConfirmed={setIsQuestionConfirmed}
                            setFlagConfirmed={setIsFlagConfirmed}
                        ></NewTileQuestionDetails>
                    </div>
                    )}
                    {isFlagConfirmed && isQuestionConfirmed && (
                        <div >
                            <h3 style={{textAlign: 'center'}}>Review and Confirm</h3>
                            <div className={`${styles.question_front_back_container}`}>
                                <div>
                                    <p>Your flag is {newTileSelectedCountry?.name}</p>
                                    {newTileSelectedCountry?.flag ? (
                                        <Image
                                            alt={`A picture of a dog`}
                                            src={newTileSelectedCountry.flag}
                                            width={100}
                                            height={100}
                                            objectFit="cover"
                                        ></Image>
                                    ) : (null)}
                                </div>
                                
                                <fieldset style={{width: '100%'}}>
                                    <legend>Question details</legend>
                                    <p>Type: {newTileQuestionDetails?.type}</p>
                                    <p>Question: {newTileQuestionDetails?.question}</p>
                                    {newTileQuestionDetails?.image ? (
                                        <Image
                                            alt={`A picture of a dog`}
                                            src={newTileQuestionDetails.image}
                                            width={100}
                                            height={100}
                                            objectFit="cover"
                                        ></Image>
                                    ) : (null)}
                                    {newTileQuestionDetails?.type === 'MC' ? (
                                        <>
                                            <p>Answer: {newTileQuestionDetails?.answer}</p>
                                            <div>
                                                {newTileQuestionDetails?.options?.map((option: Option, index: number) => (
                                                    <p key={index+1}>{`Option ${index+1}: ${option}`}</p>
                                                ))}
                                            </div>
                                        </>
                                    ) : (null)}
                                </fieldset>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button onClick={() => {setIsQuestionConfirmed(false)}}>Back</button>
                                <button onClick={addTile}>
                                    Confirm and Save
                                </button>
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </section>
    );
}