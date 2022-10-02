import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState, useRef } from "react";
import { IQuestions } from "../interfaces";

export default function FlagSetQuestions() {
    const [flagSetQuestions, setFlagSetQuestions] = useState<[]>([]);
    const addQuestionModal = useRef<HTMLDialogElement | null>(null);
    const [questionType, setQuestionType] = useState<string>('MC');

    const promptRef = useRef<string | ''>('');
    const questionRef = useRef<string | ''>('');
    const answerRef = useRef<string | ''>('');
    const wrongChoice1 = useRef<string | ''>('');
    const wrongChoice2 = useRef<string | ''>('');
    const wrongChoice3 = useRef<string | ''>('');

    useEffect(() => {
        fetch("/api/flags/create")
        .then((res) => res.json())
        .then((json) => {
            setFlagSetQuestions(json.set);
        })
    }, []);

    function handleOpenAddModal(type: EventTarget) {
        console.log(type)
        addQuestionModal.current?.showModal();
    }

    function closeCreateQuestionModal() {
        addQuestionModal.current?.close();
    }

    function handleOpenEditModal() {
        console.log('You clicked the edit question button');
    }

    function handleDeleteQuestion(id: number) {
        const filteredQuestions = flagSetQuestions.filter((question) => {
            if (id !== question.id) {
                return question;
            }
        })
        setFlagSetQuestions(filteredQuestions);
    }
    
    function handleAddQuestion() {
        console.log('You are trying to add a question');
    }

    return (
        <>
            {(flagSetQuestions.length === 0) && (
                <article style={{ padding: '0 1rem',}}>
                    <p>There are no questions in this flag set.</p>
                </article>
            )}
            {flagSetQuestions && (
                flagSetQuestions?.map((question) => (

                <article key={question.id} style={{ padding: '0 1rem',}}>
                    <div className={`${styles.flex} ${styles.flex_between}`}>
                        <p>Question 1</p>
                        <div className={`${styles.flex} ${styles.flex_gap}`}>
                            <button onClick={handleOpenEditModal}>Edit</button>
                            <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                        </div>
                    </div>
                    <div>
                        <p>Answer: {question.answer}</p>
                        {question.options.map((option) => (
                            <p key={option.id}>Option: &quot;{option.text}&quot;</p>
                        ))}
                    </div>
                </article>
                ))
            )}
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
                                <input ref={answerRef}type="text" />
                            </div>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Wrong 1</label>
                                <input ref={wrongChoice1} type="text" />
                            </div>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Wrong 2</label>
                                <input ref={wrongChoice2} type="text" />
                            </div>
                            <div className={`${styles.flex} ${styles.flex_column}`}>
                                <label htmlFor="">Wrong 3</label>
                                <input ref={wrongChoice3} type="text" />
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
                    <button onClick={handleAddQuestion}>Save</button>
                </div>
            </dialog>
        </>
    );
}