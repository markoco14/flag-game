import Link from "next/link";
import styles from '../styles/Home.module.css'
import "../node_modules/flag-icons/css/flag-icons.min.css";
import { useEffect, useState } from "react";
import { IQuestions } from "../interfaces";

import { createServer } from "miragejs"

createServer({
    routes() {
        this.get("/api/questions", () => ({
            questions: [
                {
                    id: 1,
                    level: '5',
                    type: 'MC',
                    question: "Why did the chicken cross the road?",
                    answer: "To get to the other side.",
                    options: [
                        "He didn't.", 
                        "Did the chicken cross the road?", 
                        "A wolf was chasing him!", 
                        "He wanted to eat KFC."
                    ],
                },
                {
                    id: 2,
                    level: '5',
                    type: 'MC',
                    question: "What is this?",
                    answer: "Kimchi.",
                    options: [
                        "Kimchi", 
                        "Rice", 
                        "Roast Beef", 
                        "KFC"
                    ],
                },
                {
                    id: 3,
                    level: '6',
                    type: 'MC',
                    question: "How much wood could a woodchuck chuck....",
                    answer: "Kimchi.",
                    options: [
                        "Kimchi", 
                        "Rice", 
                        "Roast Beef", 
                        "KFC"
                    ],
                },
                {
                    id: 4,
                    level: '6',
                    type: 'MC',
                    question: "What type of dog is this?",
                    answer: "Corgi.",
                    options: [
                        "Golden Retriever", 
                        "Corgi", 
                        "Pug", 
                        "German Shepherd"
                    ],
                },
                {
                    id: 5,
                    level: '6',
                    type: 'Prompt',
                    question: "Name 5 Taiwanese teachers at Sky.",
                    answer: "n/a",
                    options: "n/a"
                },
                {
                    id: 6,
                    level: '6',
                    type: 'Prompt',
                    question: "Do 5 push-ups",
                    answer: "n/a",
                    options: "n/a"
                },
                {
                    id: 7,
                    level: '7',
                    type: 'MC',
                    question: "Who is Canada's Prime Minister?",
                    answer: "Justin Trudeau",
                    options: [
                        "Ronald McDonald", 
                        "Justin Timberlake", 
                        "Donald Trump", 
                        "Justin Trudeau"
                    ],
                },
                {
                    id: 8,
                    level: '8',
                    type: 'MC',
                    question: "What is Teacher Mario's favorite sport?",
                    answer: "Hockey",
                    options: [
                        "Swimming", 
                        "Hockey", 
                        "Soccer", 
                        "Frisbee"
                    ],
                },
            ],
        }))

        this.get("/_next/static/development/_devMiddlewareManifest.json", () => {
            return [];
        })

        this.get("/_next/static/development/_devPagesManifest.json", () => {
            return {"pages":["/","/../mirage","/../next.config","/_app"]};
        })
    },
})

export default function FlagQuestionsList() {
    const [originalQuestions, setOriginalQuestions] = useState<IQuestions[] | []>([])
    const [displayedQuestions, setDisplayedQuestions] = useState<IQuestions[] | []>([])

    useEffect(() => {
        fetch("/api/questions")
        .then((res) => res.json())
        .then((json) => {
          setOriginalQuestions(json.questions);
          setDisplayedQuestions(json.questions);
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
                    <option value={0}>All</option>
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