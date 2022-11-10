import styles from '../../../styles/Home.module.css';
import Image from 'next/image';
import { FlagSetTile } from '../../../mirage/models';

type MultiChoiceQuestionProps = {
    tile: FlagSetTile,
    checkAnswer: Function,
}

export default function MultiChoiceQuestion(props: MultiChoiceQuestionProps) {
    return(
        <>
            <div className={styles.question_image_container}>
                <Image 
                    className={styles.selected_flag_image}
                    src={props.tile.question.image}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    alt={`A large image of a cute puppy.`}
                />
            </div>
            <p 
                className={styles.flag_question_container}
            >
                {props.tile.question.question}
            </p>
            {props.tile.question.options ? (
                <div className={styles.flag_option_grid}>
                    {props.tile.question.options.map((option) => (
                        <button 
                            key={option.id}
                            onClick={(e) => props.checkAnswer(e, option)}
                            className={styles.flag_option_container}
                            disabled={false}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            ) : (null)}
        </>
    );
}