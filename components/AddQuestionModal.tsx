import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef } from "react";

export default function AddQuestionModal( props ) {
    const addQuestionModal = useRef<HTMLDialogElement | null>(null);
    const [questionType, setQuestionType] = useState<string>('MC');

    const promptRef = useRef<string | ''>('');
    const questionRef = useRef<string | ''>('');
    const answerRef = useRef<string | ''>('');
    const wrong1Ref = useRef<string | ''>('');
    const wrong2Ref = useRef<string | ''>('');
    const wrong3Ref = useRef<string | ''>('');

    function handleOpenAddModal() {
        addQuestionModal.current?.showModal();
    }

    function closeCreateQuestionModal() {
        addQuestionModal.current?.close();
    }

    function handleAddQuestion(questionType: string) {
        if (questionType === 'MC') {
            console.log('You are trying to add an MC question');
            fetch('/api/flags/create', {
                method: "POST",
                body: JSON.stringify({
                    // TODO: fill in attributes
                    type: "MC",
                    question: questionRef.current.value,
                    answer: answerRef.current.value,
                    options: [
                        {
                            text: answerRef.current.value,
                        },
                        {                        
                            text: wrong1Ref.current.value,
                        },
                        {
                            text: wrong2Ref.current.value,
                        },
                        {
                            text: wrong3Ref.current.value,
                        },
                    ],
                }),
            })
            .then((res) => res.json())
        .then((json) => {
            props.updateFlagSet((sets) => [...sets, json.set]);
        })
        } else {
            console.log('You are trying to add a prompt question');
            fetch('/api/flags/create', {
                method: "POST",
                body: JSON.stringify({
                    // TODO: fill in attributes
                    type: "Prompt",
                    question: promptRef.current.value,
                }),
            });

        }
        addQuestionModal.current.close();
    }

    return (
        <>
            <article className={`${styles.flex} ${styles.create_flags_bar}`}>
                <button 
                    onClick={(e) => handleOpenAddModal()}
                    className={styles.create_flags_button}
                >
                    Add Question
                </button>
            </article>
            <dialog
                ref={addQuestionModal}
                className={`${styles.create_flag_question_modal}`}
            >
                <div>
                    <button onClick={() => {setQuestionType('MC')}}>MC</button>
                    <button onClick={() => {setQuestionType('Prompt')}}>Prompt</button>
                    <button onClick={closeCreateQuestionModal}>X</button>
                </div>
                <div className={`${styles.flex} ${styles.flex_between}`}>
                    {(questionType === 'MC') && (
                        <>
                        <section className={`${styles.flag_question_modal_half}`}>
                            <h2>Front</h2>
                            <div></div>
                        </section>
                        <section className={`${styles.flag_question_modal_half}`}>
                            <h2>Back</h2>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Question</label>
                                <input ref={questionRef}type="text" />
                            </div>
                            
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Answer</label>
                                <input ref={answerRef} type="text" />
                            </div>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Wrong 1</label>
                                <input ref={wrong1Ref} type="text" />
                            </div>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Wrong 2</label>
                                <input ref={wrong2Ref} type="text" />
                            </div>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Wrong 3</label>
                                <input ref={wrong3Ref} type="text" />
                            </div>
                        </section>
                        </>
                    )}
                    {(questionType === 'Prompt') && (
                        <>
                        <section className={`${styles.flag_question_modal_half}`}>
                            <h2>Front</h2>
                            <div></div>
                        </section>
                        <section className={`${styles.flag_question_modal_half}`}>
                            <h2>Back</h2>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Prompt</label>
                                <input ref={promptRef}type="text" />
                            </div>
                        </section>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={() => {handleAddQuestion(questionType)}}>Save</button>
                </div>
            </dialog>
        </>
    );
}