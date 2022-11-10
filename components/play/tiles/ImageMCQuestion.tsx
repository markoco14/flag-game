import Image from "next/image";
import { FlagSetTile } from "../../../mirage/models";
import styles from '../../../styles/Home.module.css';

type ImageMCQuestionProps = {
    tile: FlagSetTile,
    checkAnswer: Function,
}

export default function ImageMCQuestion(props: ImageMCQuestionProps) {
    return(
        <>
            <p 
                className={styles.flag_question_container}
            >
                {props.tile.question.question}
            </p>
            {props.tile.question.options ? (
                <div className={styles.flag_option_grid}>
                    {props.tile.question.options?.map((option) => (
                        <div 
                            key={option.id} 
                            style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1/2', gridTemplateRows: '1/2', placeContent: 'center', width: '100%', aspectRatio: '1/1'}}
                            onClick={(e) => props.checkAnswer(e, option)}
                        >
                            <Image 
                                className={styles.selected_flag_image}
                                src={option.image}
                                layout='fill'
                                objectFit='cover'
                                alt={`A large image of a cute puppy.`}
                                style={{zIndex: '-1'}}
                                />
                            <p style={{color: 'white', fontSize: '2rem'}}>{option.text}</p>
                        </div>
                    ))}
                </div>
            ) : (null)}
        </>
    );
}