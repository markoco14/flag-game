import styles from '../styles/Home.module.css'
import NewTileFlagSelector from './NewTileFlagSelector';
import NewTileQuestionDetails from './NewTileQuestionDetails';
import { useState } from 'react';
import { Country, FlagSet, Options, Question } from '../mirage/models';

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
            return {id: index+1, text: option}
        })

        try {
            newTileQuestionDetails?.type === 'MC' ? 
                fetch(`/api/question/confirm/${props.flagSet?.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        question: {
                            type: newTileQuestionDetails?.type,
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
             : 
                fetch(`/api/question/confirm/${props.flagSet?.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        question: {
                            type: newTileQuestionDetails?.type,
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
                })
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
                        <div className={`${styles.add_new_question_step_container}`}>
                            {/* this is where we have all our state variables prepared */}
                            {/* everything will be packaged into a response for the API endpoint */}
                            {/* state will be cleared after */}
                            <h3 style={{textAlign: 'center'}}>Review and Confirm</h3>
                            <p>Your flag is {newTileSelectedCountry?.name}</p>
                            <fieldset>
                                <legend>Question details</legend>
                                <p>Type: {newTileQuestionDetails?.type}</p>
                                {/* <p>Question: {newTileQuestionDetails?.question}</p> */}
                                <p>Question: {newTileQuestionDetails?.question}</p>
                                {newTileQuestionDetails?.type === 'MC' ? (
                                    <>
                                        <p>Answer: {newTileQuestionDetails?.answer}</p>
                                        <div>
                                            {newTileQuestionDetails?.options?.map((option: Options, index: number) => (
                                                <p key={index+1}>{`Option ${index+1}: ${option}`}</p>
                                            ))}
                                        </div>
                                    </>
                                ) : (null)}
                            </fieldset>
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