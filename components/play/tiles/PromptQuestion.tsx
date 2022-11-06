import styles from '../../../styles/Home.module.css';
import Image from 'next/image';
import { FlagSetTile } from '../../../mirage/models';

type PromptQuestionProps = {
    tile: FlagSetTile,
}

export default function PromptQuestion(props: PromptQuestionProps) {
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
        </>
    )
}