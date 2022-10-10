import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";
import { IQuestions } from "../interfaces";

export default function FlagQuestionsList() {
    const [originalQuestions, setOriginalQuestions] = useState<IQuestions[] | []>([])
    const [displayedQuestions, setDisplayedQuestions] = useState<IQuestions[] | []>([])

    useEffect(() => {
        fetch("/api/questions")
        .then((res) => res.json())
        .then((json) => {
          setOriginalQuestions(json);
        //   setDisplayedQuestions(json.questions.filter((question: IQuestions) => {
        //     return question.level === '5'
        //   }));
          setDisplayedQuestions(json);
        })
    }, [])

    function handleFilterQuestionsList(level: string) {
        console.log('You filtered the questions list!');
        if (level === '0') {
            const filteredQuestions = originalQuestions;
            setDisplayedQuestions(filteredQuestions);
        } else {
            const filteredQuestions = originalQuestions.filter((question) => {
                return question.level === level;
            });
            setDisplayedQuestions(filteredQuestions);
        }
    }

    return (
        <>
            <div className={styles.choose_questions_interface}>
                <h2>Questions by Level</h2>
                <select 
                    name="level" 
                    id="questionLevelSelector" 
                    onChange={(e) => handleFilterQuestionsList(e.target.value)}
                >
                    {/* <option value={0}>All</option> */}
                    <option value={5}>Level 5</option>
                    <option value={6}>Level 6</option>
                    <option value={7}>Level 7</option>
                    <option value={8}>Level 8</option>
                    <option value={9}>Level 9</option>
                    <option value={10}>Level 10</option>
                    <option value={11}>Level 11</option>
                    <option value={12}>Level 12</option>
                    <option value={13}>Level 13</option>
                    <option value={14}>Level 14</option>
                    <option value={15}>Level 15</option>
                </select>
                <ul style={{ padding: '1rem',}}>
                    {displayedQuestions.map((question) => (
                        <li 
                            key={question.id}
                            className={`${styles.flex} ${styles.flex_align_center} ${styles.flex_gap}`}
                        >
                            <span 
                                onClick={() => {console.log('You clicked copy question!')}}
                                className="material-symbols-outlined"
                            >
                                content_copy
                            </span> 
                            <span onClick={() => {console.log(`You clicked question ${question.id}`)}}>
                                {question.question}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}