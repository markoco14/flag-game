import { PromptQuestion, MultiChoiceQuestion } from './tiles';
import { FlagSetTile } from '../../mirage/models';

type TileQuestionTypeSwitchProps = {
    tile: FlagSetTile,
    checkAnswer: Function
}

export default function TileQuestionTypeSwitch(props: TileQuestionTypeSwitchProps) {
    switch (props.tile.question.type) {
        case 'MC': 
            return <MultiChoiceQuestion
                tile={props.tile}
                checkAnswer={props.checkAnswer}
                ></MultiChoiceQuestion>
        case 'Prompt':
            return <PromptQuestion
                tile={props.tile}
            ></PromptQuestion>
        default: 
            return <h2>The question type does not match any declared types.</h2>
    }
}