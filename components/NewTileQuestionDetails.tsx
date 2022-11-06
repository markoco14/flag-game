import { useEffect, useRef, useState } from "react";
import SearchImage from './create/SearchImageSelector';

type NewTileQuestionDetailsProps = {
    setDetails: Function,
    setQuestionConfirmed: Function,
    setFlagConfirmed: Function
}

export default function NewTileQuestionDetails(props: NewTileQuestionDetailsProps) {
    const [questionType, setQuestionType] = useState<string>('MC');
    const [searchImages, setSearchImages] = useState<[]>([]);
    const [isSearchingImage, setIsSearchingImage] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);
    const option1Ref = useRef<HTMLInputElement>(null);
    const option2Ref = useRef<HTMLInputElement>(null);
    const option3Ref = useRef<HTMLInputElement>(null);

    // this is bad and I think it should ultimately turn into a form fill
    // still prevent default
    // create a form object
    // submit that
    // especially if I want the number of options to be dynamic
    // unless I can make state variables and ref variables dynamically

    function handleSetDetails() {
        props.setDetails({
            type: questionType,
            image: selectedImage,
            question: questionRef?.current?.value,
            answer: answerRef?.current?.value,
            options: [option1Ref?.current?.value, option2Ref?.current?.value, option3Ref?.current?.value]
        })
        props.setQuestionConfirmed(true)
        console.log('You set the details')
    }

    async function fetchSearchImages() {
        await fetch("/api/searchImages")
        .then((res) => res.json())
        .then((json) => {
            setSearchImages(json);
        });
    }

    useEffect(() => {
        fetchSearchImages()
    }, []);

    return (
        <>
            <h3>These are the new tile question details</h3>
            <div>
                <label>Type</label>
                <select onChange={e => setQuestionType(e.target.value)}>
                    <option value="MC">MC</option>
                    <option value="Prompt">Prompt</option>
                </select>
            </div>
            <div>
                <label>Question</label>
                <input ref={questionRef} type="text"/>
                <div>
                    <button onClick={() => {
                        !isSearchingImage ? setIsSearchingImage(true) : setIsSearchingImage(false)
                    }}>
                        Image
                    </button>
                </div>
                {isSearchingImage ? (
                    <SearchImage
                        images={searchImages}
                        setImage={setSelectedImage}
                    ></SearchImage>
                ) : (null)}
            </div>
            {questionType === 'MC' ? (
                <>
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
                </>
            ) : (null)}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={() => {props.setFlagConfirmed(false)}}>Back</button>
                <button onClick={handleSetDetails}>Next Step</button>
            </div>
        </>
    );
}