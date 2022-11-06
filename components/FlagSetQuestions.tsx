import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useState, useRef } from "react";
import Image from 'next/image';
import { Question, Option } from '../mirage/models';

export default function FlagSetQuestions() {
    const [flagSetQuestions, setFlagSetQuestions] = useState<[]>([]);
    const addQuestionModal = useRef<HTMLDialogElement | null>(null);
    const [questionType, setQuestionType] = useState<string>('MC');

    const countryNameRef = useRef<HTMLInputElement>(null);
    const promptRef = useRef<HTMLInputElement>(null);
    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);
    const wrong1Ref = useRef<HTMLInputElement>(null);
    const wrong2Ref = useRef<HTMLInputElement>(null);
    const wrong3Ref = useRef<HTMLInputElement>(null);


    function handleOpenEditModal() {
        console.log('You clicked the edit question button');
    }

    function handleDeleteQuestion(id: number) {
        fetch(`/api/flags/create/${id}`, { method: "DELETE"});
        fetch('/api/flags/create')
        .then((res) => res.json())
        .then((json) => {
            setFlagSetQuestions(json.sets);
        })
    }

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
                    type: "MC",
                    country: countryNameRef?.current?.value,
                    question: questionRef?.current?.value,
                    answer: answerRef?.current?.value,
                    options: [
                        {
                            text: answerRef?.current?.value,
                        },
                        {                        
                            text: wrong1Ref?.current?.value,
                        },
                        {
                            text: wrong2Ref?.current?.value,
                        },
                        {
                            text: wrong3Ref?.current?.value,
                        },
                    ],
                }),
            })
            fetch('/api/flags/create')
            .then((res) => res.json())
            .then((json) => {
                setFlagSetQuestions(json.sets);
            })
            
    
        } else {
            console.log('You are trying to add a prompt question');
            fetch('/api/flags/create', {
                method: "POST",
                body: JSON.stringify({
                    type: "Prompt",
                    question: promptRef?.current?.value,
                }),
            });
            fetch('/api/flags/create')
            .then((res) => res.json())
            .then((json) => {
                setFlagSetQuestions(json.sets);
            })
        }
        addQuestionModal?.current?.close();
    }

    return (
        <>
            {!flagSetQuestions && (
                <article style={{ padding: '0 1rem',}}>
                    <p>There are no questions in this flag set.</p>
                </article>
            )}
            {flagSetQuestions && (
                flagSetQuestions?.map((question: Question) => (

                <article key={question.id} style={{ padding: '0 1rem',}}>
                    {/* <p>Country: {question.country}</p> */}
                    <div className={`${styles.flex} ${styles.flex_between}`}>
                        <p>Question: {question.question}</p>
                        <div className={`${styles.flex} ${styles.flex_gap}`}>
                            <button>Preview</button>
                            <button onClick={handleOpenEditModal}>Edit</button>
                            {/* <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button> */}
                        </div>
                    </div>
                    <div>
                        <p>Answer: {question.answer}</p>
                        {question.options.map((option: Options) => (
                            <p key={option.id}>Option: {option.text}</p>
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
                            <div>
                                <div>
                                    <label htmlFor="">Country</label>
                                    <input ref={countryNameRef} type="text" />
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                    <div>
                                        <div style={{ margin: 'auto', position: 'relative', width: '50px', height: '50px', border: '2px solid black' }}>
                                            <Image 
                                                src="https://flagicons.lipis.dev/flags/1x1/ar.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="cover"
                                            ></Image>
                                        </div>
                                        <p>Argentina</p>
                                    </div>
                                </div>
                            </div>
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