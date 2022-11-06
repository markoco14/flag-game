import Image from "next/image";
import styles from "../styles/Home.module.css"
import { FlagSetTile } from "../mirage/models";

type TileFrontAndBackProps = {
    tile: FlagSetTile,
    handleDeleteTile: Function,
}

export default function TileFrontAndBack(props: TileFrontAndBackProps) {
    return (
        <article 
            className={styles.question_front_back_container}
        >
            <button onClick={() => {props.handleDeleteTile(props.tile.id)}}>Delete</button>
            <div style={{ position: 'relative', width: '30%'}}>
                <div style={{ position: 'relative'}}>
                    <h3 style={{ textAlign: 'center', fontSize: '24px', }}>Front {props.tile.id}</h3>
                    <button                                                     
                        onClick={() => {console.log('You clicked edit front side')}} 
                        className={`material-symbols-outlined ${styles.edit_flagset_info_button}`}
                    >
                        <span>edit</span>
                    </button>
                </div>
                <div>
                    <p>{props.tile.country.name}</p>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3'}}>
                        <Image
                            alt={`A picture of the ${props.tile.country.name} flag`}
                            src={props.tile.country.flag}
                            layout='fill'
                            objectFit="cover"
                        ></Image>
                    </div>
                </div>
            </div>
            <div style={{ width: '70%'}}>
                <div style={{ position: 'relative'}}>
                    <h3 style={{ textAlign: 'center', fontSize: '24px', }}>Back</h3>
                    <button                                                     
                        onClick={() => {console.log('You clicked edit back side')}} 
                        className={`material-symbols-outlined ${styles.edit_flagset_info_button}`}
                    >
                        <span>edit</span>
                    </button>
                </div>
                <p>Type: {props.tile.question.type}</p>
                <p>Question: {props.tile.question.question}</p>
                <Image
                    alt={`A picture of a dog`}
                    src={props.tile.question.image}
                    width={100}
                    height={100}
                    objectFit="cover"
                ></Image>
                {props.tile.question.options && (
                    <>
                        <fieldset>
                            <legend>Options:</legend>
                            <ul>
                                <li>Answer: {props.tile.question.answer}</li>
                                {props.tile.question.options.map((option, index) => (
                                    <li key={`option${index}-${option.id}`}>Option {index+1}: {option.text}</li>
                                ))}
                            </ul>
                        </fieldset>
                    </>
                )}
            </div>
        </article>
    );
}