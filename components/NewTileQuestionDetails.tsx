import { useRef } from "react";

type NewTileQuestionDetailsProps = {
    setDetails: Function,
    setQuestionConfirmed: Function,
    setFlagConfirmed: Function
}

export default function NewTileQuestionDetails(props: NewTileQuestionDetailsProps) {
    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);
    const option1Ref = useRef<HTMLInputElement>(null);
    const option2Ref = useRef<HTMLInputElement>(null);
    const option3Ref = useRef<HTMLInputElement>(null);

    function handleSetDetails() {
        console.log(questionRef.current?.value)
        console.log(answerRef.current?.value)
        console.log(option1Ref.current?.value)
        console.log(option2Ref.current?.value)
        console.log(option3Ref.current?.value)
        props.setDetails({
            type: 'MC',
            question: questionRef.current?.value,
            answer: answerRef.current?.value,
            options: [option1Ref.current?.value, option2Ref.current?.value, option3Ref.current?.value]
        })
        props.setQuestionConfirmed(true)
        console.log('You set the details')
    }

    return (
        <>
            <h3>These are the new tile question details</h3>
            <div>
                <label>Question</label>
                <input ref={questionRef} type="text"/>
            </div>
            <div>
                <label>Choice (Answer)</label>
                <input ref={answerRef} type="text"/>
            </div>
            <div>
                <label>Choice (Wrong)</label>
                <input ref={option1Ref} type="text"/>
            </div>
            <div>
                <label>Choice (Wrong)</label>
                <input ref={option2Ref} type="text"/>
            </div>
            <div>
                <label>Choice (Wrong)</label>
                <input ref={option3Ref} type="text"/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={() => {props.setFlagConfirmed(false)}}>Back</button>
                <button onClick={handleSetDetails}>Next Step</button>
            </div>
        </>
    );
}