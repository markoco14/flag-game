import { useEffect, useRef, useState } from "react";
import SearchImageSelector from './create/SearchImageSelector';

type NewTileQuestionDetailsProps = {
    setDetails: Function,
    setQuestionConfirmed: Function,
    setFlagConfirmed: Function
}

export default function NewTileQuestionDetails(props: NewTileQuestionDetailsProps) {
    const [questionType, setQuestionType] = useState<string>('0');
    const [searchImages, setSearchImages] = useState<[]>([]);
    const [isSearchingImage, setIsSearchingImage] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    // Image MC option state
    const [imgAnswer, setImgAnswer] = useState<string | null>(null)
    const [imgOption1, setImgOption1] = useState<string | null>(null)
    const [imgOption2, setImgOption2] = useState<string | null>(null)
    const [imgOption3, setImgOption3] = useState<string | null>(null)

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
            answer: 1,
            options: [
                {
                    text: answerRef?.current?.value,
                    image: imgAnswer,
                }, 
                {
                    text: option1Ref?.current?.value,
                    image: imgOption1,
                }, 
                {
                    text: option2Ref?.current?.value,
                    image: imgOption2,
                }, 
                {
                    text: option3Ref?.current?.value,
                    image: imgOption3,
                },
            ]
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
                    <option value="0">MC</option>
                    <option value="1">Prompt</option>
                    <option value="2">Image MC</option>
                </select>
            </div>
            <div>
                <label>Question</label>
                <input ref={questionRef} type="text"/>
                {questionType === '0' ? (
                    <>
                        <div>
                            <button onClick={() => {
                                !isSearchingImage ? setIsSearchingImage(true) : setIsSearchingImage(false)
                            }}>
                                Image
                            </button>
                        </div>
                        {isSearchingImage ? (
                            <SearchImageSelector
                                images={searchImages}
                                setImage={setSelectedImage}
                            ></SearchImageSelector>
                        ) : (null)}
                    </>
                ) : (null)}
            </div>
            {questionType === '0' ? (
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
            {questionType === '2' ? (
                <>
                    <div>
                        <label>Choice (Answer)</label>
                        <input ref={answerRef} type="text"/>
                        <SearchImageSelector
                            images={searchImages}
                            setImage={setImgAnswer}
                        ></SearchImageSelector>
                    </div>
                    <div>
                        <label>Choice (Wrong)</label>
                        <input ref={option1Ref} type="text"/>
                        <SearchImageSelector
                            images={searchImages}
                            setImage={setImgOption1}
                        ></SearchImageSelector>
                    </div>
                    <div>
                        <label>Choice (Wrong)</label>
                        <input ref={option2Ref} type="text"/>
                        <SearchImageSelector
                            images={searchImages}
                            setImage={setImgOption2}
                        ></SearchImageSelector>
                    </div>
                    <div>
                        <label>Choice (Wrong)</label>
                        <input ref={option3Ref} type="text"/>
                        <SearchImageSelector
                            images={searchImages}
                            setImage={setImgOption3}
                        ></SearchImageSelector>
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